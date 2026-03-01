/**
 * Demo Mock Data - Firestore empty ho to yeh show hoga
 */

const today     = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrow  = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const nextWeek  = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

/* ── DOCTORS ──────────────────────────────────────────────────────── */
export const MOCK_DOCTORS = [
  { id: 'D001', name: 'Dr. Ahmed Khan',    email: 'ahmed@clinic.com',   specialty: 'Cardiologist',    phone: '0300-1111001', role: 'doctor', status: 'active' },
  { id: 'D002', name: 'Dr. Fatima Zahra', email: 'fatima@clinic.com',  specialty: 'Neurologist',     phone: '0300-1111002', role: 'doctor', status: 'active' },
  { id: 'D003', name: 'Dr. Usman Malik',  email: 'usman@clinic.com',   specialty: 'Pediatrician',    phone: '0300-1111003', role: 'doctor', status: 'active' },
  { id: 'D004', name: 'Dr. Ayesha Siddiqi',email: 'ayesha@clinic.com', specialty: 'Dermatologist',   phone: '0300-1111004', role: 'doctor', status: 'active' },
  { id: 'D005', name: 'Dr. Hassan Raza',  email: 'hassan@clinic.com',  specialty: 'Orthopedic',      phone: '0300-1111005', role: 'doctor', status: 'active' },
];

/* ── RECEPTIONISTS ────────────────────────────────────────────────── */
export const MOCK_RECEPTIONISTS = [
  { id: 'R001', name: 'Sara Bibi',   email: 'sara@clinic.com',  phone: '0300-2222001', role: 'receptionist', status: 'active' },
  { id: 'R002', name: 'Maria Khan',  email: 'maria@clinic.com', phone: '0300-2222002', role: 'receptionist', status: 'active' },
  { id: 'R003', name: 'Zara Ahmed',  email: 'zara@clinic.com',  phone: '0300-2222003', role: 'receptionist', status: 'active' },
];

/* ── PATIENTS (for admin & receptionist) ─────────────────────────── */
export const MOCK_PATIENTS_LIST = [
  { id: 'P001', name: 'Ali Hassan',    age: '35', gender: 'Male',   phone: '0300-3333001', email: 'ali@gmail.com',    status: 'active',  doctorId: 'D001' },
  { id: 'P002', name: 'Nadia Akhtar',  age: '28', gender: 'Female', phone: '0300-3333002', email: 'nadia@gmail.com',  status: 'active',  doctorId: 'D001' },
  { id: 'P003', name: 'Bilal Sheikh',  age: '45', gender: 'Male',   phone: '0300-3333003', email: 'bilal@gmail.com',  status: 'active',  doctorId: 'D002' },
  { id: 'P004', name: 'Sana Mirza',    age: '32', gender: 'Female', phone: '0300-3333004', email: 'sana@gmail.com',   status: 'active',  doctorId: 'D002' },
  { id: 'P005', name: 'Kamran Butt',   age: '52', gender: 'Male',   phone: '0300-3333005', email: '',                status: 'active',  doctorId: 'D001' },
  { id: 'P006', name: 'Hira Nadeem',   age: '24', gender: 'Female', phone: '0300-3333006', email: '',                status: 'active',  doctorId: 'D003' },
  { id: 'P007', name: 'Tariq Javed',   age: '41', gender: 'Male',   phone: '0300-3333007', email: 'tariq@gmail.com',  status: 'active',  doctorId: 'D003' },
  { id: 'P008', name: 'Amna Siddiqui', age: '29', gender: 'Female', phone: '0300-3333008', email: 'amna@gmail.com',   status: 'active',  doctorId: 'D004' },
  { id: 'P009', name: 'Zubair Ali',    age: '38', gender: 'Male',   phone: '0300-3333009', email: 'zubair@gmail.com', status: 'active',  doctorId: 'D004' },
  { id: 'P010', name: 'Rabia Qureshi', age: '55', gender: 'Female', phone: '0300-3333010', email: 'rabia@gmail.com',  status: 'active',  doctorId: 'D005' },
];

/* ── PATIENTS (for doctor dashboard - assigned to demo doctor) ────── */
export const MOCK_MY_PATIENTS = [
  { id: 'P001', name: 'Ali Hassan',    age: '35', gender: 'Male',   phone: '0300-3333001', email: 'ali@gmail.com',   status: 'active',  doctorId: 'DEMO_DOCTOR' },
  { id: 'P002', name: 'Nadia Akhtar',  age: '28', gender: 'Female', phone: '0300-3333002', email: 'nadia@gmail.com', status: 'active',  doctorId: 'DEMO_DOCTOR' },
  { id: 'P003', name: 'Bilal Sheikh',  age: '45', gender: 'Male',   phone: '0300-3333003', email: 'bilal@gmail.com', status: 'active',  doctorId: 'DEMO_DOCTOR' },
  { id: 'P004', name: 'Sana Mirza',    age: '32', gender: 'Female', phone: '0300-3333004', email: 'sana@gmail.com',  status: 'active',  doctorId: 'DEMO_DOCTOR' },
  { id: 'P005', name: 'Kamran Butt',   age: '52', gender: 'Male',   phone: '0300-3333005', email: '',               status: 'active',  doctorId: 'DEMO_DOCTOR' },
  { id: 'P006', name: 'Hira Nadeem',   age: '24', gender: 'Female', phone: '0300-3333006', email: '',               status: 'active',  doctorId: 'DEMO_DOCTOR' },
];

/* ── APPOINTMENTS (for doctor dashboard) ─────────────────────────── */
export const MOCK_MY_APPOINTMENTS = [
  { id: 'A001', patientName: 'Ali Hassan',   doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P001', date: today,     time: '09:00', type: 'General',    status: 'completed' },
  { id: 'A002', patientName: 'Nadia Akhtar', doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P002', date: today,     time: '10:30', type: 'Follow-up',  status: 'in-progress' },
  { id: 'A003', patientName: 'Bilal Sheikh', doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P003', date: today,     time: '11:00', type: 'Emergency',  status: 'pending' },
  { id: 'A004', patientName: 'Sana Mirza',   doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P004', date: tomorrow,  time: '09:00', type: 'Specialist', status: 'pending' },
  { id: 'A005', patientName: 'Kamran Butt',  doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P005', date: tomorrow,  time: '11:30', type: 'Follow-up',  status: 'pending' },
  { id: 'A006', patientName: 'Hira Nadeem',  doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P006', date: yesterday, time: '14:00', type: 'General',    status: 'completed' },
];

/* ── APPOINTMENTS (for receptionist) ─────────────────────────────── */
export const MOCK_ALL_APPOINTMENTS = [
  { id: 'A001', patientName: 'Ali Hassan',    doctorName: 'Dr. Ahmed Khan',     patientId: 'P001', doctorId: 'D001', date: today,     time: '09:00', type: 'General',    status: 'completed' },
  { id: 'A002', patientName: 'Nadia Akhtar',  doctorName: 'Dr. Ahmed Khan',     patientId: 'P002', doctorId: 'D001', date: today,     time: '10:30', type: 'Follow-up',  status: 'in-progress' },
  { id: 'A003', patientName: 'Bilal Sheikh',  doctorName: 'Dr. Fatima Zahra',   patientId: 'P003', doctorId: 'D002', date: today,     time: '11:00', type: 'Emergency',  status: 'pending' },
  { id: 'A004', patientName: 'Sana Mirza',    doctorName: 'Dr. Fatima Zahra',   patientId: 'P004', doctorId: 'D002', date: today,     time: '14:00', type: 'Specialist', status: 'pending' },
  { id: 'A005', patientName: 'Kamran Butt',   doctorName: 'Dr. Ahmed Khan',     patientId: 'P005', doctorId: 'D001', date: tomorrow,  time: '09:30', type: 'General',    status: 'pending' },
  { id: 'A006', patientName: 'Hira Nadeem',   doctorName: 'Dr. Usman Malik',    patientId: 'P006', doctorId: 'D003', date: tomorrow,  time: '11:00', type: 'General',    status: 'pending' },
  { id: 'A007', patientName: 'Tariq Javed',   doctorName: 'Dr. Usman Malik',    patientId: 'P007', doctorId: 'D003', date: nextWeek,  time: '10:00', type: 'Follow-up',  status: 'pending' },
  { id: 'A008', patientName: 'Amna Siddiqui', doctorName: 'Dr. Ayesha Siddiqi', patientId: 'P008', doctorId: 'D004', date: yesterday, time: '15:00', type: 'General',    status: 'completed' },
];

/* ── APPOINTMENTS (for patient dashboard) ────────────────────────── */
export const MOCK_PATIENT_APPOINTMENTS = [
  { id: 'A001', doctorName: 'Dr. Ahmed Khan',   date: today,     time: '10:00', type: 'General',    status: 'pending' },
  { id: 'A002', doctorName: 'Dr. Fatima Zahra', date: tomorrow,  time: '11:30', type: 'Follow-up',  status: 'pending' },
  { id: 'A003', doctorName: 'Dr. Ahmed Khan',   date: yesterday, time: '09:00', type: 'General',    status: 'completed' },
  { id: 'A004', doctorName: 'Dr. Usman Malik',  date: nextWeek,  time: '14:00', type: 'Specialist', status: 'pending' },
];

/* ── PRESCRIPTIONS (for patient dashboard) ───────────────────────── */
export const MOCK_PRESCRIPTIONS = [
  {
    id: 'RX001',
    doctorName: 'Dr. Ahmed Khan',
    date: yesterday,
    medicines: [
      'Panadol 500mg - 2x daily (morning & evening)',
      'Amoxicillin 250mg - 3x daily after meals',
      'Vitamin C 1000mg - 1x daily',
    ],
    notes: 'Complete the antibiotic course. Rest and drink plenty of water.',
  },
  {
    id: 'RX002',
    doctorName: 'Dr. Fatima Zahra',
    date: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
    medicines: [
      'Brufen 400mg - After meals only',
      'Omeprazole 20mg - Before meals',
    ],
    notes: 'Avoid spicy food. Follow-up appointment in 2 weeks.',
  },
];

/* ── ADMIN USERS (all roles) ─────────────────────────────────────── */
export const MOCK_ADMIN_DOCTORS = MOCK_DOCTORS;
export const MOCK_ADMIN_RECEPTIONISTS = MOCK_RECEPTIONISTS;
export const MOCK_ADMIN_PATIENTS = MOCK_PATIENTS_LIST.map(p => ({ ...p, role: 'patient' }));
