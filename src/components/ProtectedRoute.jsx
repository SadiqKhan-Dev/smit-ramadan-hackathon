import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/components';

/**
 * ProtectedRoute Component
 * Protects routes that require authentication
 */
export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader text="Loading..." />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * RoleBasedRoute Component
 * Protects routes based on user role
 */
export function RoleBasedRoute({ children, allowedRoles }) {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  // Show loader while auth is initializing OR while role is still being fetched
  if (loading || (currentUser && !userRole)) {
    return <PageLoader text="Loading..." />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    const roleDashboards = {
      admin: '/admin/dashboard',
      doctor: '/doctor/dashboard',
      receptionist: '/receptionist/dashboard',
      patient: '/patient/dashboard',
    };
    return <Navigate to={roleDashboards[userRole] || '/dashboard'} replace />;
  }

  return children;
}

/**
 * PublicRoute Component
 * Redirects authenticated users away from public pages
 */
export function PublicRoute({ children }) {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return <PageLoader text="Loading..." />;
  }

  if (currentUser) {
    const roleDashboards = {
      admin: '/admin/dashboard',
      doctor: '/doctor/dashboard',
      receptionist: '/receptionist/dashboard',
      patient: '/patient/dashboard',
    };

    return <Navigate to={roleDashboards[userRole] || '/dashboard'} replace />;
  }

  return children;
}

export default ProtectedRoute;
