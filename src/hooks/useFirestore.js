// Use Firestore Hook

import { useReducer, useEffect, useState } from 'react';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore, timestamp } from '../firebase/config';

// the response state object
let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { document: null, isPending: true, error: null, success: false };
		case 'ADDED_DOCUMENT':
			return { isPending: false, document: action.payload, success: true, error: null };
		case 'ERROR':
			return {
				document: null,
				isPending: false,
				error: action.payload,
				success: false
			};
		case 'UPDATED_DOCUMENT':
			return { isPending: false, document: action.payload, success: true, error: null };
		case 'DELETED_DOC':
			return {
				document: null,
				isPending: false,
				error: null,
				success: true
			};
		default:
			return state;
	}
};

export const useFirestore = (collectionName) => {
	const [ response, dispatch ] = useReducer(firestoreReducer, initialState);
	const [ isCancelled, setIsCancelled ] = useState(false);

	// collection ref
	const colRef = collection(projectFirestore, collectionName);

	// only dispatch if not cancelled
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	// add document

	const addDocument = async (doc) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			const createdAt = timestamp;
			const addedDocument = await addDoc(colRef, { ...doc, createdAt });
			dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
		} catch (error) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
		}
	};

	// delete document
	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			const docRef = doc(projectFirestore, collectionName, id);
			await deleteDoc(docRef);
			dispatchIfNotCancelled({ type: 'DELETED_DOC' });
		} catch (error) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
		}
	};

	// update document
	const updateDocument = async (id, newData) => {
		dispatch({ type: 'IS_PENDING' });
		try {
			console.log('1');
			const docRef = doc(projectFirestore, collectionName, id);

			await updateDoc(docRef, newData);
			console.log('2');

			dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: newData });
			return newData;
		} catch (error) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
		}
	};

	// const updateDocument = async (id, newData) => {
	// 	dispatch({ type: 'IS_PENDING' });
	// 	try {
	// 		const updatedDocument = await colRef.doc(id).update(newData);

	// 		dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
	// 		return updatedDocument;
	// 	} catch (error) {
	// 		dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
	// 	}
	// };

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return {
		addDocument,
		deleteDocument,
		response,
		updateDocument
	};
};
