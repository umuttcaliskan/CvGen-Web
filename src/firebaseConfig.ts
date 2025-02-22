import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCykOQkK07hUbrhiFfl6J8ma7cCb1H4ipQ",
  authDomain: "resumebuilder-picksoso.firebaseapp.com",
  projectId: "resumebuilder-picksoso",
  storageBucket: "resumebuilder-picksoso.firebasestorage.app",
  messagingSenderId: "934278391962",
  appId: "1:934278391962:web:6068955921992528ac5723",
  measurementId: "G-X6Z55TCGQK"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firestore ve Auth nesnelerini oluştur
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }; 