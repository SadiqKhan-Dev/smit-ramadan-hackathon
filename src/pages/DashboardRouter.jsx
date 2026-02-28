import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/components';

/**
 * Dashboard Router
 * Redirects users to their role-specific dashboard
 */
export function DashboardRouter() {
  const { currentUser, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      const roleRoutes = {
        admin: '/admin/dashboard',
        doctor: '/doctor/dashboard',
        receptionist: '/receptionist/dashboard',
        patient: '/patient/dashboard',
      };

      const route = roleRoutes[userRole];
      if (route) {
        navigate(route);
      } else {
        navigate('/login');
      }
    }
  }, [currentUser, userRole, loading, navigate]);

  return <PageLoader text="Loading your dashboard..." />;
}

export default DashboardRouter;
