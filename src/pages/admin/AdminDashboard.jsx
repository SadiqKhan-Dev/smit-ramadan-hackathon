import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, query, where } from 'firebase/firestore';
import { MOCK_ADMIN_DOCTORS, MOCK_ADMIN_RECEPTIONISTS, MOCK_ADMIN_PATIENTS } from '../../data/mockData';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope, Users, UserCog, DollarSign,
  Plus, Edit, Trash2, TrendingUp, TrendingDown,
  Activity, FileText, Bell, Shield, Palette, Globe,
  CheckCircle, AlertTriangle, Clock, Heart
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
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showEditPatientModal, setShowEditPatientModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
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

  // Add Patient handler
  async function handleAddPatient(e) {
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (!name) return;
    setModalLoading(true);
    try {
      await addDoc(collection(db, 'users'), {
        name,
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        disease: formData.get('disease') || '',
        bloodType: formData.get('bloodType') || '',
        role: 'patient',
        status: formData.get('status') || 'active',
        createdAt: new Date().toISOString(),
      });
      setShowPatientModal(false);
      fetchData();
    } catch (err) {
      setError('Patient add karne mein error aya. Firestore rules check karein.');
    } finally {
      setModalLoading(false);
    }
  }

  // Update Patient (disease + status + bloodType)
  async function handleUpdatePatient(e) {
    if (!editingPatient) return;
    const formData = new FormData(e.target);
    const disease = formData.get('disease') || editingPatient.disease || '';
    const bloodType = formData.get('bloodType') || editingPatient.bloodType || '';
    const status = formData.get('status') || editingPatient.status || 'active';
    setModalLoading(true);
    try {
      // setDoc with merge works even if doc doesn't exist (unlike updateDoc)
      await setDoc(doc(db, 'users', editingPatient.id), { disease, bloodType, status }, { merge: true });
      setShowEditPatientModal(false);
      setEditingPatient(null);
      fetchData();
    } catch (err) {
      console.error('Update patient error:', err);
      setError(`Update failed: ${err.message}`);
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
        return (
          <PatientManagement
            patients={patients}
            onAdd={() => setShowPatientModal(true)}
            onEdit={(patient) => { setEditingPatient(patient); setShowEditPatientModal(true); }}
            onDelete={(patient) => { setDeleteTarget({ type: 'patient', data: patient }); setShowConfirmDialog(true); }}
          />
        );
      case 'analytics':
        return <AnalyticsSection stats={stats} doctors={doctors} patients={patients} receptionists={receptionists} />;
      case 'reports':
        return <ReportsSection stats={stats} doctors={doctors} patients={patients} receptionists={receptionists} />;
      case 'settings':
        return <SettingsSection />;
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

      {/* Add Patient Modal */}
      <ModalForm
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        title="Add New Patient"
        submitLabel="Add Patient"
        isLoading={modalLoading}
        onSubmit={handleAddPatient}
      >
        <div className="space-y-4">
          <Input name="name" label="Full Name" placeholder="Ali Hassan" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" type="email" label="Email" placeholder="ali@gmail.com" />
            <Input name="phone" label="Phone" placeholder="+92 300 0000000" />
          </div>
          <Input name="disease" label="Disease / Condition" placeholder="e.g. Diabetes, Fever, Flu" required />
          <div className="grid grid-cols-2 gap-4">
            <Select
              name="bloodType"
              label="Blood Type"
              placeholder="Select blood type"
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
              ]}
            />
            <Select
              name="status"
              label="Status"
              placeholder="Select status"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'critical', label: 'Critical' },
                { value: 'recovered', label: 'Recovered' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </div>
      </ModalForm>

      {/* Edit Patient Modal — key forces full remount on each patient so defaultValues reset */}
      <ModalForm
        key={editingPatient?.id || 'edit-patient'}
        isOpen={showEditPatientModal}
        onClose={() => { setShowEditPatientModal(false); setEditingPatient(null); }}
        title="Update Patient Info"
        submitLabel="Save Changes"
        isLoading={modalLoading}
        onSubmit={handleUpdatePatient}
      >
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{editingPatient?.name}</p>
            <p className="text-xs text-gray-500">{editingPatient?.email}</p>
          </div>
          <Input
            name="disease"
            label="Disease / Condition"
            placeholder="e.g. Diabetes, Fever"
            defaultValue={editingPatient?.disease || ''}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              name="bloodType"
              label="Blood Type"
              placeholder="Select blood type"
              defaultValue={editingPatient?.bloodType || ''}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
              ]}
            />
            <Select
              name="status"
              label="Status"
              placeholder="Select status"
              defaultValue={editingPatient?.status || 'active'}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'critical', label: 'Critical' },
                { value: 'recovered', label: 'Recovered' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </div>
      </ModalForm>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => { setShowConfirmDialog(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title={`Delete ${deleteTarget?.type === 'doctor' ? 'Doctor' : deleteTarget?.type === 'patient' ? 'Patient' : 'Receptionist'}?`}
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
function PatientManagement({ patients, onAdd, onEdit, onDelete }) {
  const statusVariant = (status) => {
    if (status === 'active') return 'success';
    if (status === 'critical') return 'danger';
    if (status === 'recovered') return 'info';
    return 'default';
  };

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
    { key: 'phone', header: 'Phone', render: (v) => v || '-' },
    { key: 'bloodType', header: 'Blood Type', render: (v) => v ? (
      <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-bold">{v}</span>
    ) : <span className="text-gray-400 text-xs">-</span> },
    { key: 'disease', header: 'Disease', render: (v) => v ? (
      <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">{v}</span>
    ) : <span className="text-gray-400 text-xs">Not set</span> },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <StatusBadge variant={statusVariant(value)} size="sm" dot>
          {value || 'active'}
        </StatusBadge>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Patients"
        subtitle={`${patients.length} patients registered`}
        actions={<Button icon={Plus} onClick={onAdd}>Add Patient</Button>}
      />
      {patients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No patients yet"
          description="Patients who sign up will appear here"
          action={<Button icon={Plus} onClick={onAdd}>Add Patient</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={patients}
          searchable
          sortable
          actions={(row) => (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(row)}
                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit disease & status"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(row)}
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete patient"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}

// ─── Analytics Section ────────────────────────────────────────────────────────
function AnalyticsSection({ stats, doctors, patients, receptionists }) {
  const statusCounts = {
    active: patients.filter(p => (p.status || 'active') === 'active').length,
    critical: patients.filter(p => p.status === 'critical').length,
    recovered: patients.filter(p => p.status === 'recovered').length,
    inactive: patients.filter(p => p.status === 'inactive').length,
  };

  const bloodTypeCounts = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => ({
    label: bt,
    count: patients.filter(p => p.bloodType === bt).length,
  })).filter(b => b.count > 0);

  const maxBlood = Math.max(...bloodTypeCounts.map(b => b.count), 1);
  const totalPatients = patients.length || 1;

  const statusConfig = [
    { key: 'active', label: 'Active', color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
    { key: 'critical', label: 'Critical', color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
    { key: 'recovered', label: 'Recovered', color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
    { key: 'inactive', label: 'Inactive', color: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Clinic performance overview" />

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Doctors', value: stats.totalDoctors, icon: Stethoscope, color: 'blue' },
          { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'purple' },
          { label: 'Staff Members', value: stats.totalReceptionists, icon: UserCog, color: 'green' },
          { label: 'Est. Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'orange' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className={`inline-flex p-2 rounded-lg mb-3 ${
              item.color === 'blue' ? 'bg-blue-50' :
              item.color === 'purple' ? 'bg-purple-50' :
              item.color === 'green' ? 'bg-green-50' : 'bg-orange-50'
            }`}>
              <item.icon className={`w-5 h-5 ${
                item.color === 'blue' ? 'text-blue-600' :
                item.color === 'purple' ? 'text-purple-600' :
                item.color === 'green' ? 'text-green-600' : 'text-orange-600'
              }`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Status Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Patient Status Breakdown</h3>
          </div>
          <div className="space-y-4">
            {statusConfig.map(({ key, label, color, text, bg }) => {
              const count = statusCounts[key];
              const pct = Math.round((count / totalPatients) * 100);
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${text} ${bg}`}>{label}</span>
                    <span className="text-sm font-bold text-gray-700">{count} <span className="text-gray-400 font-normal">({pct}%)</span></span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Blood Type Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-900">Blood Type Distribution</h3>
          </div>
          {bloodTypeCounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400">
              <Heart className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-sm">No blood type data yet</p>
            </div>
          ) : (
            <div className="flex items-end gap-3 h-36">
              {bloodTypeCounts.map(({ label, count }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-gray-700">{count}</span>
                  <div
                    className="w-full bg-red-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${(count / maxBlood) * 96}px` }}
                  />
                  <span className="text-xs font-semibold text-red-700">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Staff vs Patients ratio */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Staff Overview</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Doctors', value: stats.totalDoctors, color: 'text-blue-600', bar: 'bg-blue-500' },
            { label: 'Receptionists', value: stats.totalReceptionists, color: 'text-green-600', bar: 'bg-green-500' },
            { label: 'Patients', value: stats.totalPatients, color: 'text-purple-600', bar: 'bg-purple-500' },
          ].map((item, i) => {
            const maxVal = Math.max(stats.totalDoctors, stats.totalReceptionists, stats.totalPatients, 1);
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className={`text-3xl font-bold ${item.color}`}>{item.value}</span>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className={`h-full ${item.bar} rounded-full`} style={{ width: `${(item.value / maxVal) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Reports Section ──────────────────────────────────────────────────────────
function ReportsSection({ stats, doctors, patients, receptionists }) {
  const today = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });

  const criticalPatients = patients.filter(p => p.status === 'critical');
  const recoveredPatients = patients.filter(p => p.status === 'recovered');
  const activePatients = patients.filter(p => (p.status || 'active') === 'active');

  const summaryCards = [
    { label: 'Total Staff', value: stats.totalDoctors + stats.totalReceptionists, icon: UserCog, color: 'blue', desc: `${stats.totalDoctors} doctors, ${stats.totalReceptionists} receptionists` },
    { label: 'Active Patients', value: activePatients.length, icon: CheckCircle, color: 'green', desc: 'Currently under treatment' },
    { label: 'Critical Cases', value: criticalPatients.length, icon: AlertTriangle, color: 'red', desc: 'Require immediate attention' },
    { label: 'Recovered', value: recoveredPatients.length, icon: TrendingUp, color: 'purple', desc: 'Successfully treated' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle={`Generated on ${today}`}
        actions={
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Print Report
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className={`inline-flex p-2 rounded-lg mb-3 ${
              card.color === 'blue' ? 'bg-blue-50' :
              card.color === 'green' ? 'bg-green-50' :
              card.color === 'red' ? 'bg-red-50' : 'bg-purple-50'
            }`}>
              <card.icon className={`w-5 h-5 ${
                card.color === 'blue' ? 'text-blue-600' :
                card.color === 'green' ? 'text-green-600' :
                card.color === 'red' ? 'text-red-600' : 'text-purple-600'
              }`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm font-medium text-gray-700">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Doctors Report Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Doctors Report</h3>
          <span className="ml-auto text-xs text-gray-400">{doctors.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Name', 'Specialty', 'Email', 'Phone', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {doctors.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400 text-sm">No doctors found</td></tr>
              ) : doctors.map((d, i) => (
                <tr key={d.id || i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{d.name}</td>
                  <td className="px-4 py-3 text-gray-600">{d.specialty || '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{d.email || '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{d.phone || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {d.status || 'active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Patients Alert */}
      {criticalPatients.length > 0 && (
        <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2 bg-red-50">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3 className="font-semibold text-red-700">Critical Patients — Immediate Attention Required</h3>
            <span className="ml-auto text-xs text-red-500">{criticalPatients.length} patients</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['#', 'Patient', 'Disease', 'Blood Type', 'Phone'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {criticalPatients.map((p, i) => (
                  <tr key={p.id || i} className="hover:bg-red-50/30">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">{p.disease || '-'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-bold">{p.bloodType || '-'}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Revenue Summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Revenue Summary</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-700">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">Estimated Total</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-700">${(stats.totalRevenue / (new Date().getMonth() + 1)).toFixed(0)}</p>
            <p className="text-sm text-blue-600 mt-1">Monthly Average</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-2xl font-bold text-purple-700">$150</p>
            <p className="text-sm text-purple-600 mt-1">Per Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Section ─────────────────────────────────────────────────────────
function SettingsSection() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, sms: false, critical: true });

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Settings" subtitle="Manage clinic configuration" />

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Settings saved successfully!
        </div>
      )}

      {/* Clinic Information */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Clinic Information</h3>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Clinic Name</label>
              <input
                type="text"
                defaultValue="ClinicPro Medical Center"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email</label>
              <input
                type="email"
                defaultValue="admin@clinicpro.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                defaultValue="+92 300 0000000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                defaultValue="Karachi, Pakistan"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <textarea
              rows={2}
              defaultValue="123 Medical Street, Gulshan-e-Iqbal, Karachi"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Notification Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email for new appointments' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Get SMS alerts for critical patient updates' },
            { key: 'critical', label: 'Critical Patient Alerts', desc: 'Instant alert when a patient is marked critical' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notifications[key] ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${notifications[key] ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-500" />
          <h3 className="font-semibold text-gray-900">Security</h3>
        </div>
        <div className="p-6 space-y-3">
          {[
            { label: 'Change Password', desc: 'Update your admin account password', btn: 'Change', color: 'blue' },
            { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', btn: 'Enable', color: 'green' },
            { label: 'Active Sessions', desc: 'View and manage all active login sessions', btn: 'View', color: 'gray' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                item.color === 'blue' ? 'border-blue-200 text-blue-600 hover:bg-blue-50' :
                item.color === 'green' ? 'border-green-200 text-green-600 hover:bg-green-50' :
                'border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}>
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Palette className="w-4 h-4 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Appearance</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">Choose accent color for the dashboard</p>
          <div className="flex gap-3">
            {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-teal-500'].map((color, i) => (
              <button key={i} className={`w-8 h-8 rounded-full ${color} ${i === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''} hover:scale-110 transition-transform`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
