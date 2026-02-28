import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, Users, UserCog, DollarSign, Calendar, 
  Plus, Edit, Trash2, Search, Filter, CheckCircle, AlertCircle
} from 'lucide-react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardContent, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { DataTable, StatusBadge, PageHeader, ErrorAlert, EmptyState, LoadingSkeleton } from '../../components/ui/components';
import { ModalForm, ConfirmDialog } from '../../components/ui/ModalForm';

/**
 * Admin Dashboard Component
 * Full administrative control over the clinic system
 */
export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Data state
  const [doctors, setDoctors] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalReceptionists: 0,
    totalPatients: 0,
    totalRevenue: 0,
  });

  // Modal states
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showReceptionistModal, setShowReceptionistModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Fetch users by role
      const usersRef = collection(db, 'users');
      
      const doctorsQuery = query(usersRef, where('role', '==', 'doctor'));
      const receptionistsQuery = query(usersRef, where('role', '==', 'receptionist'));
      const patientsQuery = query(usersRef, where('role', '==', 'patient'));
      
      const [doctorsSnap, receptionistsSnap, patientsSnap] = await Promise.all([
        getDocs(doctorsQuery),
        getDocs(receptionistsQuery),
        getDocs(patientsQuery),
      ]);

      const doctorsData = doctorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const receptionistsData = receptionistsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const patientsData = patientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setDoctors(doctorsData);
      setReceptionists(receptionistsData);
      setPatients(patientsData);

      setStats({
        totalDoctors: doctorsData.length,
        totalReceptionists: receptionistsData.length,
        totalPatients: patientsData.length,
        totalRevenue: patientsData.length * 150, // Dummy revenue calculation
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview stats={stats} onNavigate={setActiveSection} />;
      case 'doctors':
        return (
          <DoctorManagement
            doctors={doctors}
            onAdd={() => setShowDoctorModal(true)}
            onEdit={setSelectedItem}
            onDelete={(doctor) => { setDeleteTarget({ type: 'doctor', data: doctor }); setShowConfirmDialog(true); }}
          />
        );
      case 'receptionists':
        return (
          <ReceptionistManagement
            receptionists={receptionists}
            onAdd={() => setShowReceptionistModal(true)}
            onEdit={setSelectedItem}
            onDelete={(rec) => { setDeleteTarget({ type: 'receptionist', data: rec }); setShowConfirmDialog(true); }}
          />
        );
      case 'patients':
        return (
          <PatientManagement
            patients={patients}
            doctors={doctors}
            onAssign={setSelectedItem}
          />
        );
      default:
        return <DashboardOverview stats={stats} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPage={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole="admin"
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900 capitalize">{activeSection}</h1>
            <p className="text-xs text-gray-500">Administrative Control Panel</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </header>

        <main className="p-6">
          {error && (
            <ErrorAlert 
              type="error" 
              message={error} 
              onDismiss={() => setError('')}
              className="mb-6"
            />
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview({ stats, onNavigate }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <LoadingSkeleton key={i} lines={3} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Doctors" value={stats.totalDoctors} change="Active staff" trend="up" icon={Stethoscope} color="blue" />
        <StatCard title="Total Patients" value={stats.totalPatients} change="Registered" trend="up" icon={Users} color="green" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} change="This month" trend="up" icon={DollarSign} color="purple" />
        <StatCard title="Staff Members" value={stats.totalReceptionists} change="Front desk" trend="stable" icon={UserCog} color="orange" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card clickable onClick={() => onNavigate('doctors')} className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                <p className="text-sm text-gray-500">Manage Doctors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card clickable onClick={() => onNavigate('receptionists')} className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-xl">
                <UserCog className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReceptionists}</p>
                <p className="text-sm text-gray-500">Manage Receptionists</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card clickable onClick={() => onNavigate('patients')} className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                <p className="text-sm text-gray-500">Manage Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Doctor Management Component
function DoctorManagement({ doctors, onAdd, onEdit, onDelete }) {
  const columns = [
    { 
      key: 'name', 
      header: 'Doctor',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-semibold">{row.name?.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'specialty', header: 'Specialty' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={value === 'active' ? 'success' : 'default'} size="sm" dot>{value}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Doctors"
        subtitle="Add, edit, and remove medical staff"
        actions={<Button icon={Plus} onClick={onAdd}>Add Doctor</Button>}
      />

      {doctors.length === 0 ? (
        <EmptyState
          icon={Stethoscope}
          title="No doctors yet"
          description="Add your first doctor to get started"
          action={<Button icon={Plus} onClick={onAdd}>Add Doctor</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={doctors}
          searchable
          sortable
          actions={(row) => (
            <>
              <button onClick={() => onEdit(row)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(row)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        />
      )}
    </div>
  );
}

// Receptionist Management Component
function ReceptionistManagement({ receptionists, onAdd, onEdit, onDelete }) {
  const columns = [
    { 
      key: 'name', 
      header: 'Name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-semibold">{row.name?.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'phone', header: 'Phone' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={value === 'active' ? 'success' : 'default'} size="sm" dot>{value}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Receptionists"
        subtitle="Manage front desk administrative staff"
        actions={<Button icon={Plus} onClick={onAdd}>Add Receptionist</Button>}
      />

      {receptionists.length === 0 ? (
        <EmptyState
          icon={UserCog}
          title="No receptionists yet"
          description="Add your first receptionist to get started"
          action={<Button icon={Plus} onClick={onAdd}>Add Receptionist</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={receptionists}
          searchable
          sortable
          actions={(row) => (
            <>
              <button onClick={() => onEdit(row)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(row)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        />
      )}
    </div>
  );
}

// Patient Management Component
function PatientManagement({ patients, doctors, onAssign }) {
  const columns = [
    { 
      key: 'name', 
      header: 'Patient',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-semibold">{row.name?.charAt(0)}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={value === 'active' ? 'success' : 'default'} size="sm" dot>{value}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Patients"
        subtitle={`View all ${patients.length} patients in the system`}
      />

      <DataTable
        columns={columns}
        data={patients}
        searchable
        sortable
      />
    </div>
  );
}

export default AdminDashboard;
