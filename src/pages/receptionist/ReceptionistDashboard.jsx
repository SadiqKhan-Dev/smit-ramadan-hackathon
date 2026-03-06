import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { MOCK_PATIENTS_LIST, MOCK_DOCTORS, MOCK_ALL_APPOINTMENTS } from '../../data/mockData';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Users, Calendar, UserCog, Plus
} from 'lucide-react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardContent, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { DataTable, StatusBadge, PageHeader, EmptyState, ErrorAlert } from '../../components/ui/components';
import { ModalForm } from '../../components/ui/ModalForm';

/**
 * Receptionist Dashboard Component
 */
export function ReceptionistDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayBookings: 0,
    doctorsAvailable: 0,
    upcomingAppointments: 0,
  });

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.uid) {
      fetchData();
    }
  }, [currentUser]);

  async function fetchData() {
    try {
      setLoading(true);
      const [patientsSnap, doctorsSnap, appointmentsSnap] = await Promise.all([
        getDocs(collection(db, 'patients')),
        getDocs(query(collection(db, 'users'), where('role', '==', 'doctor'))),
        getDocs(collection(db, 'appointments')),
      ]);

      const patientsData = patientsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const doctorsData = doctorsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const appointmentsData = appointmentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      // Use mock data as fallback when Firestore is empty
      const finalPatients = patientsData.length > 0 ? patientsData : MOCK_PATIENTS_LIST;
      const finalDoctors = doctorsData.length > 0 ? doctorsData : MOCK_DOCTORS;
      const finalAppointments = appointmentsData.length > 0 ? appointmentsData : MOCK_ALL_APPOINTMENTS;

      const today = new Date().toISOString().split('T')[0];

      setPatients(finalPatients);
      setDoctors(finalDoctors);
      setAppointments(finalAppointments);
      setStats({
        totalPatients: finalPatients.length,
        todayBookings: finalAppointments.filter(a => a.date === today).length,
        doctorsAvailable: finalDoctors.filter(d => d.status === 'active').length,
        upcomingAppointments: finalAppointments.filter(a => a.date >= today).length,
      });
    } catch (err) {
      console.error('Fetch error:', err);
      // Use mock data on error
      setPatients(MOCK_PATIENTS_LIST);
      setDoctors(MOCK_DOCTORS);
      setAppointments(MOCK_ALL_APPOINTMENTS);
      const today = new Date().toISOString().split('T')[0];
      setStats({
        totalPatients: MOCK_PATIENTS_LIST.length,
        todayBookings: MOCK_ALL_APPOINTMENTS.filter(a => a.date === today).length,
        doctorsAvailable: MOCK_DOCTORS.filter(d => d.status === 'active').length,
        upcomingAppointments: MOCK_ALL_APPOINTMENTS.filter(a => a.date >= today).length,
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

  // Add Patient
  async function handleAddPatient(e) {
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (!name) return;
    setModalLoading(true);
    try {
      await addDoc(collection(db, 'patients'), {
        name,
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        age: formData.get('age') || '',
        gender: formData.get('gender') || '',
        doctorId: formData.get('doctorId') || '',
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      setShowAddPatient(false);
      fetchData();
    } catch (err) {
      setError('Patient add karne mein error. Firestore rules check karein.');
    } finally {
      setModalLoading(false);
    }
  }

  // Book Appointment
  async function handleAddAppointment(e) {
    const formData = new FormData(e.target);
    const patientId = formData.get('patientId');
    const doctorId = formData.get('doctorId');
    const date = formData.get('date');
    if (!patientId || !doctorId || !date) return;

    const patient = patients.find(p => p.id === patientId);
    const doctor = doctors.find(d => d.id === doctorId);

    setModalLoading(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        patientId,
        doctorId,
        patientName: patient?.name || '',
        doctorName: doctor?.name || '',
        date,
        time: formData.get('time') || '',
        type: formData.get('type') || 'General',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      setShowAddAppointment(false);
      fetchData();
    } catch (err) {
      setError('Appointment book karne mein error. Firestore rules check karein.');
    } finally {
      setModalLoading(false);
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPage={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole="receptionist"
        onLogout={handleLogout}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Reception Dashboard</h1>
            <p className="text-xs text-gray-500">{currentUser?.displayName}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </header>

        <main className="p-6 space-y-6">
          {error && (
            <ErrorAlert type="error" message={error} onDismiss={() => setError('')} />
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Patients" value={stats.totalPatients} change="Registered" trend="up" icon={Users} color="blue" />
            <StatCard title="Today's Bookings" value={stats.todayBookings} change="Scheduled" trend="stable" icon={Calendar} color="purple" />
            <StatCard title="Doctors Available" value={stats.doctorsAvailable} change="On duty" trend="up" icon={UserCog} color="green" />
            <StatCard title="Upcoming" value={stats.upcomingAppointments} change="This week" trend="stable" icon={Calendar} color="orange" />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button icon={Plus} onClick={() => setShowAddPatient(true)}>Add Patient</Button>
            <Button variant="secondary" icon={Plus} onClick={() => setShowAddAppointment(true)}>Book Appointment</Button>
          </div>

          {/* Today's Appointments */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <PageHeader
                title="Today's Appointments"
                subtitle={`${appointments.filter(a => a.date === today).length} appointments today`}
              />
            </div>
            <CardContent className="p-0">
              {appointments.filter(a => a.date === today).length === 0 ? (
                <EmptyState
                  icon={Calendar}
                  title="No appointments today"
                  description="Book an appointment to get started"
                  action={<Button icon={Plus} onClick={() => setShowAddAppointment(true)}>Book Appointment</Button>}
                />
              ) : (
                <DataTable
                  columns={[
                    {
                      key: 'patientName',
                      header: 'Patient',
                      render: (v, row) => (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">{row.patientName?.charAt(0)}</span>
                          </div>
                          <span className="font-medium text-gray-900">{row.patientName || '-'}</span>
                        </div>
                      )
                    },
                    { key: 'doctorName', header: 'Doctor', render: (v) => v || '-' },
                    { key: 'time', header: 'Time', render: (v) => v || 'TBD' },
                    { key: 'type', header: 'Type', render: (v) => v || 'General' },
                    { key: 'status', header: 'Status', render: (v) => <StatusBadge variant={v === 'completed' ? 'success' : v === 'cancelled' ? 'danger' : 'default'} size="sm" dot>{v || 'pending'}</StatusBadge> },
                  ]}
                  data={appointments.filter(a => a.date === today)}
                  searchable={false}
                  sortable={false}
                />
              )}
            </CardContent>
          </Card>

          {/* All Patients */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <PageHeader
                title="All Patients"
                subtitle={`${patients.length} patients registered`}
              />
            </div>
            <CardContent className="p-0">
              {patients.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No patients yet"
                  description="Add your first patient"
                  action={<Button icon={Plus} onClick={() => setShowAddPatient(true)}>Add Patient</Button>}
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
                    { key: 'phone', header: 'Phone', render: (v) => <span className="text-sm">{v || '-'}</span> },
                    { key: 'gender', header: 'Gender', render: (v) => v || '-' },
                    { key: 'status', header: 'Status', render: (v) => <StatusBadge variant={v === 'active' ? 'success' : 'default'} size="sm" dot>{v || 'active'}</StatusBadge> },
                  ]}
                  data={patients}
                  searchable
                  sortable
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Patient Modal */}
      <ModalForm
        isOpen={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        title="Add New Patient"
        submitLabel="Add Patient"
        isLoading={modalLoading}
        onSubmit={handleAddPatient}
      >
        <div className="space-y-4">
          <Input name="name" label="Full Name" placeholder="John Doe" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" type="email" label="Email" placeholder="john@example.com" />
            <Input name="phone" label="Phone" placeholder="+92 300 0000000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="age" type="number" label="Age" placeholder="30" />
            <Select name="gender" label="Gender" options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]} placeholder="Select Gender" />
          </div>
          <Select name="doctorId" label="Assign Doctor" options={
            doctors.map(d => ({ value: d.id, label: d.name + (d.specialty ? ` (${d.specialty})` : '') }))
          } placeholder="Select Doctor (Optional)" />
        </div>
      </ModalForm>

      {/* Book Appointment Modal */}
      <ModalForm
        isOpen={showAddAppointment}
        onClose={() => setShowAddAppointment(false)}
        title="Book Appointment"
        submitLabel="Book Appointment"
        isLoading={modalLoading}
        onSubmit={handleAddAppointment}
      >
        <div className="space-y-4">
          <Select name="patientId" label="Select Patient" required options={
            patients.map(p => ({ value: p.id, label: p.name }))
          } placeholder="Select Patient" />
          <Select name="doctorId" label="Select Doctor" required options={
            doctors.map(d => ({ value: d.id, label: d.name + (d.specialty ? ` - ${d.specialty}` : '') }))
          } placeholder="Select Doctor" />
          <div className="grid grid-cols-2 gap-4">
            <Input name="date" type="date" label="Date" required />
            <Input name="time" type="time" label="Time" />
          </div>
          <Select name="type" label="Appointment Type" options={[
            { value: 'General', label: 'General Checkup' },
            { value: 'Follow-up', label: 'Follow-up' },
            { value: 'Emergency', label: 'Emergency' },
            { value: 'Specialist', label: 'Specialist Consultation' },
          ]} placeholder="Select Type" />
        </div>
      </ModalForm>
    </div>
  );
}

export default ReceptionistDashboard;
