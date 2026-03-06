import { collection, addDoc, getDocs, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

/* ─── SEED DEMO USER ACCOUNTS ────────────────────────────────────── */
// Creates demo accounts in Firestore if they exist in Auth but not in Firestore
export async function seedDemoUserAccounts() {
  const demoUsers = [
    { email: 'admin@clinic.com', role: 'admin', name: 'Admin User' },
    { email: 'doctor@clinic.com', role: 'doctor', name: 'Dr. Ahmed Khan', specialty: 'General Physician' },
    { email: 'receptionist@clinic.com', role: 'receptionist', name: 'Sara Ali' },
    { email: 'patient@clinic.com', role: 'patient', name: 'Ali Hassan' },
  ];

  const usersRef = collection(db, 'users');
  
  for (const demoUser of demoUsers) {
    const q = query(usersRef, where('email', '==', demoUser.email));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Create the user record in Firestore
      await addDoc(usersRef, {
        ...demoUser,
        specialty: demoUser.specialty || null,
        phone: null,
        status: 'active',
        uid: `demo_${demoUser.role}`,
        createdAt: new Date().toISOString(),
      });
    }
  }
}

/* ─── ADMIN SEED ─────────────────────────────────────────────────── */
export async function seedAdminData(adminUid) {
  const flag = `seeded_admin_${adminUid}`;
  if (localStorage.getItem(flag)) return;

  // 5 Demo Doctors
  const doctors = [
    { name: 'Dr. Imran Malik',  email: 'imran@clinic.com',   specialty: 'Cardiologist',    phone: '0300-1111001', role: 'doctor', status: 'active' },
    { name: 'Dr. Fatima Zahra', email: 'fatima@clinic.com',  specialty: 'Neurologist',     phone: '0300-1111002', role: 'doctor', status: 'active' },
    { name: 'Dr. Usman Ahmed',  email: 'usman@clinic.com',   specialty: 'Pediatrician',    phone: '0300-1111003', role: 'doctor', status: 'active' },
    { name: 'Dr. Ayesha Khan',  email: 'ayesha@clinic.com',  specialty: 'Dermatologist',   phone: '0300-1111004', role: 'doctor', status: 'active' },
    { name: 'Dr. Hassan Raza',  email: 'hassan@clinic.com',  specialty: 'Orthopedic',      phone: '0300-1111005', role: 'doctor', status: 'active' },
  ];

  // 3 Demo Receptionists
  const receptionists = [
    { name: 'Sara Bibi',   email: 'sara@clinic.com',  phone: '0300-2222001', role: 'receptionist', status: 'active' },
    { name: 'Maria Khan',  email: 'maria@clinic.com', phone: '0300-2222002', role: 'receptionist', status: 'active' },
    { name: 'Zara Ahmed',  email: 'zara@clinic.com',  phone: '0300-2222003', role: 'receptionist', status: 'active' },
  ];

  // 10 Demo Patients (in users collection)
  const patients = [
    { name: 'Ali Hassan',    email: 'ali@gmail.com',    role: 'patient', status: 'active', phone: '0300-3333001' },
    { name: 'Nadia Akhtar',  email: 'nadia@gmail.com',  role: 'patient', status: 'active', phone: '0300-3333002' },
    { name: 'Bilal Sheikh',  email: 'bilal@gmail.com',  role: 'patient', status: 'active', phone: '0300-3333003' },
    { name: 'Sana Mirza',    email: 'sana@gmail.com',   role: 'patient', status: 'active', phone: '0300-3333004' },
    { name: 'Kamran Butt',   email: 'kamran@gmail.com', role: 'patient', status: 'active', phone: '0300-3333005' },
    { name: 'Hira Nadeem',   email: 'hira@gmail.com',   role: 'patient', status: 'active', phone: '0300-3333006' },
    { name: 'Tariq Javed',   email: 'tariq@gmail.com',  role: 'patient', status: 'active', phone: '0300-3333007' },
    { name: 'Amna Siddiqui', email: 'amna@gmail.com',   role: 'patient', status: 'active', phone: '0300-3333008' },
    { name: 'Zubair Ali',    email: 'zubair@gmail.com', role: 'patient', status: 'active', phone: '0300-3333009' },
    { name: 'Rabia Qureshi', email: 'rabia@gmail.com',  role: 'patient', status: 'active', phone: '0300-3333010' },
  ];

  const all = [...doctors, ...receptionists, ...patients];
  for (const u of all) {
    await addDoc(collection(db, 'users'), {
      ...u,
      specialty: u.specialty || null,
      uid: `demo_${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(flag, '1');
}

/* ─── DOCTOR SEED ────────────────────────────────────────────────── */
export async function seedDoctorData(doctorId, doctorName) {
  const flag = `seeded_doctor_${doctorId}`;
  if (localStorage.getItem(flag)) return;

  // Check Firestore too
  const existing = await getDocs(query(collection(db, 'patients'), where('doctorId', '==', doctorId)));
  if (existing.size > 0) { localStorage.setItem(flag, '1'); return; }

  const myPatients = [
    { name: 'Ali Hassan',   age: '35', gender: 'Male',   phone: '0300-3333001', email: 'ali@gmail.com',   status: 'active',   doctorId },
    { name: 'Nadia Akhtar', age: '28', gender: 'Female', phone: '0300-3333002', email: 'nadia@gmail.com', status: 'active',   doctorId },
    { name: 'Bilal Sheikh', age: '45', gender: 'Male',   phone: '0300-3333003', email: 'bilal@gmail.com', status: 'active',   doctorId },
    { name: 'Sana Mirza',   age: '32', gender: 'Female', phone: '0300-3333004', email: 'sana@gmail.com',  status: 'active',   doctorId },
    { name: 'Kamran Butt',  age: '52', gender: 'Male',   phone: '0300-3333005', email: '',               status: 'active',   doctorId },
    { name: 'Hira Nadeem',  age: '24', gender: 'Female', phone: '0300-3333006', email: '',               status: 'active',   doctorId },
  ];

  const patientDocs = [];
  for (const p of myPatients) {
    const ref = await addDoc(collection(db, 'patients'), { ...p, createdAt: new Date().toISOString() });
    patientDocs.push({ id: ref.id, ...p });
  }

  const appointments = [
    { patientName: 'Ali Hassan',   doctorId, doctorName, patientId: patientDocs[0].id, date: today,     time: '09:00', type: 'General',   status: 'pending' },
    { patientName: 'Nadia Akhtar', doctorId, doctorName, patientId: patientDocs[1].id, date: today,     time: '10:30', type: 'Follow-up', status: 'in-progress' },
    { patientName: 'Bilal Sheikh', doctorId, doctorName, patientId: patientDocs[2].id, date: today,     time: '11:00', type: 'General',   status: 'completed' },
    { patientName: 'Sana Mirza',   doctorId, doctorName, patientId: patientDocs[3].id, date: tomorrow,  time: '09:00', type: 'Specialist',status: 'pending' },
    { patientName: 'Kamran Butt',  doctorId, doctorName, patientId: patientDocs[4].id, date: tomorrow,  time: '11:30', type: 'Follow-up', status: 'pending' },
    { patientName: 'Hira Nadeem',  doctorId, doctorName, patientId: patientDocs[5].id, date: yesterday, time: '14:00', type: 'General',   status: 'completed' },
  ];

  for (const a of appointments) {
    await addDoc(collection(db, 'appointments'), { ...a, createdAt: new Date().toISOString() });
  }

  localStorage.setItem(flag, '1');
}

/* ─── RECEPTIONIST SEED ──────────────────────────────────────────── */
export async function seedReceptionistData(receptionistId) {
  const flag = `seeded_receptionist_${receptionistId}`;
  if (localStorage.getItem(flag)) return;

  const existing = await getDocs(collection(db, 'patients'));
  if (existing.size > 0) { localStorage.setItem(flag, '1'); return; }

  const patients = [
    { name: 'Ali Hassan',    age: '35', gender: 'Male',   phone: '0300-3333001', email: 'ali@gmail.com',    status: 'active',  doctorId: 'demo_dr1' },
    { name: 'Nadia Akhtar',  age: '28', gender: 'Female', phone: '0300-3333002', email: 'nadia@gmail.com',  status: 'active',  doctorId: 'demo_dr1' },
    { name: 'Bilal Sheikh',  age: '45', gender: 'Male',   phone: '0300-3333003', email: 'bilal@gmail.com',  status: 'active',  doctorId: 'demo_dr2' },
    { name: 'Sana Mirza',    age: '32', gender: 'Female', phone: '0300-3333004', email: 'sana@gmail.com',   status: 'active',  doctorId: 'demo_dr2' },
    { name: 'Kamran Butt',   age: '52', gender: 'Male',   phone: '0300-3333005', email: '',                status: 'active',  doctorId: 'demo_dr1' },
    { name: 'Hira Nadeem',   age: '24', gender: 'Female', phone: '0300-3333006', email: '',                status: 'active',  doctorId: 'demo_dr3' },
    { name: 'Tariq Javed',   age: '41', gender: 'Male',   phone: '0300-3333007', email: 'tariq@gmail.com',  status: 'active',  doctorId: 'demo_dr3' },
    { name: 'Amna Siddiqui', age: '29', gender: 'Female', phone: '0300-3333008', email: 'amna@gmail.com',   status: 'active',  doctorId: 'demo_dr2' },
  ];

  const patientRefs = [];
  for (const p of patients) {
    const ref = await addDoc(collection(db, 'patients'), { ...p, createdAt: new Date().toISOString() });
    patientRefs.push({ id: ref.id, name: p.name });
  }

  const appointments = [
    { patientId: patientRefs[0].id, patientName: 'Ali Hassan',    doctorId: 'demo_dr1', doctorName: 'Dr. Imran Malik',  date: today,    time: '09:00', type: 'General',    status: 'pending' },
    { patientId: patientRefs[1].id, patientName: 'Nadia Akhtar',  doctorId: 'demo_dr1', doctorName: 'Dr. Imran Malik',  date: today,    time: '10:30', type: 'Follow-up',  status: 'completed' },
    { patientId: patientRefs[2].id, patientName: 'Bilal Sheikh',  doctorId: 'demo_dr2', doctorName: 'Dr. Fatima Zahra', date: today,    time: '11:00', type: 'Emergency',  status: 'in-progress' },
    { patientId: patientRefs[3].id, patientName: 'Sana Mirza',    doctorId: 'demo_dr2', doctorName: 'Dr. Fatima Zahra', date: today,    time: '14:00', type: 'Specialist', status: 'pending' },
    { patientId: patientRefs[4].id, patientName: 'Kamran Butt',   doctorId: 'demo_dr1', doctorName: 'Dr. Imran Malik',  date: tomorrow, time: '09:30', type: 'General',    status: 'pending' },
    { patientId: patientRefs[5].id, patientName: 'Hira Nadeem',   doctorId: 'demo_dr3', doctorName: 'Dr. Usman Ahmed',  date: tomorrow, time: '11:00', type: 'General',    status: 'pending' },
  ];

  for (const a of appointments) {
    await addDoc(collection(db, 'appointments'), { ...a, createdAt: new Date().toISOString() });
  }

  localStorage.setItem(flag, '1');
}

/* ─── PATIENT SEED ───────────────────────────────────────────────── */
export async function seedPatientData(patientId, patientName) {
  const flag = `seeded_patient_${patientId}`;
  if (localStorage.getItem(flag)) return;

  const existing = await getDocs(query(collection(db, 'appointments'), where('patientId', '==', patientId)));
  if (existing.size > 0) { localStorage.setItem(flag, '1'); return; }

  const appointments = [
    { patientId, patientName, doctorId: 'demo_dr1', doctorName: 'Dr. Imran Malik',  date: today,     time: '10:00', type: 'General',   status: 'pending' },
    { patientId, patientName, doctorId: 'demo_dr2', doctorName: 'Dr. Fatima Zahra', date: tomorrow,  time: '11:30', type: 'Follow-up', status: 'pending' },
    { patientId, patientName, doctorId: 'demo_dr1', doctorName: 'Dr. Imran Malik',  date: yesterday, time: '09:00', type: 'General',   status: 'completed' },
    { patientId, patientName, doctorId: 'demo_dr3', doctorName: 'Dr. Usman Ahmed',  date: nextWeek,  time: '14:00', type: 'Specialist',status: 'pending' },
  ];

  for (const a of appointments) {
    await addDoc(collection(db, 'appointments'), { ...a, createdAt: new Date().toISOString() });
  }

  const prescriptions = [
    {
      patientId, doctorId: 'demo_dr1', doctorName: 'Dr. Imran Malik',
      date: yesterday,
      medicines: ['Panadol 500mg - 2x daily', 'Amoxicillin 250mg - 3x daily', 'Vitamin C 1000mg - 1x daily'],
      notes: 'Complete the antibiotic course. Rest and drink plenty of water.',
      createdAt: new Date().toISOString(),
    },
    {
      patientId, doctorId: 'demo_dr2', doctorName: 'Dr. Fatima Zahra',
      date: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
      medicines: ['Brufen 400mg - After meals', 'Omeprazole 20mg - Before meals'],
      notes: 'Avoid spicy food. Follow-up in 2 weeks.',
      createdAt: new Date().toISOString(),
    },
  ];

  for (const rx of prescriptions) {
    await addDoc(collection(db, 'prescriptions'), rx);
  }

  localStorage.setItem(flag, '1');
}
