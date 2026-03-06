import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Secondary app uses same Firebase project config
// This lets us create Auth accounts WITHOUT signing out the currently logged-in admin
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

export async function createUserAccount({ name, email, password, role, specialty, phone }) {
  // Each call gets a unique app name so multiple calls don't conflict
  const secondaryApp = initializeApp(firebaseConfig, `tmp_${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const { user } = await createUserWithEmailAndPassword(secondaryAuth, email, password);

    // Fire-and-forget Firestore profile — never block on this (Firestore can hang offline)
    setDoc(doc(db, 'users', user.uid), {
      uid:        user.uid,
      name,
      email,
      role,
      specialty:  specialty || null,
      phone:      phone     || null,
      status:     'active',
      hasAccount: true,
      createdAt:  new Date().toISOString(),
    }).catch(err => console.warn('Firestore profile save failed (non-blocking):', err.message));

    // Sign the new user out of the secondary app (also non-blocking)
    signOut(secondaryAuth).catch(() => {});

    return { success: true, uid: user.uid };
  } catch (err) {
    const errorMap = {
      'auth/email-already-in-use': 'Yeh email already registered hai',
      'auth/weak-password':        'Password kam az kam 6 characters ka hona chahiye',
      'auth/invalid-email':        'Email address galat hai',
      'auth/network-request-failed': 'Network error. Internet check karo.',
    };
    return { success: false, error: errorMap[err.code] || err.message };
  } finally {
    // Delay cleanup so signOut has time to finish
    setTimeout(() => { try { deleteApp(secondaryApp); } catch (_) {} }, 3000);
  }
}
