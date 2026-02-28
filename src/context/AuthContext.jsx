import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { initializeDatabase } from '../lib/neon';

const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages authentication with both Firebase and Neon DB
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stores the role chosen during signup so onAuthStateChanged can use it
  // as a fallback when Firestore hasn't written the doc yet (race condition)
  const pendingRoleRef = useRef(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  /**
   * Signup with email/password
   * Creates user in Firebase Auth AND Firestore
   */
  async function signup({ email, password, name, role, specialty, phone }) {
    try {
      setError(null);

      // Store role BEFORE creating user so onAuthStateChanged can use it
      pendingRoleRef.current = role;

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update Firebase profile with display name
      await updateProfile(userCredential.user, { displayName: name });

      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role,
        specialty: role === 'doctor' ? specialty : null,
        phone,
        createdAt: new Date().toISOString(),
        status: 'active',
      });

      setUserRole(role);
      pendingRoleRef.current = null;

      return { success: true };
    } catch (error) {
      pendingRoleRef.current = null;
      console.error('Signup error:', error.code, error.message);
      const errorMessage = getErrorMessage(error.code, error.message);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Login with email/password
   * Authenticates via Firebase Auth
   */
  async function login(email, password) {
    try {
      setError(null);

      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      const errorMessage = getErrorMessage(error.code, error.message);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Logout
   */
  async function logout() {
    try {
      await signOut(auth);
      setUserRole(null);
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Failed to logout' };
    }
    return { success: true };
  }

  /**
   * Get user role from Firestore or Neon DB
   */
  async function getUserRole(uid) {
    try {
      // Try Firestore first
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      
      // Fallback to Neon DB (would need email lookup)
      return null;
    } catch (error) {
      console.error('Get user role error:', error);
      return null;
    }
  }

  /**
   * Listen to auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        let role = await getUserRole(user.uid);

        // Race condition: onAuthStateChanged fires before setDoc completes on
        // new signup. Retry once after a short delay, then fall back to the
        // role stored in pendingRoleRef before createUserWithEmailAndPassword.
        if (!role) {
          await new Promise(r => setTimeout(r, 800));
          role = await getUserRole(user.uid);
        }

        setUserRole(role || pendingRoleRef.current);
        if (role) pendingRoleRef.current = null;
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    error,
    signup,
    login,
    logout,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Get human-readable error messages
 */
function getErrorMessage(code, fallback) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled. Enable it in Firebase Console → Authentication → Sign-in method.',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/invalid-api-key': 'Firebase API key is missing or invalid. Check your environment variables.',
    'auth/app-not-authorized': 'This app is not authorized to use Firebase Authentication.',
    'auth/configuration-not-found': 'Firebase configuration not found. Check your environment variables.',
    'auth/internal-error': 'Firebase internal error. Check browser console for details.',
  };

  return messages[code] || fallback || 'An error occurred. Please try again.';
}

export default AuthContext;
