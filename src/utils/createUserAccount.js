import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function createUserAccount({ name, email, password, role, specialty, phone }) {
  const secondaryApp = initializeApp(firebaseConfig, `tmp_${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  // Use secondary app's OWN Firestore — writes as the new user (fresh token, more reliable)
  const secondaryDb = getFirestore(secondaryApp);

  try {
    // 1 — Create Firebase Auth account
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

    // 2 — Save profile as the new user (their fresh token satisfies Firestore rules)
    //     8-second timeout; if it still fails, we return an error to admin
    try {
      await withTimeout(
        setDoc(doc(secondaryDb, 'users', user.uid), profileData),
        8000
      );
    } catch (firestoreErr) {
      console.warn('Firestore profile save failed:', firestoreErr.message);
      // Auth account was created — return partial success with a warning
      return {
        success: true,
        uid: user.uid,
        warning:
          'Account ban gaya lekin profile save nahi ho saka. ' +
          'Doctor/staff login mein masla ho sakta hai. ' +
          'Internet connection check karo aur thodi der mein dobara try karo.',
      };
    }

    // 3 — Sign out from secondary app
    signOut(secondaryAuth).catch(() => {});

    return { success: true, uid: user.uid };
  } catch (err) {
    const errorMap = {
      'auth/email-already-in-use':  'Yeh email already registered hai',
      'auth/weak-password':         'Password kam az kam 6 characters ka hona chahiye',
      'auth/invalid-email':         'Email address galat hai',
      'auth/network-request-failed':'Network error. Internet connection check karo.',
    };
    return { success: false, error: errorMap[err.code] || err.message };
  } finally {
    setTimeout(() => { try { deleteApp(secondaryApp); } catch (_) {} }, 10000);
  }
}
