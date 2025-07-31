// src/hooks/useAuth.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@src/firebase/config"; // Ensure @src alias
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore"; // <--- ADD THIS IMPORT
import Cookies from "js-cookie"; // <--- ADD THIS IMPORT
import { db } from "@src/firebase/config"; // <--- ADD THIS IMPORT (for firestore instance)


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => { // <--- ADD 'async' here
      if (u) {
        setUser(u);
        setLoading(false);

        // --- ADD THIS BLOCK FOR REFERRER ID ---
        const userDocRef = doc(db, "users", u.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Only set referrerId if user document doesn't exist OR it exists but doesn't have a referrerId
        if (!userDocSnap.exists() || !userDocSnap.data()?.referrerId) {
          const affiliateRef = Cookies.get("affiliate_ref");
          if (affiliateRef) {
            await setDoc(
              userDocRef,
              { referrerId: affiliateRef },
              { merge: true } // Use merge to avoid overwriting other user data
            );
          }
        }
        // -------------------------------------
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithEmail = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);

  const signInWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const signOutUser = () => firebaseSignOut(auth);

  const signUpWithEmail = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signInWithGoogle,
        signOut: signOutUser,
        signUpWithEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
