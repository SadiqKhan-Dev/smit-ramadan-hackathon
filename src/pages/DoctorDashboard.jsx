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
  History,
  Pill,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
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
  { title: 'Total Patients', value: '847', change: '+12%', icon: Users, color: 'blue' },
  { title: "Today's Appointments", value: '18', change: '4 pending', icon: Calendar, color: 'purple' },
  { title: 'Completed', value: '12', change: 'Today', icon: CheckCircle, color: 'green' },
  { title: 'Pending', value: '6', change: 'Needs attention', icon: AlertCircle, color: 'orange' },
];

const patientsData = [
  { id: 1, name: 'Sarah Johnson', age: 34, lastVisit: 'Feb 28, 2024', condition: 'Hypertension', nextVisit: 'Mar 15, 2024' },
  { id: 2, name: 'Michael Brown', age: 45, lastVisit: 'Feb 27, 2024', condition: 'Diabetes Type 2', nextVisit: 'Mar 10, 2024' },
  { id: 3, name: 'Emma Davis', age: 28, lastVisit: 'Feb 26, 2024', condition: 'Migraine', nextVisit: 'Apr 1, 2024' },
  { id: 4, name: 'Robert Miller', age: 52, lastVisit: 'Feb 25, 2024', condition: 'Cardiac Arrhythmia', nextVisit: 'Mar 5, 2024' },
  { id: 5, name: 'Lisa Anderson', age: 38, lastVisit: 'Feb 24, 2024', condition: 'Asthma', nextVisit: 'Mar 20, 2024' },
];

const appointmentsData = [
  { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', type: 'Follow-up', status: 'completed' },
  { id: 2, patient: 'Michael Brown', time: '09:45 AM', type: 'Consultation', status: 'completed' },
  { id: 3, patient: 'Emma Davis', time: '10:30 AM', type: 'Checkup', status: 'in-progress' },
  { id: 4, patient: 'Robert Miller', time: '11:15 AM', type: 'Follow-up', status: 'pending' },
  { id: 5, patient: 'Lisa Anderson', time: '02:00 PM', type: 'Consultation', status: 'pending' },
  { id: 6, patient: 'James Wilson', time: '02:45 PM', type: 'Checkup', status: 'pending' },
];

const recentActivity = [
  { id: 1, type: 'prescription', message: 'Prescribed medication to Sarah Johnson', time: '10 mins ago', icon: Pill },
  { id: 2, type: 'appointment', message: 'Completed consultation with Michael Brown', time: '25 mins ago', icon: CheckCircle },
  { id: 3, type: 'note', message: 'Added clinical notes for Emma Davis', time: '1 hour ago', icon: FileText },
  { id: 4, type: 'message', message: 'Received message from Lisa Anderson', time: '2 hours ago', icon: MessageSquare },
  { id: 5, type: 'appointment', message: 'Appointment scheduled with Robert Miller', time: '3 hours ago', icon: Calendar },
];

const statusConfig = {
  completed: { variant: 'success', label: 'Completed' },
  'in-progress': { variant: 'warning', label: 'In Progress' },
  pending: { variant: 'default', label: 'Pending' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
};

export function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <span className="text-slate-400 text-xs">Doctor Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'My Patients', icon: Users, active: false },
            { name: 'Appointments', icon: Calendar, active: false },
            { name: 'Prescriptions', icon: FileText, active: false },
            { name: 'Messages', icon: MessageSquare, active: false },
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
              <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome back, Dr. Emily Chen</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search patients..."
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
                <Avatar name="Dr. Emily Chen" size="md" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">Dr. Emily Chen</p>
                  <p className="text-xs text-gray-500">Cardiology</p>
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

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Appointments */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">6 appointments scheduled</p>
                </div>
                <Button icon={Plus} size="sm">Quick Add</Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Patient</TableHead>
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
                            <span className="font-medium text-gray-900">{apt.patient}</span>
                          </div>
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
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Latest updates</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'prescription' ? 'bg-blue-100' :
                          activity.type === 'appointment' ? 'bg-green-100' :
                          activity.type === 'message' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <activity.icon className={`w-4 h-4 ${
                            activity.type === 'prescription' ? 'text-blue-600' :
                            activity.type === 'appointment' ? 'text-green-600' :
                            activity.type === 'message' ? 'text-purple-600' : 'text-gray-600'
                          }`} />
                        </div>
                        {index < recentActivity.length - 1 && (
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2" size="sm">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* My Patients Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>My Patients</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Recent patient records</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm" icon={History}>
                  View All
                </Button>
                <Button size="sm" icon={Plus}>
                  Add Patient
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Visit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
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
                        <Badge variant="primary" size="sm">{patient.condition}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{patient.nextVisit}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="secondary" size="sm">View History</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">New Prescription</p>
                    <p className="text-xs text-gray-500">Create quickly</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Schedule Appointment</p>
                    <p className="text-xs text-gray-500">Book patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lab Results</p>
                    <p className="text-xs text-gray-500">View reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Messages</p>
                    <p className="text-xs text-gray-500">3 unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;
