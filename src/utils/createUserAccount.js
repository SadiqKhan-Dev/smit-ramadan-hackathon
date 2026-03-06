import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

export async function createUserAccount({ name, email, password, role, specialty, phone }) {
  const secondaryApp  = initializeApp(firebaseConfig, `tmp_${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);
  const secondaryDb   = getFirestore(secondaryApp);

  try {
    // 1 — Create Firebase Auth account
    const { user } = await createUserWithEmailAndPassword(secondaryAuth, email, password);

    // 2 — Store role in displayName using "role::name" format
    //     This is the PRIMARY way role is fetched at login (100% reliable, no Firestore needed)
    await updateProfile(user, { displayName: `${role}::${name}` });

    // 3 — Save Firestore profile as background (nice-to-have, not required for login)
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
    setDoc(doc(secondaryDb, 'users', user.uid), profileData)
      .catch(err => console.warn('Firestore profile save failed (non-critical):', err.message));

    // 4 — Sign out secondary user
    signOut(secondaryAuth).catch(() => {});

    return { success: true, uid: user.uid };
  } catch (err) {
    const errorMap = {
      'auth/email-already-in-use':   'Yeh email already registered hai',
      'auth/weak-password':          'Password kam az kam 6 characters ka hona chahiye',
      'auth/invalid-email':          'Email address galat hai',
      'auth/network-request-failed': 'Network error. Internet connection check karo.',
    };
    return { success: false, error: errorMap[err.code] || err.message };
  } finally {
    setTimeout(() => { try { deleteApp(secondaryApp); } catch (_) {} }, 10000);
  }
}
