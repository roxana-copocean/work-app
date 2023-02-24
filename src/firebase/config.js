import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBPhU8eX7tYEaChkH6RmBT5E98i9oaVRA0',
	authDomain: 'social-app-446db.firebaseapp.com',
	projectId: 'social-app-446db',
	storageBucket: 'social-app-446db.appspot.com',
	messagingSenderId: '614919563139',
	appId: '1:614919563139:web:f2b55015b67003916b38b6'
};

const app = initializeApp(firebaseConfig);

//  db -database
const projectFirestore = initializeFirestore(app, { experimentalForceLongPolling: true });

const projectAuth = getAuth(app);
const projectStorage = getStorage(app);

// Firebase timestamp
const timestamp = serverTimestamp();

export { projectFirestore, projectAuth, timestamp, projectStorage };
