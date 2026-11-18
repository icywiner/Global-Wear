import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAkVGlTq-KLe443x1zprcdyPVfM1k9234Y',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'global-wear.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'global-wear',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'global-wear.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '211115249334',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:211115249334:web:4cba2d3541c6db03c6a017',
};

const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
