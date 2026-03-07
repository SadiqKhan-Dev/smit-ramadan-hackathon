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

// ── localStorage helpers ──────────────────────────────────────────
function saveRoleLocally(uid, role) {
  try { localStorage.setItem(`cp_role_${uid}`, role); } catch (_) {}
}
function getRoleLocally(uid) {
  try { return localStorage.getItem(`cp_role_${uid}`); } catch (_) { return null; }
}

// ── Self-heal: encode role in Auth displayName so future logins
//    never need Firestore. Fire-and-forget.
function healDisplayName(user, role) {
  if (!user || !role) return;
  // Only update if not already in role::name format
  if (user.displayName?.startsWith(`${role}::`)) return;
  const name = user.displayName?.includes('::')
    ? user.displayName.split('::')[1]
    : user.displayName || user.email?.split('@')[0] || role;
  updateProfile(user, { displayName: `${role}::${name}` }).catch(() => {});
}

// ── Fetch role: Auth displayName → Firestore (with retry) → localStorage
async function fetchRole(uid) {
  // Priority 1: Auth displayName "role::name" format (100% reliable, no Firestore)
  const authUser = auth.currentUser;
  if (authUser && authUser.uid === uid && authUser.displayName?.includes('::')) {
    const role = authUser.displayName.split('::')[0];
    if (['admin', 'doctor', 'receptionist', 'patient'].includes(role)) {
      saveRoleLocally(uid, role);
      return role;
    }
  }

  // Priority 2: Firestore — getDoc (uses cache if available, more reliable than getDocFromServer)
  const firestoreRead = async () => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 8000)
    );
    const snap = await Promise.race([getDoc(doc(db, 'users', uid)), timeout]);
    if (snap.exists && snap.exists() && snap.data().role) {
      return snap.data().role;
    }
    return null;
  };

  try {
    const role = await firestoreRead();
    if (role) {
      saveRoleLocally(uid, role);
      // Self-heal: encode in displayName so next login skips Firestore
      healDisplayName(authUser, role);
      return role;
    }
  } catch (err) {
    console.warn('Firestore read attempt 1 failed:', err.message);
    // Retry once after 2 seconds
    try {
      await new Promise(r => setTimeout(r, 2000));
      const role = await firestoreRead();
      if (role) {
        saveRoleLocally(uid, role);
        healDisplayName(authUser, role);
        return role;
      }
    } catch (err2) {
      console.warn('Firestore read attempt 2 failed:', err2.message);
    }
  }

  // Priority 3: localStorage cache (works after first successful login)
  return getRoleLocally(uid);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const pendingRoleRef                = useRef(null);

  /* ── SIGNUP ──────────────────────────────────────────────────── */
  async function signup({ email, password, name, role, specialty, phone }) {
    try {
      setError(null);
      pendingRoleRef.current = role;

      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Store role in displayName → login never needs Firestore
      await updateProfile(user, { displayName: `${role}::${name}` });

      // Also save to Firestore (best-effort, not blocking login)
      setDoc(doc(db, 'users', user.uid), {
        uid: user.uid, name, email, role,
        specialty: role === 'doctor' ? (specialty || null) : null,
        phone: phone || null,
        createdAt: new Date().toISOString(),
        status: 'active',
      }).catch(err => console.warn('Firestore profile save failed:', err.message));

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

  /* ── LOGIN ───────────────────────────────────────────────────── */
  async function login(email, password) {
    try {
      setError(null);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      let role = await fetchRole(user.uid);
      if (role) setUserRole(role);

      return { success: true, role: role || getRoleLocally(user.uid) };
    } catch (err) {
      const msg = getErrorMessage(err.code, err.message);
      setError(msg);
      return { success: false, error: msg };
    }
  }

  /* ── LOGOUT ──────────────────────────────────────────────────── */
  async function logout() {
    try {
      await signOut(auth);
      setUserRole(null);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to logout' };
    }
  }

  /* ── AUTH STATE LISTENER ─────────────────────────────────────── */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        let role = await fetchRole(user.uid);

        if (!role) {
          // One extra retry for brand-new signups where Firestore may not be ready
          await new Promise(r => setTimeout(r, 1500));
          role = await fetchRole(user.uid);
        }

        const finalRole = role || pendingRoleRef.current || null;
        if (finalRole) healDisplayName(user, finalRole);
        setUserRole(finalRole);
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
