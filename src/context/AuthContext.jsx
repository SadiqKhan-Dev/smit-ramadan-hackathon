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

const AuthContext = createContext(null);

// --- localStorage helpers ---
function saveRoleLocally(uid, role) {
  try { localStorage.setItem(`cp_role_${uid}`, role); } catch (_) {}
}
function getRoleLocally(uid) {
  try { return localStorage.getItem(`cp_role_${uid}`); } catch (_) { return null; }
}
function clearRoleLocally(uid) {
  try { localStorage.removeItem(`cp_role_${uid}`); } catch (_) {}
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Holds the role chosen at signup so onAuthStateChanged can use it
  // before Firestore setDoc completes (race condition guard)
  const pendingRoleRef = useRef(null);

  async function signup({ email, password, name, role, specialty, phone }) {
    try {
      setError(null);
      pendingRoleRef.current = role;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

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

      // Cache role locally so login works even if Firestore read fails
      saveRoleLocally(userCredential.user.uid, role);
      setUserRole(role);
      pendingRoleRef.current = null;

      return { success: true };
    } catch (err) {
      pendingRoleRef.current = null;
      console.error('Signup error:', err.code, err.message);
      const msg = getErrorMessage(err.code, err.message);
      setError(msg);
      return { success: false, error: msg };
    }
  }

  async function login(email, password) {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err.code, err.message);
      const msg = getErrorMessage(err.code, err.message);
      setError(msg);
      return { success: false, error: msg };
    }
  }

  async function logout() {
    try {
      if (currentUser) clearRoleLocally(currentUser.uid);
      await signOut(auth);
      setUserRole(null);
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      return { success: false, error: 'Failed to logout' };
    }
  }

  // Tries Firestore first, then localStorage, then pendingRoleRef
  async function resolveRole(uid) {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists() && snap.data().role) {
        const role = snap.data().role;
        saveRoleLocally(uid, role); // keep cache fresh
        return role;
      }
    } catch (err) {
      console.error('Firestore role fetch failed:', err.message);
    }

    // Fallback 1 – localStorage (works after first successful login/signup)
    const cached = getRoleLocally(uid);
    if (cached) return cached;

    // Fallback 2 – role set by signup() before onAuthStateChanged fired
    if (pendingRoleRef.current) return pendingRoleRef.current;

    return null;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        let role = await resolveRole(user.uid);

        // If still null, wait 1 s and retry once (new-signup race condition)
        if (!role) {
          await new Promise(r => setTimeout(r, 1000));
          role = await resolveRole(user.uid);
        }

        setUserRole(role);
        pendingRoleRef.current = null;
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, userRole, loading, error, signup, login, logout, setError };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

function getErrorMessage(code, fallback) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled in Firebase Console.',
    'auth/weak-password': 'Password should be at least 6 characters',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/invalid-api-key': 'Firebase API key is missing. Check Vercel environment variables.',
    'auth/configuration-not-found': 'Firebase not configured. Check environment variables.',
    'auth/internal-error': 'Firebase internal error. Check browser console.',
  };
  return messages[code] || fallback || 'An error occurred. Please try again.';
}

export default AuthContext;
