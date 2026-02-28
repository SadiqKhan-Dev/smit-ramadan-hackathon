import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, RoleBasedRoute, PublicRoute } from './components/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardRouter } from './pages/DashboardRouter';

// Role-based Dashboards
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboard';
import { ReceptionistDashboard } from './pages/receptionist/ReceptionistDashboard';
import { PatientDashboard } from './pages/patient/PatientDashboard';

// UI Components Showcase (for testing)
import { ComponentShowcase } from './pages/ComponentShowcase';
import { SidebarShowcase } from './pages/SidebarShowcase';

/**
 * Main App Component
 * Sets up routing and authentication context
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/signup" element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          } />

          {/* Dashboard Router - redirects based on role */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          } />

          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={
            <RoleBasedRoute allowedRoles={['doctor']}>
              <DoctorDashboardPage />
            </RoleBasedRoute>
          } />

          {/* Receptionist Routes */}
          <Route path="/receptionist/dashboard" element={
            <RoleBasedRoute allowedRoles={['receptionist']}>
              <ReceptionistDashboard />
            </RoleBasedRoute>
          } />

          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={
            <RoleBasedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </RoleBasedRoute>
          } />

          {/* Development/Testing Routes */}
          <Route path="/components" element={<ComponentShowcase />} />
          <Route path="/sidebar-demo" element={<SidebarShowcase />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
