// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUR1Vo9d9SOAQrgc-yrFLphqytQBg79aw",
  authDomain: "ai-career-platform.firebaseapp.com",
  projectId: "ai-career-platform",
  storageBucket: "ai-career-platform.firebasestorage.app",
  messagingSenderId: "164111576255",
  appId: "1:164111576255:web:6c492a7206cd11a725ea0a",
  measurementId: "G-E9EWR83Y1D" // Include measurementId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export db
export default app;
