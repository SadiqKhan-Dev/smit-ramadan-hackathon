import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';

const statsData = [
  {
    title: 'Total Patients',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Appointments Today',
    value: '48',
    change: '+8.2%',
    trend: 'up',
    icon: Calendar,
    color: 'purple',
  },
  {
    title: 'Revenue (MTD)',
    value: '$42,580',
    change: '+15.3%',
    trend: 'up',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Pending Reports',
    value: '12',
    change: '-2.4%',
    trend: 'down',
    icon: Activity,
    color: 'orange',
  },
];

const appointmentsToday = [
  { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', doctor: 'Dr. Emily Chen', type: 'Checkup', status: 'completed' },
  { id: 2, patient: 'Michael Brown', time: '10:30 AM', doctor: 'Dr. James Wilson', type: 'Consultation', status: 'in-progress' },
  { id: 3, patient: 'Emma Davis', time: '11:00 AM', doctor: 'Dr. Emily Chen', type: 'Follow-up', status: 'upcoming' },
  { id: 4, patient: 'Robert Miller', time: '02:00 PM', doctor: 'Dr. Sarah Lee', type: 'Surgery Consult', status: 'upcoming' },
  { id: 5, patient: 'Lisa Anderson', time: '03:30 PM', doctor: 'Dr. James Wilson', type: 'Checkup', status: 'upcoming' },
];

const recentPatients = [
  { id: 1, name: 'Jennifer Martinez', age: 34, condition: 'Hypertension', lastVisit: 'Today', avatar: '' },
  { id: 2, name: 'David Thompson', age: 45, condition: 'Diabetes Type 2', lastVisit: 'Yesterday', avatar: '' },
  { id: 3, name: 'Amanda White', age: 28, condition: 'Migraine', lastVisit: '2 days ago', avatar: '' },
  { id: 4, name: 'Christopher Lee', age: 52, condition: 'Cardiac Arrhythmia', lastVisit: '3 days ago', avatar: '' },
];

const weeklyData = [
  { day: 'Mon', patients: 45, revenue: 8500 },
  { day: 'Tue', patients: 52, revenue: 9800 },
  { day: 'Wed', patients: 38, revenue: 7200 },
  { day: 'Thu', patients: 61, revenue: 11500 },
  { day: 'Fri', patients: 55, revenue: 10200 },
  { day: 'Sat', patients: 28, revenue: 5400 },
  { day: 'Sun', patients: 15, revenue: 2800 },
];

export function Dashboard() {
  const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Dr. John Smith</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`} />
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full max-w-[48px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                      style={{ height: `${(data.revenue / maxRevenue) * 200}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{data.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Patients</p>
                  <p className="text-lg font-bold text-gray-900">294</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Revenue</p>
                  <p className="text-lg font-bold text-gray-900">$55,400</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today's Appointments</CardTitle>
            <Badge variant="primary" size="sm">{appointmentsToday.length} Total</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointmentsToday.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Avatar name={appointment.patient} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{appointment.patient}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {appointment.time}
                    </div>
                    <Badge
                      variant={
                        appointment.status === 'completed' ? 'success' :
                        appointment.status === 'in-progress' ? 'warning' : 'default'
                      }
                      size="sm"
                      className="mt-1"
                    >
                      {appointment.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              View All Appointments
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Patients</CardTitle>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Age</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Condition</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Last Visit</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} size="sm" />
                        <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{patient.age}</td>
                    <td className="py-3 px-4">
                      <Badge variant="primary" size="sm">{patient.condition}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{patient.lastVisit}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Cardiology', patients: 156, revenue: '$28,450', growth: '+18%' },
          { name: 'Neurology', patients: 124, revenue: '$22,180', growth: '+12%' },
          { name: 'Orthopedics', patients: 189, revenue: '$35,620', growth: '+22%' },
          { name: 'Pediatrics', patients: 245, revenue: '$18,940', growth: '+8%' },
          { name: 'Dermatology', patients: 178, revenue: '$24,560', growth: '+15%' },
          { name: 'General Medicine', patients: 312, revenue: '$42,380', growth: '+25%' },
        ].map((dept, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{dept.name}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{dept.patients} patients</p>
                  <p className="text-sm text-gray-600 mt-1">{dept.revenue}</p>
                </div>
                <Badge variant="success" size="sm">{dept.growth}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
