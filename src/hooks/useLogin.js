// Login Hook

import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
	const [ isCancelled, setIsCancelled ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ isPending, setIsPending ] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);
		try {
			//    login the user
			const res = await signInWithEmailAndPassword(projectAuth, email, password);

			// update the user online status
			const userRef = doc(projectFirestore, 'users', res.user.uid);

			await updateDoc(userRef, { online: true });

			// dispatch login function
			dispatch({ type: 'LOGIN', payload: res.user });

			// update state
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
				console.log(err.message);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { login, isPending, error };
};
