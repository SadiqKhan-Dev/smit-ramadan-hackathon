import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/components';

const ROLE_ROUTES = {
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  receptionist: '/receptionist/dashboard',
  patient: '/patient/dashboard',
};

/**
 * Dashboard Router
 * Redirects users to their role-specific dashboard
 */
export function DashboardRouter() {
  const { currentUser, userRole, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Auth abhi bhi initialize ho raha hai - wait karo
    if (loading) return;

    // User logged out
    if (!currentUser) {
      navigate('/login', { replace: true });
      return;
    }

    // Role mil gaya - correct dashboard pe bhejo
    if (userRole) {
      const route = ROLE_ROUTES[userRole];
      navigate(route || '/login', { replace: true });
      return;
    }

    // loading=false, user=hai, role=null means Firestore + cache dono fail
    // User ko logout karke login pe bhejo taake re-authenticate kare
    logout().then(() => navigate('/login', { replace: true }));

  }, [currentUser, userRole, loading, navigate, logout]);

  return <PageLoader text="Loading your dashboard..." />;
}

export default DashboardRouter;
