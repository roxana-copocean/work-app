//  SIGNUP HOOK

import { useState, useEffect } from 'react';
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useAuthContext } from './useAuthContext';
import { collection, doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
	const [ isCancelled, setIsCancelled ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ isPending, setIsPending ] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);

		try {
			// sign up the user
			const res = await createUserWithEmailAndPassword(projectAuth, email, password);
			if (!res) {
				throw new Error('Could not complete signup');
			}
			//  upload the user profile image
			// we create a folder in the firebase storage, we name it thumbnails, we go to the user/by usingh his id, and we use the name of the picture he uploaded to store it by its name
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

			const storageRef = ref(projectStorage, uploadPath);
			await uploadBytes(storageRef, thumbnail);

			const imgUrl = await getDownloadURL(storageRef);

			// add display name to user
			const authUser = projectAuth.currentUser;
			await updateProfile(authUser, { displayName, photoURL: imgUrl });

			// creating a user document
			const usersColection = collection(projectFirestore, 'users');
			const userDoc = doc(usersColection, res.user.uid);
			await setDoc(userDoc, {
				online: true,
				displayName: displayName,
				photoURL: imgUrl
			});

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
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
	return {
		signup,
		error,
		isPending
	};
};
