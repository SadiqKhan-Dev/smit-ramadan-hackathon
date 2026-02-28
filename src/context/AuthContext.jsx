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

// localStorage helpers — role cached by uid, never cleared so login always works
function saveRoleLocally(uid, role) {
  try { localStorage.setItem(`cp_role_${uid}`, role); } catch (_) {}
}
function getRoleLocally(uid) {
  try { return localStorage.getItem(`cp_role_${uid}`); } catch (_) { return null; }
}

// Fetch role: Firestore first, localStorage fallback
async function fetchRole(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists() && snap.data().role) {
      saveRoleLocally(uid, snap.data().role); // keep cache fresh
      return snap.data().role;
    }
  } catch (err) {
    console.warn('Firestore role fetch failed, using cache:', err.message);
  }
  return getRoleLocally(uid); // always falls back to localStorage
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const pendingRoleRef                = useRef(null); // signup race-condition guard

  /* ── SIGNUP ─────────────────────────────────────────────────────── */
  async function signup({ email, password, name, role, specialty, phone }) {
    try {
      setError(null);
      pendingRoleRef.current = role;

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid, name, email, role,
        specialty: role === 'doctor' ? specialty : null,
        phone,
        createdAt: new Date().toISOString(),
        status: 'active',
      });

      saveRoleLocally(user.uid, role);
      setUserRole(role);
      pendingRoleRef.current = null;
      return { success: true };
    } catch (err) {
      pendingRoleRef.current = null;
      const msg = getErrorMessage(err.code, err.message);
      setError(msg);
      return { success: false, error: msg };
    }
  }

  /* ── LOGIN ───────────────────────────────────────────────────────── */
  async function login(email, password) {
    try {
      setError(null);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Set role BEFORE navigate so DashboardRouter never has to wait
      const role = await fetchRole(user.uid);
      if (role) setUserRole(role);

      return { success: true };
    } catch (err) {
      const msg = getErrorMessage(err.code, err.message);
      setError(msg);
      return { success: false, error: msg };
    }
  }

  /* ── LOGOUT ──────────────────────────────────────────────────────── */
  async function logout() {
    try {
      await signOut(auth);
      setUserRole(null);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to logout' };
    }
    // NOTE: localStorage is intentionally NOT cleared — the cached role is
    // uid-scoped and lets the next login work even if Firestore is slow.
  }

  /* ── AUTH STATE LISTENER ─────────────────────────────────────────── */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        let role = await fetchRole(user.uid);

        // Last resort: if Firestore AND localStorage both fail (brand-new signup),
        // use the role we stored in the ref before createUserWithEmailAndPassword.
        if (!role) {
          await new Promise(r => setTimeout(r, 1000));
          role = await fetchRole(user.uid);
        }

        setUserRole(role || pendingRoleRef.current || null);
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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

function getErrorMessage(code, fallback) {
  const map = {
    'auth/email-already-in-use':    'This email is already registered',
    'auth/invalid-email':            'Invalid email address',
    'auth/operation-not-allowed':   'Email/password sign-in is not enabled in Firebase Console.',
    'auth/weak-password':            'Password should be at least 6 characters',
    'auth/user-disabled':            'This account has been disabled',
    'auth/user-not-found':           'No account found with this email',
    'auth/wrong-password':           'Incorrect password',
    'auth/too-many-requests':        'Too many failed attempts. Please try again later.',
    'auth/network-request-failed':  'Network error. Please check your connection.',
    'auth/invalid-credential':       'Invalid email or password',
    'auth/invalid-api-key':          'Firebase API key missing. Check Vercel environment variables.',
    'auth/configuration-not-found': 'Firebase not configured. Check environment variables.',
    'auth/internal-error':           'Firebase internal error. Check browser console.',
  };
  return map[code] || fallback || 'An error occurred. Please try again.';
}

export default AuthContext;
