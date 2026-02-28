import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { db as neonDB, initializeDatabase } from '../lib/neon';
import bcrypt from 'bcryptjs';

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

  /**
   * Initialize Neon DB tables on first load
   */
  useEffect(() => {
    initializeDatabase();
  }, []);

  /**
   * Signup with email/password
   * Creates user in Firebase Auth AND Neon DB
   */
  async function signup({ email, password, name, role, specialty, phone }) {
    try {
      setError(null);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase profile with display name
      await updateProfile(userCredential.user, { displayName: name });
      
      // Hash password for Neon DB storage
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Store user data in Neon DB
      await neonDB.users.create({
        name,
        email,
        passwordHash,
        role,
        specialty: role === 'doctor' ? specialty : null,
        phone,
        status: 'active'
      });
      
      // Also store in Firestore for backward compatibility
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

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Login with email/password
   * Authenticates via Firebase, fetches role from Neon DB
   */
  async function login(email, password) {
    try {
      setError(null);
      
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      // If Firebase fails, try Neon DB authentication
      try {
        const user = await neonDB.users.findByEmail(email);
        
        if (!user) {
          const msg = 'Invalid email or password';
          setError(msg);
          return { success: false, error: msg };
        }
        
        const isValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isValid) {
          const msg = 'Invalid email or password';
          setError(msg);
          return { success: false, error: msg };
        }
        
        // Create Firebase session for Neon DB user
        // Note: This requires creating a Firebase user first or using custom tokens
        const msg = 'Please sign up first or use Firebase authentication';
        setError(msg);
        return { success: false, error: msg };
        
      } catch (neonError) {
        console.error('Neon DB login error:', neonError);
        const errorMessage = getErrorMessage(error.code);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
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
        const role = await getUserRole(user.uid);
        setUserRole(role);
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
function getErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid email or password',
  };
  
  return messages[code] || 'An error occurred. Please try again.';
}

export default AuthContext;
