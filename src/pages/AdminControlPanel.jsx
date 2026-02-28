import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  UserCog, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
  LogOut,
  Bell,
  ChevronDown,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, StatCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { ModalForm, ConfirmDialog } from '../components/ui/ModalForm';
import { DashboardCard, DataTable, StatusBadge, PageHeader, ErrorAlert, EmptyState, LoadingSkeleton, CardSkeleton, TableSkeleton } from '../components/ui/components';
import { Sidebar } from '../components/layout/Sidebar';
import {
  CURRENT_ADMIN,
  getSystemStats,
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getReceptionists,
  addReceptionist,
  updateReceptionist,
  deleteReceptionist,
  getAllPatients,
  getUnassignedPatients,
  assignPatientToDoctor,
  getAvailableDoctors,
  getRevenueTrend,
  getDepartmentAnalytics,
  getDoctorPerformance,
} from '../data/adminData';

// Status configuration
const statusConfig = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'default', label: 'Inactive' },
};

export function AdminControlPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Modal states
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showReceptionistModal, setShowReceptionistModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Selected item for edit/delete
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Refresh trigger for data updates
  const [refreshKey, setRefreshKey] = useState(0);
  const forceRefresh = () => setRefreshKey(prev => prev + 1);

  // Get system stats
  const stats = useMemo(() => getSystemStats(), [refreshKey]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard stats={stats} onNavigate={setActiveSection} />;
      case 'doctors':
        return (
          <DoctorManagement
            key={refreshKey}
            onAdd={() => { setSelectedItem(null); setShowDoctorModal(true); }}
            onEdit={(doctor) => { setSelectedItem(doctor); setShowDoctorModal(true); }}
            onDelete={(doctor) => { setDeleteTarget({ type: 'doctor', data: doctor }); setShowConfirmDialog(true); }}
          />
        );
      case 'receptionists':
        return (
          <ReceptionistManagement
            key={refreshKey}
            onAdd={() => { setSelectedItem(null); setShowReceptionistModal(true); }}
            onEdit={(rec) => { setSelectedItem(rec); setShowReceptionistModal(true); }}
            onDelete={(rec) => { setDeleteTarget({ type: 'receptionist', data: rec }); setShowConfirmDialog(true); }}
          />
        );
      case 'patients':
        return (
          <PatientManagement
            key={refreshKey}
            stats={stats}
            onAssign={(patient) => { setSelectedItem(patient); setShowAssignModal(true); }}
          />
        );
      case 'analytics':
        return <AnalyticsSection stats={stats} />;
      default:
        return <AdminDashboard stats={stats} onNavigate={setActiveSection} />;
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    
    if (deleteTarget.type === 'doctor') {
      const result = deleteDoctor(deleteTarget.data.id);
      if (result.success === false) {
        alert(result.message);
        return;
      }
    } else if (deleteTarget.type === 'receptionist') {
      deleteReceptionist(deleteTarget.data.id);
    }
    
    forceRefresh();
    setShowConfirmDialog(false);
    setDeleteTarget(null);
  };

  const handleSaveDoctor = (formData) => {
    if (selectedItem) {
      updateDoctor(selectedItem.id, formData);
    } else {
      addDoctor(formData);
    }
    forceRefresh();
    setShowDoctorModal(false);
    setSelectedItem(null);
  };

  const handleSaveReceptionist = (formData) => {
    if (selectedItem) {
      updateReceptionist(selectedItem.id, formData);
    } else {
      addReceptionist(formData);
    }
    forceRefresh();
    setShowReceptionistModal(false);
    setSelectedItem(null);
  };

  const handleAssignPatient = (patientId, doctorId) => {
    assignPatientToDoctor(patientId, doctorId);
    forceRefresh();
    setShowAssignModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={activeSection}
          onNavigate={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          userRole="admin"
        />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 capitalize">{activeSection}</h1>
              <p className="text-xs text-gray-500">Administrative Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                icon={Search}
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Avatar name={CURRENT_ADMIN.name} size="md" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{CURRENT_ADMIN.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Doctor Modal */}
      <DoctorFormModal
        isOpen={showDoctorModal}
        onClose={() => { setShowDoctorModal(false); setSelectedItem(null); }}
        onSubmit={handleSaveDoctor}
        doctor={selectedItem}
      />

      {/* Receptionist Modal */}
      <ReceptionistFormModal
        isOpen={showReceptionistModal}
        onClose={() => { setShowReceptionistModal(false); setSelectedItem(null); }}
        onSubmit={handleSaveReceptionist}
        receptionist={selectedItem}
      />

      {/* Assign Patient Modal */}
      <AssignPatientModal
        isOpen={showAssignModal}
        onClose={() => { setShowAssignModal(false); setSelectedItem(null); }}
        onSubmit={handleAssignPatient}
        patient={selectedItem}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => { setShowConfirmDialog(false); setDeleteTarget(null); }}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteTarget?.type === 'doctor' ? 'Doctor' : 'Receptionist'}`}
        message={`Are you sure you want to delete ${deleteTarget?.data?.name}? This action cannot be undone.`}
        variant="danger"
      />
    </div>
  );
}

// ============ ADMIN DASHBOARD ============

function AdminDashboard({ stats, onNavigate }) {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <TableSkeleton rows={4} columns={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Doctors"
          value={stats.totalDoctors}
          change={`${stats.totalDoctors} active`}
          trend="up"
          icon={Stethoscope}
          color="blue"
        />
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          change={`${stats.activePatients} active`}
          trend="up"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="This month"
          trend="up"
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          change={`${stats.unassignedPatients} unassigned`}
          trend={stats.unassignedPatients > 0 ? 'down' : 'stable'}
          icon={Calendar}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('doctors')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Doctors</p>
                <p className="text-xs text-gray-500">Add, edit, remove</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('receptionists')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <UserCog className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Receptionists</p>
                <p className="text-xs text-gray-500">Front desk staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('patients')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Patients</p>
                <p className="text-xs text-gray-500">{stats.unassignedPatients} need assignment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('analytics')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Analytics</p>
                <p className="text-xs text-gray-500">System insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.unassignedPatients > 0 && (
        <ErrorAlert
          type="warning"
          title="Unassigned Patients"
          message={`${stats.unassignedPatients} patient(s) are not assigned to any doctor. Please assign them to ensure proper care.`}
        />
      )}

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900">Medical Staff</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.totalDoctors}</p>
              <p className="text-sm text-gray-500">Active doctors</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCog className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-semibold text-gray-900">Administrative</span>
              </div>
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-sm text-gray-500">Receptionists on duty</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-semibold text-gray-900">Activity</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.todayAppointments}</p>
              <p className="text-sm text-gray-500">Appointments today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ DOCTOR MANAGEMENT ============

function DoctorManagement({ onAdd, onEdit, onDelete }) {
  const doctors = getDoctors();

  const columns = [
    { 
      key: 'name', 
      header: 'Doctor',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'specialty', header: 'Specialty', render: (value) => <Badge variant="primary" size="sm">{value}</Badge> },
    { key: 'experience', header: 'Experience' },
    { key: 'patientsCount', header: 'Patients', render: (value) => <Badge variant="default" size="sm">{value} patients</Badge> },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={statusConfig[value]?.variant} size="sm" dot>{value}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Doctors"
        subtitle="Add, edit, and remove medical staff"
        actions={
          <Button icon={Plus} onClick={onAdd}>
            Add Doctor
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={doctors}
        searchable
        sortable
        filterable
        filters={[
          {
            key: 'specialty',
            label: 'Specialty',
            options: [...new Set(doctors.map(d => d.specialty))].map(s => ({ value: s, label: s })),
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ],
          },
        ]}
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
    </div>
  );
}

// ============ RECEPTIONIST MANAGEMENT ============

function ReceptionistManagement({ onAdd, onEdit, onDelete }) {
  const receptionists = getReceptionists();

  const columns = [
    { 
      key: 'name', 
      header: 'Name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'phone', header: 'Phone' },
    { key: 'shift', header: 'Shift', render: (value) => <Badge variant="primary" size="sm">{value}</Badge> },
    { key: 'joinedDate', header: 'Joined' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={statusConfig[value]?.variant} size="sm" dot>{value}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Receptionists"
        subtitle="Manage front desk administrative staff"
        actions={
          <Button icon={Plus} onClick={onAdd}>
            Add Receptionist
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={receptionists}
        searchable
        sortable
        filterable
        filters={[
          {
            key: 'shift',
            label: 'Shift',
            options: [
              { value: 'Morning', label: 'Morning' },
              { value: 'Afternoon', label: 'Afternoon' },
              { value: 'Evening', label: 'Evening' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ],
          },
        ]}
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
    </div>
  );
}

// ============ PATIENT MANAGEMENT ============

function PatientManagement({ stats, onAssign }) {
  const patients = getAllPatients();
  const unassigned = getUnassignedPatients();

  const columns = [
    { 
      key: 'name', 
      header: 'Patient',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'age', header: 'Age' },
    { key: 'condition', header: 'Condition', render: (value) => <Badge variant="primary" size="sm">{value}</Badge> },
    { key: 'doctorId', header: 'Assigned Doctor', render: (value, row) => {
      const doctors = getAvailableDoctors();
      const doctor = doctors.find(d => d.id === value);
      return doctor ? (
        <Badge variant="success" size="sm">{doctor.name}</Badge>
      ) : (
        <Badge variant="warning" size="sm">Unassigned</Badge>
      );
    }},
    { key: 'status', header: 'Status', render: (value) => <StatusBadge variant={statusConfig[value]?.variant} size="sm" dot>{value}</StatusBadge> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Patients"
        subtitle={`View all ${patients.length} patients in the system`}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant={unassigned.length > 0 ? 'warning' : 'success'} size="sm">
              {unassigned.length} unassigned
            </Badge>
          </div>
        }
      />

      {unassigned.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Patients Needing Assignment
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {unassigned.map(patient => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Avatar name={patient.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">{patient.condition}</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => onAssign(patient)}>Assign</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={patients}
            searchable
            sortable
            filterable
            filters={[
              {
                key: 'status',
                label: 'Status',
                options: [
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ],
              },
            ]}
            actions={(row) => (
              <>
                {!row.doctorId && (
                  <button onClick={() => onAssign(row)} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// ============ ANALYTICS SECTION ============

function AnalyticsSection({ stats }) {
  const revenueTrend = getRevenueTrend();
  const departmentStats = getDepartmentAnalytics();
  const doctorPerformance = getDoctorPerformance();

  const maxRevenue = Math.max(...revenueTrend.map(m => m.revenue));

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Analytics"
        subtitle="Comprehensive overview of clinic performance"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} change="This month" trend="up" icon={DollarSign} color="green" />
        <DashboardCard title="Total Patients" value={stats.totalPatients} change={`${stats.activePatients} active`} trend="up" icon={Users} color="blue" />
        <DashboardCard title="Active Doctors" value={stats.totalDoctors} change="On staff" trend="stable" icon={Stethoscope} color="purple" />
        <DashboardCard title="Appointments Today" value={stats.todayAppointments} change="Scheduled" trend="up" icon={Calendar} color="orange" />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend (6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4">
            {revenueTrend.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full max-w-[60px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                />
                <div className="text-center">
                  <span className="text-xs font-medium text-gray-500">{data.month}</span>
                  <p className="text-xs text-gray-400">${(data.revenue / 1000).toFixed(0)}k</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-${['blue', 'green', 'purple', 'orange'][index % 4]}-500`} />
                  <span className="text-sm font-medium text-gray-700 w-32">{dept.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${['blue', 'green', 'purple', 'orange'][index % 4]}-500 rounded-full`}
                      style={{ width: `${(dept.revenue / 60000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-20 text-right">${(dept.revenue / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doctor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {doctorPerformance.slice(0, 5).map((doctor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar name={doctor.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-xs text-gray-500">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{doctor.patientsCount}</p>
                      <p className="text-xs text-gray-500">Patients</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">${doctor.revenue}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============ FORM MODALS ============

function DoctorFormModal({ isOpen, onClose, onSubmit, doctor }) {
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialty: doctor?.specialty || '',
    email: doctor?.email || '',
    phone: doctor?.phone || '',
    experience: doctor?.experience || '',
    education: doctor?.education || '',
    status: doctor?.status || 'active',
  });

  const specialties = ['Cardiology', 'Endocrinology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'General Medicine'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={doctor ? 'Edit Doctor' : 'Add New Doctor'}
      subtitle={doctor ? 'Update doctor information' : 'Add a new medical professional'}
      onSubmit={handleSubmit}
      submitLabel={doctor ? 'Save Changes' : 'Add Doctor'}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Dr. John Doe" required />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@clinic.com" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Specialty" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} options={[{value: '', label: 'Select Specialty'}, ...specialties.map(s => ({value: s, label: s}))]} required />
          <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Experience" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} placeholder="10 years" />
          <Input label="Education" value={formData.education} onChange={(e) => setFormData({...formData, education: e.target.value})} placeholder="MD, University Name" />
        </div>
        <Select label="Status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} />
      </div>
    </ModalForm>
  );
}

function ReceptionistFormModal({ isOpen, onClose, onSubmit, receptionist }) {
  const [formData, setFormData] = useState({
    name: receptionist?.name || '',
    email: receptionist?.email || '',
    phone: receptionist?.phone || '',
    shift: receptionist?.shift || 'Morning',
    status: receptionist?.status || 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title={receptionist ? 'Edit Receptionist' : 'Add New Receptionist'}
      subtitle={receptionist ? 'Update receptionist information' : 'Add a new front desk staff member'}
      onSubmit={handleSubmit}
      submitLabel={receptionist ? 'Save Changes' : 'Add Receptionist'}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Jane Smith" required />
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="jane@clinic.com" required />
        </div>
        <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" required />
        <Select label="Shift" value={formData.shift} onChange={(e) => setFormData({...formData, shift: e.target.value})} options={[{value: 'Morning', label: 'Morning (8AM - 4PM)'}, {value: 'Afternoon', label: 'Afternoon (12PM - 8PM)'}, {value: 'Evening', label: 'Evening (4PM - 12AM)'}]} />
        <Select label="Status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} />
      </div>
    </ModalForm>
  );
}

function AssignPatientModal({ isOpen, onClose, onSubmit, patient }) {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const doctors = getAvailableDoctors();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDoctor && patient) {
      onSubmit(patient.id, selectedDoctor);
    }
  };

  if (!patient) return null;

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Patient to Doctor"
      subtitle={`Assign ${patient.name} to a primary care physician`}
      onSubmit={handleSubmit}
      submitLabel="Assign Doctor"
    >
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Avatar name={patient.name} size="md" />
            <div>
              <p className="font-medium text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-500">{patient.condition}</p>
            </div>
          </div>
        </div>
        <Select 
          label="Select Doctor" 
          value={selectedDoctor} 
          onChange={(e) => setSelectedDoctor(e.target.value)} 
          options={[
            {value: '', label: 'Choose a doctor...'}, 
            ...doctors.map(d => ({value: d.id, label: `${d.name} - ${d.specialty}`}))
          ]} 
          required 
        />
      </div>
    </ModalForm>
  );
}

export default AdminControlPanel;
