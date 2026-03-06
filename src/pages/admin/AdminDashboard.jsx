import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { MOCK_ADMIN_DOCTORS, MOCK_ADMIN_RECEPTIONISTS, MOCK_ADMIN_PATIENTS } from '../../data/mockData';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope, Users, UserCog, DollarSign, Calendar,
  Plus, Edit, Trash2
} from 'lucide-react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardContent, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { DataTable, StatusBadge, PageHeader, ErrorAlert, EmptyState, LoadingSkeleton } from '../../components/ui/components';
import { ModalForm, ConfirmDialog } from '../../components/ui/ModalForm';

/**
 * Admin Dashboard Component
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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const usersRef = collection(db, 'users');

      const [doctorsSnap, receptionistsSnap, patientsSnap] = await Promise.all([
        getDocs(query(usersRef, where('role', '==', 'doctor'))),
        getDocs(query(usersRef, where('role', '==', 'receptionist'))),
        getDocs(query(usersRef, where('role', '==', 'patient'))),
      ]);

      const doctorsData = doctorsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const receptionistsData = receptionistsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const patientsData = patientsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      // Use mock data as fallback when Firestore is empty
      const finalDoctors = doctorsData.length > 0 ? doctorsData : MOCK_ADMIN_DOCTORS;
      const finalReceptionists = receptionistsData.length > 0 ? receptionistsData : MOCK_ADMIN_RECEPTIONISTS;
      const finalPatients = patientsData.length > 0 ? patientsData : MOCK_ADMIN_PATIENTS;

      setDoctors(finalDoctors);
      setReceptionists(finalReceptionists);
      setPatients(finalPatients);
      setStats({
        totalDoctors: finalDoctors.length,
        totalReceptionists: finalReceptionists.length,
        totalPatients: finalPatients.length,
        totalRevenue: finalPatients.length * 150,
      });
    } catch (err) {
      console.error('Fetch error:', err);
      // Use mock data on error
      setDoctors(MOCK_ADMIN_DOCTORS);
      setReceptionists(MOCK_ADMIN_RECEPTIONISTS);
      setPatients(MOCK_ADMIN_PATIENTS);
      setStats({
        totalDoctors: MOCK_ADMIN_DOCTORS.length,
        totalReceptionists: MOCK_ADMIN_RECEPTIONISTS.length,
        totalPatients: MOCK_ADMIN_PATIENTS.length,
        totalRevenue: MOCK_ADMIN_PATIENTS.length * 150,
      });
      setError('Firestore se data load nahi ho saka. Demo data show kiya ja raha hai.');
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Add Doctor handler
  async function handleAddDoctor(e) {
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (!name) return;
    setModalLoading(true);
    try {
      await addDoc(collection(db, 'users'), {
        name,
        email: formData.get('email') || '',
        specialty: formData.get('specialty') || '',
        phone: formData.get('phone') || '',
        role: 'doctor',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      setShowDoctorModal(false);
      fetchData();
    } catch (err) {
      setError('Doctor add karne mein error aya. Firestore rules check karein.');
    } finally {
      setModalLoading(false);
    }
  }

  // Add Receptionist handler
  async function handleAddReceptionist(e) {
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (!name) return;
    setModalLoading(true);
    try {
      await addDoc(collection(db, 'users'), {
        name,
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        role: 'receptionist',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      setShowReceptionistModal(false);
      fetchData();
    } catch (err) {
      setError('Receptionist add karne mein error aya. Firestore rules check karein.');
    } finally {
      setModalLoading(false);
    }
  }

  // Delete handler
  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteDoc(doc(db, 'users', deleteTarget.data.id));
      setShowConfirmDialog(false);
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      setError(`Delete karne mein error aya. Firestore rules check karein.`);
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview stats={stats} loading={loading} onNavigate={setActiveSection} />;
      case 'doctors':
        return (
          <DoctorManagement
            doctors={doctors}
            onAdd={() => setShowDoctorModal(true)}
            onDelete={(doctor) => { setDeleteTarget({ type: 'doctor', data: doctor }); setShowConfirmDialog(true); }}
          />
        );
      case 'receptionists':
        return (
          <ReceptionistManagement
            receptionists={receptionists}
            onAdd={() => setShowReceptionistModal(true)}
            onDelete={(rec) => { setDeleteTarget({ type: 'receptionist', data: rec }); setShowConfirmDialog(true); }}
          />
        );
      case 'patients':
        return <PatientManagement patients={patients} />;
      default:
        return <DashboardOverview stats={stats} loading={loading} onNavigate={setActiveSection} />;
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
        onLogout={handleLogout}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900 capitalize">{activeSection}</h1>
            <p className="text-xs text-gray-500">Administrative Control Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">{currentUser?.email}</span>
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

      {/* Add Doctor Modal */}
      <ModalForm
        isOpen={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        title="Add New Doctor"
        submitLabel="Add Doctor"
        isLoading={modalLoading}
        onSubmit={handleAddDoctor}
      >
        <div className="space-y-4">
          <Input name="name" label="Full Name" placeholder="Dr. Ahmed Khan" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" type="email" label="Email" placeholder="doctor@clinic.com" />
            <Input name="phone" label="Phone" placeholder="+92 300 0000000" />
          </div>
          <Input name="specialty" label="Specialty" placeholder="e.g. Cardiology, Neurology" required />
        </div>
      </ModalForm>

      {/* Add Receptionist Modal */}
      <ModalForm
        isOpen={showReceptionistModal}
        onClose={() => setShowReceptionistModal(false)}
        title="Add New Receptionist"
        submitLabel="Add Receptionist"
        isLoading={modalLoading}
        onSubmit={handleAddReceptionist}
      >
        <div className="space-y-4">
          <Input name="name" label="Full Name" placeholder="Sara Ali" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" type="email" label="Email" placeholder="sara@clinic.com" />
            <Input name="phone" label="Phone" placeholder="+92 300 0000000" />
          </div>
        </div>
      </ModalForm>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => { setShowConfirmDialog(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title={`Delete ${deleteTarget?.type === 'doctor' ? 'Doctor' : 'Receptionist'}?`}
        message={`"${deleteTarget?.data?.name}" ko permanently delete karna chahte hain?`}
        confirmLabel="Haan, Delete Karo"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
}

// Dashboard Overview
function DashboardOverview({ stats, loading, onNavigate }) {
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

// Doctor Management
function DoctorManagement({ doctors, onAdd, onDelete }) {
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
    { key: 'specialty', header: 'Specialty', render: (v) => v || '-' },
    { key: 'phone', header: 'Phone', render: (v) => v || '-' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={value === 'active' ? 'success' : 'default'} size="sm" dot>{value || 'active'}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Doctors"
        subtitle="Add and remove medical staff"
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
            <button
              onClick={() => onDelete(row)}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        />
      )}
    </div>
  );
}

// Receptionist Management
function ReceptionistManagement({ receptionists, onAdd, onDelete }) {
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
    { key: 'phone', header: 'Phone', render: (v) => v || '-' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={value === 'active' ? 'success' : 'default'} size="sm" dot>{value || 'active'}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Receptionists"
        subtitle="Manage front desk staff"
        actions={<Button icon={Plus} onClick={onAdd}>Add Receptionist</Button>}
      />
      {receptionists.length === 0 ? (
        <EmptyState
          icon={UserCog}
          title="No receptionists yet"
          description="Add your first receptionist"
          action={<Button icon={Plus} onClick={onAdd}>Add Receptionist</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={receptionists}
          searchable
          sortable
          actions={(row) => (
            <button
              onClick={() => onDelete(row)}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        />
      )}
    </div>
  );
}

// Patient Management
function PatientManagement({ patients }) {
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
    { key: 'role', header: 'Role', render: (v) => v || 'patient' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={value === 'active' ? 'success' : 'default'} size="sm" dot>{value || 'active'}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Patients"
        subtitle={`${patients.length} patients registered`}
      />
      {patients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No patients yet"
          description="Patients who sign up will appear here"
        />
      ) : (
        <DataTable columns={columns} data={patients} searchable sortable />
      )}
    </div>
  );
}

export default AdminDashboard;
