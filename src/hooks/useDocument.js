// Use document hook

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collectionName, id) => {
	const [ projectDocument, setProjectDocument ] = useState(null);
	const [ error, setError ] = useState(null);

	useEffect(
		() => {
			const docRef = doc(projectFirestore, collectionName, id);
			const unsubscribe = onSnapshot(
				docRef,
				(snapshot) => {
					if (snapshot.data()) {
						setProjectDocument({
							...snapshot.data(),
							id: snapshot.id
						});
						setError(null);
					} else {
						setError('No document!');
					}
				},
				(error) => {
					console.log(error);
					setError('Failed to get the document!');
				}
			);
			return () => unsubscribe();
		},
		[ collectionName, id ]
	);

	return {
		projectDocument,
		error
	};
};
