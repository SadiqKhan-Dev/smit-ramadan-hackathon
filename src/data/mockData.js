/**
 * Mock Data Store with Doctor-Patient Relationships
 * Each doctor can only access their assigned patients
 */

// Current logged-in doctor (simulated authentication)
export const CURRENT_DOCTOR = {
  id: 'D001',
  name: 'Dr. Emily Chen',
  specialty: 'Cardiology',
  email: 'emily.chen@clinicpro.com',
};

// Doctors data
export const DOCTORS = [
  { id: 'D001', name: 'Dr. Emily Chen', specialty: 'Cardiology', email: 'emily.chen@clinicpro.com', phone: '+1 (555) 123-4567', status: 'active' },
  { id: 'D002', name: 'Dr. James Wilson', specialty: 'Endocrinology', email: 'james.wilson@clinicpro.com', phone: '+1 (555) 234-5678', status: 'active' },
  { id: 'D003', name: 'Dr. Sarah Lee', specialty: 'Cardiology', email: 'sarah.lee@clinicpro.com', phone: '+1 (555) 345-6789', status: 'active' },
  { id: 'D004', name: 'Dr. Michael Chang', specialty: 'Orthopedics', email: 'michael.chang@clinicpro.com', phone: '+1 (555) 456-7890', status: 'active' },
  { id: 'D005', name: 'Dr. Amanda Roberts', specialty: 'Neurology', email: 'amanda.roberts@clinicpro.com', phone: '+1 (555) 567-8901', status: 'active' },
];

// Patients with doctorId assignment - each patient is assigned to ONE primary doctor
export const PATIENTS = [
  // Dr. Emily Chen's patients (D001)
  { id: 'P001', name: 'Sarah Johnson', age: 34, gender: 'Female', phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', address: '123 Main St, New York, NY', bloodGroup: 'A+', doctorId: 'D001', lastVisit: '2024-02-28', status: 'active', condition: 'Hypertension' },
  { id: 'P002', name: 'Michael Brown', age: 45, gender: 'Male', phone: '+1 (555) 234-5678', email: 'michael.b@email.com', address: '456 Oak Ave, Los Angeles, CA', bloodGroup: 'O+', doctorId: 'D001', lastVisit: '2024-02-27', status: 'active', condition: 'Cardiac Arrhythmia' },
  { id: 'P003', name: 'Emma Davis', age: 28, gender: 'Female', phone: '+1 (555) 345-6789', email: 'emma.d@email.com', address: '789 Pine Rd, Chicago, IL', bloodGroup: 'B+', doctorId: 'D001', lastVisit: '2024-02-26', status: 'active', condition: 'Palpitations' },
  { id: 'P004', name: 'Robert Miller', age: 52, gender: 'Male', phone: '+1 (555) 456-7890', email: 'robert.m@email.com', address: '321 Elm St, Houston, TX', bloodGroup: 'AB+', doctorId: 'D001', lastVisit: '2024-02-25', status: 'active', condition: 'Coronary Artery Disease' },
  { id: 'P005', name: 'Lisa Anderson', age: 38, gender: 'Female', phone: '+1 (555) 567-8901', email: 'lisa.a@email.com', address: '654 Maple Dr, Phoenix, AZ', bloodGroup: 'O-', doctorId: 'D001', lastVisit: '2024-02-24', status: 'active', condition: 'Heart Failure' },
  
  // Dr. James Wilson's patients (D002)
  { id: 'P006', name: 'James Wilson', age: 61, gender: 'Male', phone: '+1 (555) 678-9012', email: 'james.w@email.com', address: '987 Cedar Ln, Philadelphia, PA', bloodGroup: 'A-', doctorId: 'D002', lastVisit: '2024-02-23', status: 'active', condition: 'Diabetes Type 2' },
  { id: 'P007', name: 'Jennifer Martinez', age: 29, gender: 'Female', phone: '+1 (555) 789-0123', email: 'jennifer.m@email.com', address: '147 Birch Ct, San Antonio, TX', bloodGroup: 'B-', doctorId: 'D002', lastVisit: '2024-02-22', status: 'active', condition: 'Hypothyroidism' },
  { id: 'P008', name: 'David Thompson', age: 42, gender: 'Male', phone: '+1 (555) 890-1234', email: 'david.t@email.com', address: '258 Walnut Way, San Diego, CA', bloodGroup: 'O+', doctorId: 'D002', lastVisit: '2024-02-21', status: 'active', condition: 'Metabolic Syndrome' },
  
  // Dr. Sarah Lee's patients (D003)
  { id: 'P009', name: 'Amanda White', age: 55, gender: 'Female', phone: '+1 (555) 901-2345', email: 'amanda.w@email.com', address: '369 Spruce Ave, Dallas, TX', bloodGroup: 'A+', doctorId: 'D003', lastVisit: '2024-02-20', status: 'active', condition: 'Atrial Fibrillation' },
  { id: 'P010', name: 'Christopher Lee', age: 48, gender: 'Male', phone: '+1 (555) 012-3456', email: 'christopher.l@email.com', address: '480 Ash Blvd, San Jose, CA', bloodGroup: 'B+', doctorId: 'D003', lastVisit: '2024-02-19', status: 'active', condition: 'Hypertension' },
  
  // Dr. Michael Chang's patients (D004)
  { id: 'P011', name: 'Patricia Harris', age: 35, gender: 'Female', phone: '+1 (555) 123-7890', email: 'patricia.h@email.com', address: '591 Oak St, Austin, TX', bloodGroup: 'O+', doctorId: 'D004', lastVisit: '2024-02-18', status: 'active', condition: 'Knee Osteoarthritis' },
  { id: 'P012', name: 'Daniel Clark', age: 28, gender: 'Male', phone: '+1 (555) 234-8901', email: 'daniel.c@email.com', address: '602 Pine Ave, Jacksonville, FL', bloodGroup: 'A+', doctorId: 'D004', lastVisit: '2024-02-17', status: 'active', condition: 'Rotator Cuff Injury' },
  { id: 'P013', name: 'Nancy Lewis', age: 62, gender: 'Female', phone: '+1 (555) 345-9012', email: 'nancy.l@email.com', address: '713 Elm Rd, Columbus, OH', bloodGroup: 'B+', doctorId: 'D004', lastVisit: '2024-02-16', status: 'active', condition: 'Hip Fracture' },
  
  // Dr. Amanda Roberts' patients (D005)
  { id: 'P014', name: 'Karen Walker', age: 44, gender: 'Female', phone: '+1 (555) 456-0123', email: 'karen.w@email.com', address: '824 Maple Ln, Charlotte, NC', bloodGroup: 'AB+', doctorId: 'D005', lastVisit: '2024-02-15', status: 'active', condition: 'Migraine' },
  { id: 'P015', name: 'Steven Hall', age: 51, gender: 'Male', phone: '+1 (555) 567-1234', email: 'steven.h@email.com', address: '935 Cedar Dr, Indianapolis, IN', bloodGroup: 'O-', doctorId: 'D005', lastVisit: '2024-02-14', status: 'active', condition: 'Epilepsy' },
];

// Appointments with doctorId - each appointment is linked to a specific doctor
export const APPOINTMENTS = [
  // Dr. Emily Chen's appointments (D001)
  { id: 1, patientId: 'P001', patient: 'Sarah Johnson', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '09:00 AM', duration: '30 min', type: 'Follow-up', status: 'completed', notes: 'Regular follow-up for hypertension management' },
  { id: 2, patientId: 'P002', patient: 'Michael Brown', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '09:30 AM', duration: '45 min', type: 'Consultation', status: 'completed', notes: 'ECG review and medication adjustment' },
  { id: 3, patientId: 'P003', patient: 'Emma Davis', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '10:30 AM', duration: '30 min', type: 'Checkup', status: 'in-progress', notes: 'Palpitations evaluation' },
  { id: 4, patientId: 'P004', patient: 'Robert Miller', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '11:00 AM', duration: '60 min', type: 'Consultation', status: 'pending', notes: 'CAD management discussion' },
  { id: 5, patientId: 'P005', patient: 'Lisa Anderson', doctorId: 'D001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '02:00 PM', duration: '30 min', type: 'Follow-up', status: 'pending', notes: 'Heart failure monitoring' },
  
  // Dr. James Wilson's appointments (D002)
  { id: 6, patientId: 'P006', patient: 'James Wilson', doctorId: 'D002', doctor: 'Dr. James Wilson', department: 'Endocrinology', date: '2024-03-01', time: '09:00 AM', duration: '30 min', type: 'Follow-up', status: 'completed', notes: 'Diabetes management' },
  { id: 7, patientId: 'P007', patient: 'Jennifer Martinez', doctorId: 'D002', doctor: 'Dr. James Wilson', department: 'Endocrinology', date: '2024-03-01', time: '10:00 AM', duration: '30 min', type: 'Checkup', status: 'completed', notes: 'Thyroid function review' },
  { id: 8, patientId: 'P008', patient: 'David Thompson', doctorId: 'D002', doctor: 'Dr. James Wilson', department: 'Endocrinology', date: '2024-03-01', time: '11:00 AM', duration: '45 min', type: 'Consultation', status: 'pending', notes: 'Metabolic syndrome evaluation' },
  
  // Dr. Sarah Lee's appointments (D003)
  { id: 9, patientId: 'P009', patient: 'Amanda White', doctorId: 'D003', doctor: 'Dr. Sarah Lee', department: 'Cardiology', date: '2024-03-01', time: '09:30 AM', duration: '30 min', type: 'Follow-up', status: 'completed', notes: 'AFib monitoring' },
  { id: 10, patientId: 'P010', patient: 'Christopher Lee', doctorId: 'D003', doctor: 'Dr. Sarah Lee', department: 'Cardiology', date: '2024-03-01', time: '10:30 AM', duration: '30 min', type: 'Checkup', status: 'pending', notes: 'Blood pressure check' },
  
  // Dr. Michael Chang's appointments (D004)
  { id: 11, patientId: 'P011', patient: 'Patricia Harris', doctorId: 'D004', doctor: 'Dr. Michael Chang', department: 'Orthopedics', date: '2024-03-01', time: '09:00 AM', duration: '45 min', type: 'Therapy', status: 'completed', notes: 'Physical therapy session' },
  { id: 12, patientId: 'P012', patient: 'Daniel Clark', doctorId: 'D004', doctor: 'Dr. Michael Chang', department: 'Orthopedics', date: '2024-03-01', time: '10:00 AM', duration: '30 min', type: 'Follow-up', status: 'pending', notes: 'Shoulder injury review' },
  { id: 13, patientId: 'P013', patient: 'Nancy Lewis', doctorId: 'D004', doctor: 'Dr. Michael Chang', department: 'Orthopedics', date: '2024-03-01', time: '11:00 AM', duration: '60 min', type: 'Consultation', status: 'pending', notes: 'Post-surgery follow-up' },
  
  // Dr. Amanda Roberts' appointments (D005)
  { id: 14, patientId: 'P014', patient: 'Karen Walker', doctorId: 'D005', doctor: 'Dr. Amanda Roberts', department: 'Neurology', date: '2024-03-01', time: '09:00 AM', duration: '45 min', type: 'Consultation', status: 'completed', notes: 'Migraine treatment plan' },
  { id: 15, patientId: 'P015', patient: 'Steven Hall', doctorId: 'D005', doctor: 'Dr. Amanda Roberts', department: 'Neurology', date: '2024-03-01', time: '10:00 AM', duration: '30 min', type: 'Follow-up', status: 'pending', notes: 'Epilepsy medication review' },
];

/**
 * Filter patients by doctor ID
 * @param {string} doctorId - The doctor's ID
 * @returns {Array} - Filtered patients array
 */
export function getPatientsByDoctor(doctorId) {
  return PATIENTS.filter(patient => patient.doctorId === doctorId);
}

/**
 * Get patient count for a doctor
 * @param {string} doctorId - The doctor's ID
 * @returns {number} - Count of assigned patients
 */
export function getPatientCountByDoctor(doctorId) {
  return getPatientsByDoctor(doctorId).length;
}

/**
 * Filter appointments by doctor ID
 * @param {string} doctorId - The doctor's ID
 * @returns {Array} - Filtered appointments array
 */
export function getAppointmentsByDoctor(doctorId) {
  return APPOINTMENTS.filter(apt => apt.doctorId === doctorId);
}

/**
 * Get today's appointments for a doctor
 * @param {string} doctorId - The doctor's ID
 * @param {string} today - Today's date in YYYY-MM-DD format
 * @returns {Array} - Filtered today's appointments
 */
export function getTodayAppointments(doctorId, today = new Date().toISOString().split('T')[0]) {
  return APPOINTMENTS.filter(apt => apt.doctorId === doctorId && apt.date === today);
}

/**
 * Get a specific patient by ID (only if assigned to the doctor)
 * @param {string} patientId - The patient's ID
 * @param {string} doctorId - The doctor's ID for authorization
 * @returns {Object|null} - Patient object or null if not found/authorized
 */
export function getPatientById(patientId, doctorId) {
  const patient = PATIENTS.find(p => p.id === patientId);
  if (!patient || patient.doctorId !== doctorId) {
    return null;
  }
  return patient;
}

/**
 * Get patient's appointments (only if patient is assigned to the doctor)
 * @param {string} patientId - The patient's ID
 * @param {string} doctorId - The doctor's ID for authorization
 * @returns {Array} - Patient's appointments or empty array
 */
export function getPatientAppointments(patientId, doctorId) {
  const patient = getPatientById(patientId, doctorId);
  if (!patient) return [];
  return APPOINTMENTS.filter(apt => apt.patientId === patientId);
}

/**
 * Get doctor statistics
 * @param {string} doctorId - The doctor's ID
 * @returns {Object} - Statistics object
 */
export function getDoctorStats(doctorId) {
  const patients = getPatientsByDoctor(doctorId);
  const appointments = getAppointmentsByDoctor(doctorId);
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = getTodayAppointments(doctorId, today);
  
  return {
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === 'active').length,
    totalAppointments: appointments.length,
    todayAppointments: todayAppointments.length,
    completedToday: todayAppointments.filter(a => a.status === 'completed').length,
    pendingToday: todayAppointments.filter(a => a.status === 'pending').length,
    inProgressToday: todayAppointments.filter(a => a.status === 'in-progress').length,
  };
}

/**
 * Check if a doctor has access to a patient
 * @param {string} patientId - The patient's ID
 * @param {string} doctorId - The doctor's ID
 * @returns {boolean} - True if doctor has access
 */
export function hasPatientAccess(patientId, doctorId) {
  const patient = PATIENTS.find(p => p.id === patientId);
  return patient?.doctorId === doctorId;
}

export default {
  CURRENT_DOCTOR,
  DOCTORS,
  PATIENTS,
  APPOINTMENTS,
  getPatientsByDoctor,
  getPatientCountByDoctor,
  getAppointmentsByDoctor,
  getTodayAppointments,
  getPatientById,
  getPatientAppointments,
  getDoctorStats,
  hasPatientAccess,
};
