/**
 * Admin Data Store with CRUD Operations
 * Full administrative control over the clinic system
 */

// Current admin user
export const CURRENT_ADMIN = {
  id: 'A001',
  name: 'System Administrator',
  email: 'admin@clinicpro.com',
  role: 'admin',
};

// Initial Doctors Data
export const DOCTORS = [
  { id: 'D001', name: 'Dr. Emily Chen', specialty: 'Cardiology', email: 'emily.chen@clinicpro.com', phone: '+1 (555) 123-4567', experience: '12 years', education: 'MD, Harvard Medical School', status: 'active', joinedDate: '2022-01-15', patientsCount: 5 },
  { id: 'D002', name: 'Dr. James Wilson', specialty: 'Endocrinology', email: 'james.wilson@clinicpro.com', phone: '+1 (555) 234-5678', experience: '15 years', education: 'MD, Johns Hopkins', status: 'active', joinedDate: '2021-03-20', patientsCount: 3 },
  { id: 'D003', name: 'Dr. Sarah Lee', specialty: 'Cardiology', email: 'sarah.lee@clinicpro.com', phone: '+1 (555) 345-6789', experience: '8 years', education: 'MD, Stanford University', status: 'active', joinedDate: '2023-06-10', patientsCount: 2 },
  { id: 'D004', name: 'Dr. Michael Chang', specialty: 'Orthopedics', email: 'michael.chang@clinicpro.com', phone: '+1 (555) 456-7890', experience: '20 years', education: 'MD, Yale School of Medicine', status: 'active', joinedDate: '2020-09-05', patientsCount: 3 },
  { id: 'D005', name: 'Dr. Amanda Roberts', specialty: 'Neurology', email: 'amanda.roberts@clinicpro.com', phone: '+1 (555) 567-8901', experience: '10 years', education: 'MD, Columbia University', status: 'active', joinedDate: '2022-02-28', patientsCount: 2 },
];

// Initial Receptionists Data
export const RECEPTIONISTS = [
  { id: 'R001', name: 'Jane Smith', email: 'jane.smith@clinicpro.com', phone: '+1 (555) 111-2222', shift: 'Morning', status: 'active', joinedDate: '2023-01-10' },
  { id: 'R002', name: 'Robert Johnson', email: 'robert.j@clinicpro.com', phone: '+1 (555) 222-3333', shift: 'Afternoon', status: 'active', joinedDate: '2023-03-15' },
  { id: 'R003', name: 'Maria Garcia', email: 'maria.g@clinicpro.com', phone: '+1 (555) 333-4444', shift: 'Evening', status: 'active', joinedDate: '2023-05-20' },
  { id: 'R004', name: 'David Lee', email: 'david.l@clinicpro.com', phone: '+1 (555) 444-5555', shift: 'Morning', status: 'inactive', joinedDate: '2023-08-01' },
];

// Patients with doctor assignment
export const PATIENTS = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, gender: 'Female', phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', bloodGroup: 'A+', doctorId: 'D001', lastVisit: '2024-02-28', status: 'active', condition: 'Hypertension', totalVisits: 12 },
  { id: 'P002', name: 'Michael Brown', age: 45, gender: 'Male', phone: '+1 (555) 234-5678', email: 'michael.b@email.com', bloodGroup: 'O+', doctorId: 'D001', lastVisit: '2024-02-27', status: 'active', condition: 'Cardiac Arrhythmia', totalVisits: 8 },
  { id: 'P003', name: 'Emma Davis', age: 28, gender: 'Female', phone: '+1 (555) 345-6789', email: 'emma.d@email.com', bloodGroup: 'B+', doctorId: 'D001', lastVisit: '2024-02-26', status: 'active', condition: 'Palpitations', totalVisits: 5 },
  { id: 'P004', name: 'Robert Miller', age: 52, gender: 'Male', phone: '+1 (555) 456-7890', email: 'robert.m@email.com', bloodGroup: 'AB+', doctorId: 'D001', lastVisit: '2024-02-25', status: 'active', condition: 'Coronary Artery Disease', totalVisits: 15 },
  { id: 'P005', name: 'Lisa Anderson', age: 38, gender: 'Female', phone: '+1 (555) 567-8901', email: 'lisa.a@email.com', bloodGroup: 'O-', doctorId: 'D001', lastVisit: '2024-02-24', status: 'active', condition: 'Heart Failure', totalVisits: 7 },
  { id: 'P006', name: 'James Wilson', age: 61, gender: 'Male', phone: '+1 (555) 678-9012', email: 'james.w@email.com', bloodGroup: 'A-', doctorId: 'D002', lastVisit: '2024-02-23', status: 'active', condition: 'Diabetes Type 2', totalVisits: 20 },
  { id: 'P007', name: 'Jennifer Martinez', age: 29, gender: 'Female', phone: '+1 (555) 789-0123', email: 'jennifer.m@email.com', bloodGroup: 'B-', doctorId: 'D002', lastVisit: '2024-02-22', status: 'active', condition: 'Hypothyroidism', totalVisits: 6 },
  { id: 'P008', name: 'David Thompson', age: 42, gender: 'Male', phone: '+1 (555) 890-1234', email: 'david.t@email.com', bloodGroup: 'O+', doctorId: 'D002', lastVisit: '2024-02-21', status: 'active', condition: 'Metabolic Syndrome', totalVisits: 10 },
  { id: 'P009', name: 'Amanda White', age: 55, gender: 'Female', phone: '+1 (555) 901-2345', email: 'amanda.w@email.com', bloodGroup: 'A+', doctorId: 'D003', lastVisit: '2024-02-20', status: 'active', condition: 'Atrial Fibrillation', totalVisits: 14 },
  { id: 'P010', name: 'Christopher Lee', age: 48, gender: 'Male', phone: '+1 (555) 012-3456', email: 'christopher.l@email.com', bloodGroup: 'B+', doctorId: 'D003', lastVisit: '2024-02-19', status: 'active', condition: 'Hypertension', totalVisits: 9 },
  { id: 'P011', name: 'Patricia Harris', age: 35, gender: 'Female', phone: '+1 (555) 123-7890', email: 'patricia.h@email.com', bloodGroup: 'O+', doctorId: 'D004', lastVisit: '2024-02-18', status: 'active', condition: 'Knee Osteoarthritis', totalVisits: 11 },
  { id: 'P012', name: 'Daniel Clark', age: 28, gender: 'Male', phone: '+1 (555) 234-8901', email: 'daniel.c@email.com', bloodGroup: 'A+', doctorId: 'D004', lastVisit: '2024-02-17', status: 'active', condition: 'Rotator Cuff Injury', totalVisits: 4 },
  { id: 'P013', name: 'Nancy Lewis', age: 62, gender: 'Female', phone: '+1 (555) 345-9012', email: 'nancy.l@email.com', bloodGroup: 'B+', doctorId: 'D004', lastVisit: '2024-02-16', status: 'active', condition: 'Hip Fracture', totalVisits: 18 },
  { id: 'P014', name: 'Karen Walker', age: 44, gender: 'Female', phone: '+1 (555) 456-0123', email: 'karen.w@email.com', bloodGroup: 'AB+', doctorId: 'D005', lastVisit: '2024-02-15', status: 'active', condition: 'Migraine', totalVisits: 8 },
  { id: 'P015', name: 'Steven Hall', age: 51, gender: 'Male', phone: '+1 (555) 567-1234', email: 'steven.h@email.com', bloodGroup: 'O-', doctorId: 'D005', lastVisit: '2024-02-14', status: 'active', condition: 'Epilepsy', totalVisits: 22 },
];

// Appointments
export const APPOINTMENTS = [
  { id: 1, patientId: 'P001', patient: 'Sarah Johnson', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '09:00 AM', status: 'completed', revenue: 150 },
  { id: 2, patientId: 'P002', patient: 'Michael Brown', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '09:30 AM', status: 'completed', revenue: 200 },
  { id: 3, patientId: 'P003', patient: 'Emma Davis', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '10:30 AM', status: 'in-progress', revenue: 150 },
  { id: 4, patientId: 'P006', patient: 'James Wilson', doctorId: 'D002', doctor: 'Dr. James Wilson', department: 'Endocrinology', date: '2024-03-01', time: '09:00 AM', status: 'completed', revenue: 180 },
  { id: 5, patientId: 'P009', patient: 'Amanda White', doctorId: 'D003', doctor: 'Dr. Sarah Lee', department: 'Cardiology', date: '2024-03-01', time: '09:30 AM', status: 'completed', revenue: 150 },
  { id: 6, patientId: 'P011', patient: 'Patricia Harris', doctorId: 'D004', doctor: 'Dr. Michael Chang', department: 'Orthopedics', date: '2024-03-01', time: '09:00 AM', status: 'completed', revenue: 250 },
  { id: 7, patientId: 'P014', patient: 'Karen Walker', doctorId: 'D005', doctor: 'Dr. Amanda Roberts', department: 'Neurology', date: '2024-03-01', time: '09:00 AM', status: 'completed', revenue: 200 },
];

// System Analytics Data
export const ANALYTICS = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 42000, appointments: 450 },
    { month: 'Feb', revenue: 48000, appointments: 520 },
    { month: 'Mar', revenue: 45000, appointments: 480 },
    { month: 'Apr', revenue: 58000, appointments: 610 },
    { month: 'May', revenue: 54000, appointments: 580 },
    { month: 'Jun', revenue: 68000, appointments: 720 },
  ],
  departmentStats: [
    { name: 'Cardiology', doctors: 2, patients: 7, revenue: 42500 },
    { name: 'Endocrinology', doctors: 1, patients: 3, revenue: 35200 },
    { name: 'Orthopedics', doctors: 1, patients: 3, revenue: 52800 },
    { name: 'Neurology', doctors: 1, patients: 2, revenue: 28400 },
  ],
};

// ============ DOCTOR CRUD OPERATIONS ============

export function getDoctors() {
  return [...DOCTORS];
}

export function getDoctorById(id) {
  return DOCTORS.find(d => d.id === id) || null;
}

export function addDoctor(doctorData) {
  const newDoctor = {
    id: `D${String(DOCTORS.length + 1).padStart(3, '0')}`,
    ...doctorData,
    joinedDate: new Date().toISOString().split('T')[0],
    patientsCount: 0,
  };
  DOCTORS.push(newDoctor);
  return newDoctor;
}

export function updateDoctor(id, updates) {
  const index = DOCTORS.findIndex(d => d.id === id);
  if (index === -1) return null;
  DOCTORS[index] = { ...DOCTORS[index], ...updates };
  return DOCTORS[index];
}

export function deleteDoctor(id) {
  const index = DOCTORS.findIndex(d => d.id === id);
  if (index === -1) return false;
  
  // Check if doctor has patients
  const hasPatients = PATIENTS.some(p => p.doctorId === id);
  if (hasPatients) {
    return { success: false, message: 'Cannot delete doctor with assigned patients' };
  }
  
  DOCTORS.splice(index, 1);
  return { success: true };
}

// ============ RECEPTIONIST CRUD OPERATIONS ============

export function getReceptionists() {
  return [...RECEPTIONISTS];
}

export function getReceptionistById(id) {
  return RECEPTIONISTS.find(r => r.id === id) || null;
}

export function addReceptionist(receptionistData) {
  const newReceptionist = {
    id: `R${String(RECEPTIONISTS.length + 1).padStart(3, '0')}`,
    ...receptionistData,
    joinedDate: new Date().toISOString().split('T')[0],
  };
  RECEPTIONISTS.push(newReceptionist);
  return newReceptionist;
}

export function updateReceptionist(id, updates) {
  const index = RECEPTIONISTS.findIndex(r => r.id === id);
  if (index === -1) return null;
  RECEPTIONISTS[index] = { ...RECEPTIONISTS[index], ...updates };
  return RECEPTIONISTS[index];
}

export function deleteReceptionist(id) {
  const index = RECEPTIONISTS.findIndex(r => r.id === id);
  if (index === -1) return false;
  RECEPTIONISTS.splice(index, 1);
  return { success: true };
}

// ============ PATIENT MANAGEMENT ============

export function getAllPatients() {
  return [...PATIENTS];
}

export function getPatientById(id) {
  return PATIENTS.find(p => p.id === id) || null;
}

export function getPatientsByDoctor(doctorId) {
  return PATIENTS.filter(p => p.doctorId === doctorId);
}

export function getUnassignedPatients() {
  return PATIENTS.filter(p => !p.doctorId);
}

export function assignPatientToDoctor(patientId, doctorId) {
  const patient = PATIENTS.find(p => p.id === patientId);
  if (!patient) return { success: false, message: 'Patient not found' };
  
  patient.doctorId = doctorId;
  
  // Update doctor's patient count
  const doctor = DOCTORS.find(d => d.id === doctorId);
  if (doctor) {
    doctor.patientsCount = (doctor.patientsCount || 0) + 1;
  }
  
  return { success: true, patient };
}

export function unassignPatient(patientId) {
  const patient = PATIENTS.find(p => p.id === patientId);
  if (!patient || !patient.doctorId) return { success: false, message: 'Patient not assigned' };
  
  const doctor = DOCTORS.find(d => d.id === patient.doctorId);
  if (doctor && doctor.patientsCount > 0) {
    doctor.patientsCount--;
  }
  
  patient.doctorId = null;
  return { success: true };
}

export function addPatient(patientData) {
  const newPatient = {
    id: `P${String(PATIENTS.length + 1).padStart(3, '0')}`,
    ...patientData,
    totalVisits: 0,
    lastVisit: new Date().toISOString().split('T')[0],
    status: 'active',
  };
  PATIENTS.push(newPatient);
  return newPatient;
}

export function updatePatient(id, updates) {
  const index = PATIENTS.findIndex(p => p.id === id);
  if (index === -1) return null;
  PATIENTS[index] = { ...PATIENTS[index], ...updates };
  return PATIENTS[index];
}

// ============ ANALYTICS ============

export function getSystemStats() {
  const totalDoctors = DOCTORS.filter(d => d.status === 'active').length;
  const totalReceptionists = RECEPTIONISTS.filter(r => r.status === 'active').length;
  const totalPatients = PATIENTS.length;
  const activePatients = PATIENTS.filter(p => p.status === 'active').length;
  const totalRevenue = APPOINTMENTS.reduce((sum, apt) => sum + apt.revenue, 0);
  const todayAppointments = APPOINTMENTS.filter(apt => apt.date === '2024-03-01').length;
  
  return {
    totalDoctors,
    totalReceptionists,
    totalPatients,
    activePatients,
    totalRevenue,
    todayAppointments,
    unassignedPatients: getUnassignedPatients().length,
  };
}

export function getDepartmentAnalytics() {
  return ANALYTICS.departmentStats.map(dept => ({
    ...dept,
    doctors: DOCTORS.filter(d => d.specialty === dept.name && d.status === 'active').length || dept.doctors,
    patients: PATIENTS.filter(p => {
      const doctor = DOCTORS.find(d => d.id === p.doctorId);
      return doctor?.specialty === dept.name;
    }).length,
  }));
}

export function getRevenueTrend() {
  return ANALYTICS.monthlyRevenue;
}

export function getDoctorPerformance() {
  return DOCTORS.map(doctor => ({
    ...doctor,
    patientsCount: PATIENTS.filter(p => p.doctorId === doctor.id).length,
    appointmentsCount: APPOINTMENTS.filter(apt => apt.doctorId === doctor.id).length,
    revenue: APPOINTMENTS.filter(apt => apt.doctorId === doctor.id).reduce((sum, apt) => sum + apt.revenue, 0),
  }));
}

// ============ UTILITY FUNCTIONS ============

export function getAvailableDoctors() {
  return DOCTORS.filter(d => d.status === 'active');
}

export function getSpecialties() {
  const specialties = [...new Set(DOCTORS.map(d => d.specialty))];
  return specialties.sort();
}

export default {
  CURRENT_ADMIN,
  DOCTORS,
  RECEPTIONISTS,
  PATIENTS,
  APPOINTMENTS,
  ANALYTICS,
  // Doctors
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  // Receptionists
  getReceptionists,
  getReceptionistById,
  addReceptionist,
  updateReceptionist,
  deleteReceptionist,
  // Patients
  getAllPatients,
  getPatientById,
  getPatientsByDoctor,
  getUnassignedPatients,
  assignPatientToDoctor,
  unassignPatient,
  addPatient,
  updatePatient,
  // Analytics
  getSystemStats,
  getDepartmentAnalytics,
  getRevenueTrend,
  getDoctorPerformance,
  // Utilities
  getAvailableDoctors,
  getSpecialties,
};
