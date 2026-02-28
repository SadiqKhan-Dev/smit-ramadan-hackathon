import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, UserCog, Plus, Search, Phone, Mail
} from 'lucide-react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardContent, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { DataTable, StatusBadge, PageHeader, EmptyState } from '../../components/ui/components';
import { ModalForm } from '../../components/ui/ModalForm';

/**
 * Receptionist Dashboard Component
 */
export function ReceptionistDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);

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
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      
      const patientsRef = collection(db, 'patients');
      const doctorsRef = collection(db, 'users');
      const appointmentsRef = collection(db, 'appointments');

      const doctorsQuery = query(doctorsRef, where('role', '==', 'doctor'));
      
      const [patientsSnap, doctorsSnap, appointmentsSnap] = await Promise.all([
        getDocs(patientsRef),
        getDocs(doctorsQuery),
        getDocs(appointmentsRef),
      ]);

      const patientsData = patientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const doctorsData = doctorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const appointmentsData = appointmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointmentsData.filter(a => a.date === today);

      setPatients(patientsData);
      setDoctors(doctorsData);
      setAppointments(appointmentsData);

      setStats({
        totalPatients: patientsData.length,
        todayBookings: todayAppointments.length,
        doctorsAvailable: doctorsData.filter(d => d.status === 'active').length,
        upcomingAppointments: appointmentsData.filter(a => a.date >= today).length,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPage={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole="receptionist"
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
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Patients" value={stats.totalPatients} change="Registered" trend="up" icon={Users} color="blue" />
            <StatCard title="Today's Bookings" value={stats.todayBookings} change="Scheduled" trend="stable" icon={Calendar} color="purple" />
            <StatCard title="Doctors Available" value={stats.doctorsAvailable} change="On duty" trend="up" icon={UserCog} color="green" />
            <StatCard title="Upcoming" value={stats.upcomingAppointments} change="This week" trend="stable" icon={Calendar} color="orange" />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button icon={Plus} onClick={() => setShowAddPatient(true)}>Add Patient</Button>
            <Button variant="secondary" icon={Plus} onClick={() => setShowAddAppointment(true)}>Book Appointment</Button>
          </div>

          {/* Patients Table */}
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
                  description="Add your first patient to get started"
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
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          await addDoc(collection(db, 'patients'), {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            doctorId: formData.get('doctorId'),
            status: 'active',
            createdAt: new Date().toISOString(),
          });
          fetchData();
          setShowAddPatient(false);
        }}
      >
        <div className="space-y-4">
          <Input name="name" label="Full Name" placeholder="John Doe" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="email" type="email" label="Email" placeholder="john@example.com" />
            <Input name="phone" label="Phone" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="age" type="number" label="Age" placeholder="30" />
            <Select name="gender" label="Gender" options={[
              { value: '', label: 'Select' },
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]} />
          </div>
          <Select name="doctorId" label="Assign Doctor" options={[
            { value: '', label: 'Select Doctor (Optional)' },
            ...doctors.map(d => ({ value: d.id, label: d.name })),
          ]} />
        </div>
      </ModalForm>
    </div>
  );
}

export default ReceptionistDashboard;
