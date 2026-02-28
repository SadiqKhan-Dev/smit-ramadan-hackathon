import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Bell,
  Search,
  Menu,
  ChevronDown,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  LogOut,
  CreditCard,
  Stethoscope,
  Filter,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/Table';

// Mock Data
const statsData = [
  { title: 'Total Patients', value: '2,847', change: '+156 this month', icon: Users, color: 'blue' },
  { title: "Today's Bookings", value: '48', change: '12 pending', icon: Calendar, color: 'purple' },
  { title: 'Doctors Available', value: '8', change: '2 on leave', icon: Stethoscope, color: 'green' },
  { title: 'Upcoming Appointments', value: '124', change: 'This week', icon: Clock, color: 'orange' },
];

const patientsData = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', lastVisit: 'Feb 28, 2024', status: 'active' },
  { id: 'P002', name: 'Michael Brown', age: 45, phone: '+1 (555) 234-5678', email: 'michael.b@email.com', lastVisit: 'Feb 27, 2024', status: 'active' },
  { id: 'P003', name: 'Emma Davis', age: 28, phone: '+1 (555) 345-6789', email: 'emma.d@email.com', lastVisit: 'Feb 26, 2024', status: 'active' },
  { id: 'P004', name: 'Robert Miller', age: 52, phone: '+1 (555) 456-7890', email: 'robert.m@email.com', lastVisit: 'Feb 25, 2024', status: 'inactive' },
  { id: 'P005', name: 'Lisa Anderson', age: 38, phone: '+1 (555) 567-8901', email: 'lisa.a@email.com', lastVisit: 'Feb 24, 2024', status: 'active' },
  { id: 'P006', name: 'James Wilson', age: 61, phone: '+1 (555) 678-9012', email: 'james.w@email.com', lastVisit: 'Feb 23, 2024', status: 'active' },
];

const appointmentsData = [
  { id: 1, patient: 'Sarah Johnson', doctor: 'Dr. Emily Chen', department: 'Cardiology', time: '09:00 AM', date: 'Today', status: 'checked-in', type: 'Checkup' },
  { id: 2, patient: 'Michael Brown', doctor: 'Dr. James Wilson', department: 'Endocrinology', time: '09:30 AM', date: 'Today', status: 'waiting', type: 'Consultation' },
  { id: 3, patient: 'Emma Davis', doctor: 'Dr. Emily Chen', department: 'Neurology', time: '10:00 AM', date: 'Today', status: 'waiting', type: 'Follow-up' },
  { id: 4, patient: 'Robert Miller', doctor: 'Dr. Sarah Lee', department: 'Cardiology', time: '10:30 AM', date: 'Today', status: 'confirmed', type: 'Surgery Consult' },
  { id: 5, patient: 'Lisa Anderson', doctor: 'Dr. James Wilson', department: 'Pulmonology', time: '11:00 AM', date: 'Today', status: 'confirmed', type: 'Checkup' },
  { id: 6, patient: 'James Wilson', doctor: 'Dr. Michael Chang', department: 'Orthopedics', time: '11:30 AM', date: 'Today', status: 'no-show', type: 'Therapy' },
];

const doctorsData = [
  { id: 1, name: 'Dr. Emily Chen', specialty: 'Cardiology', status: 'available', nextAvailable: 'Now' },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Endocrinology', status: 'busy', nextAvailable: '11:00 AM' },
  { id: 3, name: 'Dr. Sarah Lee', specialty: 'Cardiology', status: 'available', nextAvailable: 'Now' },
  { id: 4, name: 'Dr. Michael Chang', specialty: 'Orthopedics', status: 'available', nextAvailable: 'Now' },
  { id: 5, name: 'Dr. Amanda Roberts', specialty: 'Neurology', status: 'on-leave', nextAvailable: 'Tomorrow' },
];

const statusConfig = {
  'checked-in': { variant: 'success', label: 'Checked In' },
  'waiting': { variant: 'warning', label: 'Waiting' },
  'confirmed': { variant: 'primary', label: 'Confirmed' },
  'no-show': { variant: 'danger', label: 'No Show' },
  'completed': { variant: 'success', label: 'Completed' },
  'cancelled': { variant: 'danger', label: 'Cancelled' },
};

const doctorStatusConfig = {
  available: { variant: 'success', label: 'Available' },
  busy: { variant: 'warning', label: 'Busy' },
  'on-leave': { variant: 'default', label: 'On Leave' },
};

export function ReceptionistDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight">ClinicPro</span>
              <span className="text-slate-400 text-xs">Reception</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'Patients', icon: Users, active: false },
            { name: 'Appointments', icon: Calendar, active: false },
            { name: 'Billing', icon: CreditCard, active: false },
            { name: 'Documents', icon: FileText, active: false },
            { name: 'Settings', icon: Settings, active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                item.active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reception Dashboard</h1>
              <p className="text-xs text-gray-500">Manage appointments and patients</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search patients, appointments..."
                icon={Search}
                className="w-72"
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
                <Avatar name="Jane Smith" size="md" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                  <p className="text-xs text-gray-500">Receptionist</p>
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-2.5 rounded-xl bg-${stat.color}-100`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Button icon={UserPlus} onClick={() => setShowAddPatient(true)}>
              Add Patient
            </Button>
            <Button icon={Plus} variant="secondary" onClick={() => setShowAddAppointment(true)}>
              Book Appointment
            </Button>
            <Button icon={CreditCard} variant="secondary">
              Process Payment
            </Button>
            <div className="flex-1" />
            <Button icon={Download} variant="ghost">
              Export Report
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200">
            {[
              { id: 'appointments', label: "Today's Appointments" },
              { id: 'patients', label: 'Patient Management' },
              { id: 'doctors', label: 'Doctors Status' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Manage patient check-ins and appointments</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    options={[
                      { value: '', label: 'All Departments' },
                      { value: 'Cardiology', label: 'Cardiology' },
                      { value: 'Neurology', label: 'Neurology' },
                      { value: 'Orthopedics', label: 'Orthopedics' },
                    ]}
                    icon={Filter}
                  />
                  <Button size="sm" icon={Plus}>
                    Quick Book
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointmentsData.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{apt.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar name={apt.patient} size="sm" />
                            <div>
                              <p className="font-medium text-gray-900">{apt.patient}</p>
                              <p className="text-xs text-gray-500">{apt.date}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{apt.doctor}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="primary" size="sm">{apt.department}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{apt.type}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusConfig[apt.status]?.variant || 'default'}
                            size="sm"
                          >
                            {statusConfig[apt.status]?.label || apt.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {apt.status === 'waiting' && (
                              <Button variant="success" size="sm">Check In</Button>
                            )}
                            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Patients Tab */}
          {activeTab === 'patients' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Patient Management</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">View and manage patient records</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search patients..."
                    icon={Search}
                    className="w-64"
                  />
                  <Button icon={UserPlus} onClick={() => setShowAddPatient(true)}>
                    Add Patient
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <span className="font-mono text-sm text-gray-600">{patient.id}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar name={patient.name} size="sm" />
                            <span className="font-medium text-gray-900">{patient.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{patient.age}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              {patient.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Mail className="w-3 h-3" />
                              {patient.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={patient.status === 'active' ? 'success' : 'default'}
                            size="sm"
                            dot
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Doctors Status</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Current availability of medical staff</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctorsData.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={doctor.name} size="md" />
                          <div>
                            <p className="font-semibold text-gray-900">{doctor.name}</p>
                            <p className="text-sm text-gray-500">{doctor.specialty}</p>
                          </div>
                        </div>
                        <Badge
                          variant={doctorStatusConfig[doctor.status]?.variant || 'default'}
                          size="sm"
                        >
                          {doctorStatusConfig[doctor.status]?.label || doctor.status}
                        </Badge>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Next: {doctor.nextAvailable}</span>
                        </div>
                        <Button variant="ghost" size="sm">Schedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Add New Patient</h2>
              <button
                onClick={() => setShowAddPatient(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Age" type="number" placeholder="30" />
                <Select label="Gender" options={[
                  { value: '', label: 'Select Gender' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' },
                ]} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Phone" placeholder="+1 (555) 000-0000" />
                <Input label="Email" type="email" placeholder="john.doe@email.com" />
              </div>
              <Input label="Address" placeholder="123 Main St, City, State" />
              <Input label="Emergency Contact" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddPatient(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddPatient(false)}>
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Book Appointment</h2>
              <button
                onClick={() => setShowAddAppointment(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Input label="Patient Name" placeholder="Search patient..." icon={Search} />
              <div className="grid grid-cols-2 gap-4">
                <Select label="Department" options={[
                  { value: '', label: 'Select Department' },
                  { value: 'Cardiology', label: 'Cardiology' },
                  { value: 'Neurology', label: 'Neurology' },
                  { value: 'Orthopedics', label: 'Orthopedics' },
                ]} />
                <Select label="Doctor" options={[
                  { value: '', label: 'Select Doctor' },
                  { value: 'Dr. Emily Chen', label: 'Dr. Emily Chen' },
                  { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
                ]} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Date" type="date" />
                <Select label="Time Slot" options={[
                  { value: '', label: 'Select Time' },
                  { value: '09:00 AM', label: '09:00 AM' },
                  { value: '09:30 AM', label: '09:30 AM' },
                  { value: '10:00 AM', label: '10:00 AM' },
                  { value: '10:30 AM', label: '10:30 AM' },
                ]} />
              </div>
              <Select label="Appointment Type" options={[
                { value: '', label: 'Select Type' },
                { value: 'Checkup', label: 'Checkup' },
                { value: 'Consultation', label: 'Consultation' },
                { value: 'Follow-up', label: 'Follow-up' },
              ]} />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddAppointment(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddAppointment(false)}>
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceptionistDashboard;
