import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCog,
  Stethoscope,
  FileText, 
  Settings, 
  Bell,
  Search,
  Menu,
  ChevronDown,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Filter,
  Download,
  Activity,
  PieChart,
  BarChart3,
  LogOut,
  Shield,
  Mail,
  Phone,
  MapPin,
  Award
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
  { title: 'Total Doctors', value: '24', change: '+3 this month', trend: 'up', icon: Stethoscope, color: 'blue' },
  { title: 'Total Patients', value: '2,847', change: '+156 this month', trend: 'up', icon: Users, color: 'green' },
  { title: 'Total Revenue', value: '$128,450', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'purple' },
  { title: 'Active Appointments', value: '48', change: 'Today', trend: 'stable', icon: Calendar, color: 'orange' },
];

const doctorsData = [
  { id: 1, name: 'Dr. Emily Chen', specialty: 'Cardiology', email: 'emily.chen@clinicpro.com', phone: '+1 (555) 123-4567', experience: '12 years', patients: 1247, rating: 4.9, status: 'active', joined: 'Jan 2022' },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Endocrinology', email: 'james.wilson@clinicpro.com', phone: '+1 (555) 234-5678', experience: '15 years', patients: 1589, rating: 4.8, status: 'active', joined: 'Mar 2021' },
  { id: 3, name: 'Dr. Sarah Lee', specialty: 'Cardiology', email: 'sarah.lee@clinicpro.com', phone: '+1 (555) 345-6789', experience: '8 years', patients: 892, rating: 4.9, status: 'active', joined: 'Jun 2023' },
  { id: 4, name: 'Dr. Michael Chang', specialty: 'Orthopedics', email: 'michael.chang@clinicpro.com', phone: '+1 (555) 456-7890', experience: '20 years', patients: 2156, rating: 4.7, status: 'active', joined: 'Sep 2020' },
  { id: 5, name: 'Dr. Amanda Roberts', specialty: 'Neurology', email: 'amanda.roberts@clinicpro.com', phone: '+1 (555) 567-8901', experience: '10 years', patients: 1034, rating: 4.8, status: 'inactive', joined: 'Feb 2022' },
];

const receptionistsData = [
  { id: 1, name: 'Jane Smith', email: 'jane.smith@clinicpro.com', phone: '+1 (555) 111-2222', shift: 'Morning', status: 'active', joined: 'Jan 2023' },
  { id: 2, name: 'Robert Johnson', email: 'robert.j@clinicpro.com', phone: '+1 (555) 222-3333', shift: 'Afternoon', status: 'active', joined: 'Mar 2023' },
  { id: 3, name: 'Maria Garcia', email: 'maria.g@clinicpro.com', phone: '+1 (555) 333-4444', shift: 'Evening', status: 'active', joined: 'May 2023' },
  { id: 4, name: 'David Lee', email: 'david.l@clinicpro.com', phone: '+1 (555) 444-5555', shift: 'Morning', status: 'inactive', joined: 'Aug 2023' },
];

const patientsData = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', lastVisit: 'Feb 28, 2024', totalVisits: 12, status: 'active' },
  { id: 'P002', name: 'Michael Brown', age: 45, phone: '+1 (555) 234-5678', email: 'michael.b@email.com', lastVisit: 'Feb 27, 2024', totalVisits: 8, status: 'active' },
  { id: 'P003', name: 'Emma Davis', age: 28, phone: '+1 (555) 345-6789', email: 'emma.d@email.com', lastVisit: 'Feb 26, 2024', totalVisits: 5, status: 'active' },
  { id: 'P004', name: 'Robert Miller', age: 52, phone: '+1 (555) 456-7890', email: 'robert.m@email.com', lastVisit: 'Feb 25, 2024', totalVisits: 15, status: 'inactive' },
  { id: 'P005', name: 'Lisa Anderson', age: 38, phone: '+1 (555) 567-8901', email: 'lisa.a@email.com', lastVisit: 'Feb 24, 2024', totalVisits: 7, status: 'active' },
];

// Analytics Data
const monthlyAppointments = [
  { month: 'Jan', count: 450, revenue: 42000 },
  { month: 'Feb', count: 520, revenue: 48000 },
  { month: 'Mar', count: 480, revenue: 45000 },
  { month: 'Apr', count: 610, revenue: 58000 },
  { month: 'May', count: 580, revenue: 54000 },
  { month: 'Jun', count: 720, revenue: 68000 },
];

const departmentDistribution = [
  { department: 'Cardiology', patients: 450, color: 'bg-blue-500' },
  { department: 'Neurology', patients: 320, color: 'bg-purple-500' },
  { department: 'Orthopedics', patients: 280, color: 'bg-green-500' },
  { department: 'Pediatrics', patients: 380, color: 'bg-yellow-500' },
  { department: 'General', patients: 520, color: 'bg-orange-500' },
];

const weeklyActivity = [
  { day: 'Mon', appointments: 85, completed: 78 },
  { day: 'Tue', appointments: 92, completed: 88 },
  { day: 'Wed', appointments: 78, completed: 72 },
  { day: 'Thu', appointments: 105, completed: 98 },
  { day: 'Fri', appointments: 88, completed: 82 },
  { day: 'Sat', appointments: 45, completed: 42 },
  { day: 'Sun', appointments: 22, completed: 20 },
];

const statusConfig = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'default', label: 'Inactive' },
};

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddReceptionist, setShowAddReceptionist] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'doctors':
        return <DoctorManagement onAdd={() => setShowAddDoctor(true)} />;
      case 'receptionists':
        return <ReceptionistManagement onAdd={() => setShowAddReceptionist(true)} />;
      case 'patients':
        return <PatientManagement />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight">ClinicPro</span>
              <span className="text-slate-400 text-xs">Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 144px)' }}>
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
          {[
            { name: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
            { name: 'Manage Doctors', icon: Stethoscope, section: 'doctors' },
            { name: 'Manage Receptionists', icon: UserCog, section: 'receptionists' },
            { name: 'Manage Patients', icon: Users, section: 'patients' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeSection === item.section
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}

          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">Analysis</p>
          {[
            { name: 'Analytics', icon: BarChart3, section: 'analytics' },
            { name: 'Settings', icon: Settings, section: 'settings' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.section)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeSection === item.section
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
            <h1 className="text-xl font-bold text-gray-900 capitalize">{activeSection.replace('-', ' ')}</h1>
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
                <Avatar name="Admin User" size="md" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Add Doctor Modal */}
      {showAddDoctor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Add New Doctor</h2>
              <button
                onClick={() => setShowAddDoctor(false)}
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
                <Input label="Email" type="email" placeholder="john.doe@clinicpro.com" />
                <Input label="Phone" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="Specialty" options={[
                  { value: '', label: 'Select Specialty' },
                  { value: 'Cardiology', label: 'Cardiology' },
                  { value: 'Neurology', label: 'Neurology' },
                  { value: 'Orthopedics', label: 'Orthopedics' },
                  { value: 'Pediatrics', label: 'Pediatrics' },
                ]} />
                <Input label="Experience" placeholder="10 years" />
              </div>
              <Input label="Education" placeholder="MD, University Name" />
              <Select label="Status" options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]} />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddDoctor(false)}>Cancel</Button>
              <Button onClick={() => setShowAddDoctor(false)}>Add Doctor</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Receptionist Modal */}
      {showAddReceptionist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Add New Receptionist</h2>
              <button
                onClick={() => setShowAddReceptionist(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Jane" />
                <Input label="Last Name" placeholder="Smith" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" type="email" placeholder="jane.smith@clinicpro.com" />
                <Input label="Phone" placeholder="+1 (555) 000-0000" />
              </div>
              <Select label="Shift" options={[
                { value: 'Morning', label: 'Morning (8AM - 4PM)' },
                { value: 'Afternoon', label: 'Afternoon (12PM - 8PM)' },
                { value: 'Evening', label: 'Evening (4PM - 12AM)' },
              ]} />
              <Select label="Status" options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]} />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddReceptionist(false)}>Cancel</Button>
              <Button onClick={() => setShowAddReceptionist(false)}>Add Receptionist</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : stat.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : null}
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-12">{day.day}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(day.appointments / 120) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(day.completed / 120) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-right">{day.completed}/{day.appointments}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Completed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Distribution by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentDistribution.map((dept, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                  <span className="text-sm font-medium text-gray-700 w-24">{dept.department}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${dept.color} rounded-full`}
                      style={{ width: `${(dept.patients / 600) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{dept.patients}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <Button variant="ghost" size="sm" icon={Download}>Export</Button>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyAppointments.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center">
                  <div
                    className="w-full max-w-[60px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(data.revenue / 70000) * 200}px` }}
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-medium text-gray-500">{data.month}</span>
                  <p className="text-xs text-gray-400">${(data.revenue / 1000).toFixed(0)}k</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { activity: 'New doctor registered', user: 'Admin', time: '5 mins ago', status: 'success' },
                { activity: 'Patient record updated', user: 'Dr. Emily Chen', time: '15 mins ago', status: 'success' },
                { activity: 'Appointment cancelled', user: 'Jane Smith', time: '1 hour ago', status: 'warning' },
                { activity: 'Payment processed', user: 'System', time: '2 hours ago', status: 'success' },
              ].map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.activity}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell className="text-gray-500">{item.time}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'success' ? 'success' : 'warning'} size="sm">
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Doctor Management Component
function DoctorManagement({ onAdd }) {
  const [filterStatus, setFilterStatus] = useState('');

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search doctors..."
            icon={Search}
            className="w-64"
          />
          <Select
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            icon={Filter}
          />
        </div>
        <Button icon={Plus} onClick={onAdd}>Add Doctor</Button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {doctorsData.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar name={doctor.name} size="xl" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                    <Badge variant="primary" size="sm" className="mt-1">{doctor.specialty}</Badge>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {doctor.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={statusConfig[doctor.status]?.variant || 'default'}
                  size="sm"
                  dot
                >
                  {statusConfig[doctor.status]?.label || doctor.status}
                </Badge>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{doctor.patients}</p>
                  <p className="text-xs text-gray-500">Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{doctor.experience}</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg font-bold text-gray-900">{doctor.rating}</span>
                    <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" icon={Eye}>View</Button>
                <Button variant="ghost" size="sm" icon={Edit}>Edit</Button>
                <Button variant="ghost" size="sm" icon={Trash2} className="text-red-600 hover:text-red-700">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Receptionist Management Component
function ReceptionistManagement({ onAdd }) {
  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search receptionists..."
            icon={Search}
            className="w-64"
          />
          <Select
            options={[
              { value: '', label: 'All Shifts' },
              { value: 'Morning', label: 'Morning' },
              { value: 'Afternoon', label: 'Afternoon' },
              { value: 'Evening', label: 'Evening' },
            ]}
            icon={Filter}
          />
        </div>
        <Button icon={Plus} onClick={onAdd}>Add Receptionist</Button>
      </div>

      {/* Receptionists Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receptionistsData.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={rec.name} size="sm" />
                      <span className="font-medium text-gray-900">{rec.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-600">{rec.email}</span>
                      <span className="text-xs text-gray-500">{rec.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="primary" size="sm">{rec.shift}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{rec.joined}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[rec.status]?.variant || 'default'}
                      size="sm"
                      dot
                    >
                      {statusConfig[rec.status]?.label || rec.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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
    </div>
  );
}

// Patient Management Component
function PatientManagement() {
  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search patients..."
            icon={Search}
            className="w-64"
          />
          <Select
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            icon={Filter}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={Download}>Export</Button>
          <Button icon={Plus}>Add Patient</Button>
        </div>
      </div>

      {/* Patients Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientsData.map((patient) => (
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
                      <span className="text-sm text-gray-600">{patient.phone}</span>
                      <span className="text-xs text-gray-500">{patient.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="primary" size="sm">{patient.totalVisits} visits</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[patient.status]?.variant || 'default'}
                      size="sm"
                      dot
                    >
                      {statusConfig[patient.status]?.label || patient.status}
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
    </div>
  );
}

// Analytics Section Component
function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">3,360</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +12.5% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$315,000</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +18.2% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Patients</p>
                <p className="text-2xl font-bold text-gray-900">486</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +8.4% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +2.1% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-4">
              {monthlyAppointments.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <div
                      className="w-full max-w-[50px] bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-cyan-500"
                      style={{ height: `${(data.count / 800) * 200}px` }}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-medium text-gray-500">{data.month}</span>
                    <p className="text-xs text-gray-400">{data.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Distribution by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              {/* Pie Chart Visualization */}
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {departmentDistribution.reduce((acc, dept, index) => {
                    const total = departmentDistribution.reduce((sum, d) => sum + d.patients, 0);
                    const percentage = (dept.patients / total) * 100;
                    const offset = acc.offset;
                    const circumference = 2 * Math.PI * 40;
                    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((offset / 100) * circumference);
                    
                    const colors = ['#3b82f6', '#a855f7', '#22c55e', '#eab308', '#f97316'];
                    
                    acc.elements.push(
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={colors[index]}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500"
                      />
                    );
                    acc.offset += percentage;
                    return acc;
                  }, { elements: [], offset: 0 }).elements}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">1,950</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {departmentDistribution.map((dept, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                    <span className="text-sm text-gray-600 flex-1">{dept.department}</span>
                    <span className="text-sm font-semibold text-gray-900">{dept.patients}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { department: 'Cardiology', revenue: 42500, target: 40000, color: 'blue' },
              { department: 'Neurology', revenue: 35200, target: 35000, color: 'purple' },
              { department: 'Orthopedics', revenue: 52800, target: 45000, color: 'green' },
              { department: 'Pediatrics', revenue: 28400, target: 30000, color: 'yellow' },
              { department: 'General Medicine', revenue: 68500, target: 60000, color: 'orange' },
            ].map((dept, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-32">{dept.department}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${dept.color}-500 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min((dept.revenue / dept.target) * 100, 100)}%` }}
                  />
                </div>
                <div className="w-24 text-right">
                  <p className="text-sm font-semibold text-gray-900">${(dept.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">Target: ${(dept.target / 1000).toFixed(1)}k</p>
                </div>
                <div className="w-16 text-right">
                  <Badge 
                    variant={dept.revenue >= dept.target ? 'success' : 'warning'} 
                    size="sm"
                  >
                    {((dept.revenue / dept.target) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Section Component
function SettingsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Clinic Name" defaultValue="ClinicPro Medical Center" />
            <Input label="Contact Email" defaultValue="contact@clinicpro.com" />
          </div>
          <Input label="Phone Number" defaultValue="+1 (555) 000-0000" />
          <Input label="Address" defaultValue="123 Medical Plaza, Healthcare City, HC 12345" />
          <div className="flex items-center justify-between py-4 border-t border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
            </div>
            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
          <div className="flex items-center justify-between py-4 border-t border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative">
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
