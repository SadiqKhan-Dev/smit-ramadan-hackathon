import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Race a promise against a timeout; resolves with { timedOut: true } on timeout
function withTimeout(promise, ms) {
  return Promise.race([
    promise.then(v => ({ timedOut: false, value: v })),
    new Promise(resolve => setTimeout(() => resolve({ timedOut: true }), ms)),
  ]);
}

export async function createUserAccount({ name, email, password, role, specialty, phone }) {
  const secondaryApp = initializeApp(firebaseConfig, `tmp_${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    // 1 — Create Firebase Auth account (secondary app so admin stays signed in)
    const { user } = await createUserWithEmailAndPassword(secondaryAuth, email, password);

    const profileData = {
      uid:        user.uid,
      name,
      email,
      role,
      specialty:  specialty || null,
      phone:      phone     || null,
      status:     'active',
      hasAccount: true,
      createdAt:  new Date().toISOString(),
    };

    // 2 — Try to save Firestore profile within 5 seconds
    const result = await withTimeout(
      setDoc(doc(db, 'users', user.uid), profileData),
      5000
    );

    if (result.timedOut) {
      // Firestore too slow — retry once more in background, still return success
      // because Auth account is created. Doctor can login once Firestore syncs.
      setDoc(doc(db, 'users', user.uid), profileData)
        .catch(err => console.warn('Background profile retry failed:', err.message));
      console.warn('Firestore profile save timed out — retrying in background');
    }

    // 3 — Sign out from secondary app
    signOut(secondaryAuth).catch(() => {});

    return { success: true, uid: user.uid };
  } catch (err) {
    const errorMap = {
      'auth/email-already-in-use': 'Yeh email already registered hai',
      'auth/weak-password':        'Password kam az kam 6 characters ka hona chahiye',
      'auth/invalid-email':        'Email address galat hai',
      'auth/network-request-failed': 'Network error. Internet connection check karo.',
    };
    return { success: false, error: errorMap[err.code] || err.message };
  } finally {
    setTimeout(() => { try { deleteApp(secondaryApp); } catch (_) {} }, 5000);
  }
}
