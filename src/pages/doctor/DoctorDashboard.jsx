import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, CheckCircle, Clock, FileText, Plus, Search, Eye
} from 'lucide-react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardContent, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DataTable, StatusBadge, PageHeader, EmptyState, LoadingSkeleton } from '../../components/ui/components';

/**
 * Doctor Dashboard Component
 * Shows only assigned patients and appointments for the logged-in doctor
 */
export function DoctorDashboardPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data state - filtered by current doctor's ID
  const [myPatients, setMyPatients] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    completedToday: 0,
    pendingToday: 0,
  });

  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const doctorId = currentUser?.uid;

  // Fetch only this doctor's data from Firestore
  useEffect(() => {
    if (doctorId) {
      fetchDoctorData();
    }
  }, [doctorId]);

  async function fetchDoctorData() {
    try {
      setLoading(true);
      
      // Fetch patients assigned to this doctor
      const patientsRef = collection(db, 'patients');
      const patientsQuery = query(patientsRef, where('doctorId', '==', doctorId));
      const patientsSnap = await getDocs(patientsQuery);
      const patientsData = patientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch appointments for this doctor
      const appointmentsRef = collection(db, 'appointments');
      const appointmentsQuery = query(appointmentsRef, where('doctorId', '==', doctorId));
      const appointmentsSnap = await getDocs(appointmentsQuery);
      const appointmentsData = appointmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter today's appointments
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointmentsData.filter(apt => apt.date === today);

      setMyPatients(patientsData);
      setMyAppointments(appointmentsData);

      setStats({
        totalPatients: patientsData.length,
        todayAppointments: todayAppointments.length,
        completedToday: todayAppointments.filter(a => a.status === 'completed').length,
        pendingToday: todayAppointments.filter(a => a.status === 'pending').length,
      });
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Filter patients by search
  const filteredPatients = myPatients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusConfig = {
    completed: { variant: 'success', label: 'Completed' },
    'in-progress': { variant: 'warning', label: 'In Progress' },
    pending: { variant: 'default', label: 'Pending' },
    active: { variant: 'success', label: 'Active' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPage={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole="doctor"
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-xs text-gray-500">{currentUser?.displayName} • {userRole}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <LoadingSkeleton key={i} lines={3} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="My Patients" value={stats.totalPatients} change="Assigned" trend="up" icon={Users} color="blue" />
              <StatCard title="Today's Appointments" value={stats.todayAppointments} change={`${stats.pendingToday} pending`} trend="stable" icon={Calendar} color="purple" />
              <StatCard title="Completed Today" value={stats.completedToday} change="Done" trend="up" icon={CheckCircle} color="green" />
              <StatCard title="In Progress" value={stats.pendingToday} change="Current" trend="stable" icon={Clock} color="orange" />
            </div>
          )}

          {/* My Patients Table */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <PageHeader
                title="My Patients"
                subtitle={`${filteredPatients.length} patients under your care`}
                actions={
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Search patients..."
                      icon={Search}
                      className="w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                }
              />
            </div>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6"><LoadingSkeleton lines={5} /></div>
              ) : filteredPatients.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No patients assigned"
                  description="Patients assigned to you will appear here"
                />
              ) : (
                <DataTable
                  columns={[
                    { 
                      key: 'name', 
                      header: 'Patient',
                      render: (value, row) => (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">{row.name?.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{row.name}</p>
                            <p className="text-xs text-gray-500">{row.email || 'No email'}</p>
                          </div>
                        </div>
                      )
                    },
                    { key: 'age', header: 'Age', render: (v) => v || '-' },
                    { key: 'gender', header: 'Gender', render: (v) => v || '-' },
                    { key: 'status', header: 'Status', render: (v) => <StatusBadge variant={statusConfig[v]?.variant || 'default'} size="sm" dot>{v || 'active'}</StatusBadge> },
                    { 
                      key: 'actions', 
                      header: 'Actions',
                      render: (_, row) => (
                        <Button variant="ghost" size="sm" icon={Eye}>View</Button>
                      )
                    },
                  ]}
                  data={filteredPatients}
                  searchable={false}
                  sortable
                />
              )}
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <PageHeader
                title="Today's Appointments"
                subtitle="Schedule for today"
              />
            </div>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6"><LoadingSkeleton lines={3} /></div>
              ) : (
                <DataTable
                  columns={[
                    { 
                      key: 'patientName', 
                      header: 'Patient',
                      render: (value, row) => (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 font-semibold">{row.patientName?.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{row.patientName}</p>
                            <p className="text-xs text-gray-500">{row.type || 'General'}</p>
                          </div>
                        </div>
                      )
                    },
                    { key: 'time', header: 'Time', render: (v) => v || 'TBD' },
                    { key: 'status', header: 'Status', render: (v) => <StatusBadge variant={statusConfig[v]?.variant || 'default'} size="sm">{v || 'pending'}</StatusBadge> },
                    { 
                      key: 'actions', 
                      header: 'Actions',
                      render: (_, row) => (
                        <div className="flex gap-2">
                          {row.status === 'pending' && (
                            <Button variant="success" size="sm">Start</Button>
                          )}
                          {row.status === 'in-progress' && (
                            <Button variant="primary" size="sm">Complete</Button>
                          )}
                        </div>
                      )
                    },
                  ]}
                  data={myAppointments.filter(a => a.date === new Date().toISOString().split('T')[0])}
                  searchable={false}
                  sortable={false}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboardPage;
