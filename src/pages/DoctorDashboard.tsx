import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  Bell,
  Search,
  Menu,
  ChevronDown,
  Plus,
  FileText,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Pill,
  Stethoscope,
  TrendingUp,
  Eye
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
import { Sidebar } from '../components/layout/Sidebar';
import { 
  CURRENT_DOCTOR, 
  getPatientsByDoctor, 
  getAppointmentsByDoctor,
  getTodayAppointments,
  getDoctorStats,
  getPatientAppointments
} from '../data/mockData';

// Status configuration
const statusConfig = {
  completed: { variant: 'success', label: 'Completed' },
  'in-progress': { variant: 'warning', label: 'In Progress' },
  pending: { variant: 'default', label: 'Pending' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'default', label: 'Inactive' },
};

export function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  // Get current doctor's data ONLY - no cross-access
  const doctorId = CURRENT_DOCTOR.id;
  
  // Filtered data - only this doctor's patients and appointments
  const myPatients = useMemo(() => getPatientsByDoctor(doctorId), [doctorId]);
  const myAppointments = useMemo(() => getAppointmentsByDoctor(doctorId), [doctorId]);
  const todayAppointments = useMemo(() => getTodayAppointments(doctorId), [doctorId]);
  const stats = useMemo(() => getDoctorStats(doctorId), [doctorId]);

  // Filter patients by search term
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return myPatients;
    const search = searchTerm.toLowerCase();
    return myPatients.filter(patient =>
      patient.name.toLowerCase().includes(search) ||
      patient.id.toLowerCase().includes(search) ||
      patient.condition.toLowerCase().includes(search)
    );
  }, [myPatients, searchTerm]);

  // Calculate stats for display
  const statsCards = [
    { 
      title: 'My Patients', 
      value: stats.totalPatients, 
      change: `${stats.activePatients} active`, 
      trend: 'up' as const, 
      icon: Users, 
      color: 'blue' 
    },
    { 
      title: "Today's Appointments", 
      value: stats.todayAppointments, 
      change: `${stats.pendingToday} pending`, 
      trend: 'stable' as const, 
      icon: Calendar, 
      color: 'purple' 
    },
    { 
      title: 'Completed Today', 
      value: stats.completedToday, 
      change: 'Done', 
      trend: 'up' as const, 
      icon: CheckCircle, 
      color: 'green' 
    },
    { 
      title: 'In Progress', 
      value: stats.inProgressToday, 
      change: 'Current', 
      trend: 'stable' as const, 
      icon: Clock, 
      color: 'orange' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage="dashboard"
          onNavigate={() => {}}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          userRole="doctor"
        />
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-xs text-gray-500">
                {CURRENT_DOCTOR.name} • {CURRENT_DOCTOR.specialty}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search my patients..."
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
                <Avatar name={CURRENT_DOCTOR.name} size="md" />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{CURRENT_DOCTOR.name}</p>
                  <p className="text-xs text-gray-500">{CURRENT_DOCTOR.specialty}</p>
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
            {statsCards.map((stat, index) => (
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

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200">
            {[
              { id: 'appointments', label: "Today's Appointments", count: todayAppointments.length },
              { id: 'patients', label: 'My Patients', count: myPatients.length },
              { id: 'history', label: 'Patient History' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="primary" size="sm">{tab.count}</Badge>
                )}
              </button>
            ))}
          </div>

          {/* Today's Appointments Tab */}
          {activeTab === 'appointments' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {todayAppointments.length} appointments scheduled for today
                  </p>
                </div>
                <Button icon={Plus} size="sm">Add Appointment</Button>
              </CardHeader>
              <CardContent className="p-0">
                {todayAppointments.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAppointments.map((apt) => (
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
                                <p className="text-xs text-gray-500">{apt.department}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{apt.type}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{apt.duration}</span>
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
                              <Button variant="ghost" size="sm" icon={FileText}>Notes</Button>
                              {apt.status === 'pending' && (
                                <Button variant="success" size="sm">Start</Button>
                              )}
                              {apt.status === 'in-progress' && (
                                <Button variant="primary" size="sm">Complete</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* My Patients Tab */}
          {activeTab === 'patients' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>My Patients</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {myPatients.length} patients under your care
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search patients..."
                    icon={Search}
                    className="w-48"
                  />
                  <Button icon={Plus}>Add Patient</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age/Sex</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Total Appointments</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => {
                        const patientAppts = getPatientAppointments(patient.id, doctorId);
                        return (
                          <TableRow key={patient.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar name={patient.name} size="sm" />
                                <div>
                                  <p className="font-medium text-gray-900">{patient.name}</p>
                                  <p className="text-xs text-gray-500">{patient.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">
                                {patient.age} / {patient.gender}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="primary" size="sm">{patient.condition}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" size="sm">
                                {patientAppts.length} visits
                              </Badge>
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
                                <Button variant="ghost" size="sm" icon={Eye}>View</Button>
                                <Button variant="ghost" size="sm" icon={FileText}>History</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-12 text-center">
                          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">
                            {searchTerm ? 'No matching patients found' : 'No patients assigned'}
                          </p>
                        </td>
                      </tr>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Patient History Tab */}
          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle>Patient History Timeline</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Recent activities for your patients
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myAppointments.slice(0, 8).map((apt, index) => (
                    <div key={apt.id} className="flex gap-4">
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          apt.status === 'completed' ? 'bg-green-100' :
                          apt.status === 'in-progress' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          <CheckCircle className={`w-4 h-4 ${
                            apt.status === 'completed' ? 'text-green-600' :
                            apt.status === 'in-progress' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                        </div>
                        {index < 7 && (
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{apt.patient}</span>
                          {' '}
                          {apt.status === 'completed' ? 'completed' : apt.status === 'in-progress' ? 'started' : 'scheduled'}
                          {' '}
                          {apt.type.toLowerCase()} appointment
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {apt.date} at {apt.time} • {apt.department}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Pill, title: 'New Prescription', desc: 'Create quickly', color: 'blue' },
              { icon: Calendar, title: 'Schedule Appointment', desc: 'Book patient', color: 'green' },
              { icon: FileText, title: 'Lab Results', desc: 'View reports', color: 'purple' },
              { icon: MessageSquare, title: 'Messages', desc: '3 unread', color: 'orange' },
            ].map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${action.color}-100 rounded-xl`}>
                      <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;
