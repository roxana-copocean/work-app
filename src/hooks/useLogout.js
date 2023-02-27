// Logout Hook

import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export const useLogout = () => {
	const [ isCancelled, setIsCancelled ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ isPending, setIsPending ] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		// sign the user out
		try {
			// update online status
			const userRef = doc(projectFirestore, 'users', projectAuth.currentUser.uid);

			await updateDoc(userRef, { online: false });
			console.log('Successfully updated online status');

			await projectAuth.signOut();
			// dispatch logout function
			dispatch({ type: 'LOGOUT' });

			// update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
			console.log('logged3');
		} catch (error) {
			if (!isCancelled) {
				setError(error.message);
				setIsPending(false);
				console.log(error.message);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	});

	return { logout, error, isPending };
};
