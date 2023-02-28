// Use Collection Hook

import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export const useCollection = (collectionName, _query, _orderBy) => {
	const [ documents, setDocuments ] = useState(null);
	const [ error, setError ] = useState(null);

	// I am using a ref so I can excape an inifinte loop as _query is an array, so with every calll is seen as "different"
	const queryRef = useRef(_query).current;
	const orderByRef = useRef(_orderBy).current;

	useEffect(
		() => {
			let colRef = collection(projectFirestore, collectionName);
			let q = query(colRef);

			if (queryRef) {
				q = where(...query);
			}
			if (orderByRef) {
				q = orderBy(...orderBy);
			}

			const unsubscribe = onSnapshot(
				q,
				(snapshot) => {
					let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ ...doc.data(), id: doc.id });
					});

					// update state
					setDocuments(results);
					setError(null);
				},
				(error) => {
					console.log(error);
					setError('could not fetch the data');
				}
			);

			// unsubscribe on unmount
			return () => unsubscribe();
		},
		[ collectionName, queryRef, orderByRef ]
	);

	return { documents, error };
};
