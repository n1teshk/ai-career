// src/hooks/useAuth.jsx
import React, { useState, useEffect, createContext, useContext } from 'react'; // Added createContext, useContext
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config'; // Make sure this path is correct

// Create an Auth Context
const AuthContext = createContext(null);

// Custom hook to use the authentication context
// This hook provides the auth state and functions
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your application
export const AuthProvider = ({ children }) => { // Export AuthProvider
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const signupWithEmail = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      console.error("Email signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      console.error("Email login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const value = { // The value provided by the context
    user,
    loading,
    error,
    signInWithGoogle,
    signupWithEmail,
    loginWithEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children once loading is false */}
    </AuthContext.Provider>
  );
};
