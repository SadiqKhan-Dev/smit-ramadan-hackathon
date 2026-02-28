/**
 * API Routes for Neon Database
 * Server-side functions for database operations
 * Can be used with Vite server routes or deployed as serverless functions
 */

import { db, initializeDatabase } from '../lib/neon';
import bcrypt from 'bcryptjs';

/**
 * Initialize database on server start
 */
export async function initDB() {
  return await initializeDatabase();
}

/**
 * Auth API Routes
 */
export const authAPI = {
  // Register new user
  register: async (request) => {
    try {
      const { name, email, password, role, specialty, phone } = request;
      
      // Validate input
      if (!name || !email || !password || !role) {
        return { success: false, error: 'Missing required fields' };
      }
      
      // Check if user exists
      const existingUser = await db.users.findByEmail(email);
      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await db.users.create({
        name,
        email,
        passwordHash,
        role,
        specialty: role === 'doctor' ? specialty : null,
        phone,
        status: 'active'
      });
      
      // Remove password hash from response
      const { password_hash, ...userWithoutPassword } = user;
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Login user
  login: async (request) => {
    try {
      const { email, password } = request;
      
      // Find user
      const user = await db.users.findByEmail(email);
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }
      
      // Verify password
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return { success: false, error: 'Invalid email or password' };
      }
      
      // Remove password hash from response
      const { password_hash, ...userWithoutPassword } = user;
      
      return { 
        success: true, 
        user: userWithoutPassword,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Patients API Routes
 */
export const patientsAPI = {
  // Get all patients
  getAll: async () => {
    try {
      const patients = await db.patients.findAll();
      return { success: true, patients };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Get patients by doctor ID
  getByDoctorId: async (doctorId) => {
    try {
      const patients = await db.patients.findByDoctorId(doctorId);
      return { success: true, patients };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Create patient
  create: async (patientData) => {
    try {
      const patient = await db.patients.create(patientData);
      return { success: true, patient };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Assign patient to doctor
  assignToDoctor: async (patientId, doctorId) => {
    try {
      const patient = await db.patients.assignToDoctor(patientId, doctorId);
      return { success: true, patient };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

/**
 * Appointments API Routes
 */
export const appointmentsAPI = {
  // Get all appointments
  getAll: async () => {
    try {
      const appointments = await db.appointments.findAll();
      return { success: true, appointments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Get appointments by doctor
  getByDoctorId: async (doctorId) => {
    try {
      const appointments = await db.appointments.findByDoctorId(doctorId);
      return { success: true, appointments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Get appointments by patient
  getByPatientId: async (patientId) => {
    try {
      const appointments = await db.appointments.findByPatientId(patientId);
      return { success: true, appointments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Get appointments by date
  getByDate: async (date) => {
    try {
      const appointments = await db.appointments.findByDate(date);
      return { success: true, appointments };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Create appointment
  create: async (appointmentData) => {
    try {
      const appointment = await db.appointments.create(appointmentData);
      return { success: true, appointment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Update appointment status
  updateStatus: async (id, status) => {
    try {
      const appointment = await db.appointments.updateStatus(id, status);
      return { success: true, appointment };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

/**
 * Prescriptions API Routes
 */
export const prescriptionsAPI = {
  // Get prescriptions by patient
  getByPatientId: async (patientId) => {
    try {
      const prescriptions = await db.prescriptions.findByPatientId(patientId);
      return { success: true, prescriptions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Get prescriptions by doctor
  getByDoctorId: async (doctorId) => {
    try {
      const prescriptions = await db.prescriptions.findByDoctorId(doctorId);
      return { success: true, prescriptions };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Create prescription
  create: async (prescriptionData) => {
    try {
      const prescription = await db.prescriptions.create(prescriptionData);
      return { success: true, prescription };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

/**
 * Medical Records API Routes
 */
export const medicalRecordsAPI = {
  // Get records by patient
  getByPatientId: async (patientId) => {
    try {
      const records = await db.medicalRecords.findByPatientId(patientId);
      return { success: true, records };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Create medical record
  create: async (recordData) => {
    try {
      const record = await db.medicalRecords.create(recordData);
      return { success: true, record };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Export all APIs
export default {
  initDB,
  auth: authAPI,
  patients: patientsAPI,
  appointments: appointmentsAPI,
  prescriptions: prescriptionsAPI,
  medicalRecords: medicalRecordsAPI
};
