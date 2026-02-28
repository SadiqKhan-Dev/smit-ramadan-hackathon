import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Phone,
  Mail,
  User,
  Stethoscope
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

const appointmentsData = [
  { id: 1, patient: 'Sarah Johnson', patientId: 'P001', doctor: 'Dr. Emily Chen', department: 'Cardiology', date: '2024-03-01', time: '09:00 AM', duration: '30 min', type: 'Checkup', status: 'confirmed', notes: 'Regular follow-up' },
  { id: 2, patient: 'Michael Brown', patientId: 'P002', doctor: 'Dr. James Wilson', department: 'Endocrinology', date: '2024-03-01', time: '09:30 AM', duration: '45 min', type: 'Consultation', status: 'in-progress', notes: 'Diabetes management' },
  { id: 3, patient: 'Emma Davis', patientId: 'P003', doctor: 'Dr. Emily Chen', department: 'Neurology', date: '2024-03-01', time: '10:30 AM', duration: '30 min', type: 'Follow-up', status: 'pending', notes: 'Migraine treatment review' },
  { id: 4, patient: 'Robert Miller', patientId: 'P004', doctor: 'Dr. Sarah Lee', department: 'Cardiology', date: '2024-03-01', time: '11:00 AM', duration: '60 min', type: 'Surgery Consult', status: 'pending', notes: 'Pre-surgical evaluation' },
  { id: 5, patient: 'Lisa Anderson', patientId: 'P005', doctor: 'Dr. James Wilson', department: 'Pulmonology', date: '2024-03-01', time: '02:00 PM', duration: '30 min', type: 'Checkup', status: 'pending', notes: 'Asthma checkup' },
  { id: 6, patient: 'James Wilson', patientId: 'P006', doctor: 'Dr. Michael Chang', department: 'Orthopedics', date: '2024-03-01', time: '02:30 PM', duration: '45 min', type: 'Therapy', status: 'pending', notes: 'Physical therapy session' },
  { id: 7, patient: 'Jennifer Martinez', patientId: 'P007', doctor: 'Dr. Emily Chen', department: 'Psychiatry', date: '2024-03-01', time: '03:30 PM', duration: '60 min', type: 'Therapy', status: 'pending', notes: 'Counseling session' },
  { id: 8, patient: 'David Thompson', patientId: 'P008', doctor: 'Dr. Sarah Lee', department: 'Orthopedics', date: '2024-03-01', time: '04:00 PM', duration: '30 min', type: 'Follow-up', status: 'cancelled', notes: 'Lower back pain review' },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

const doctors = [
  { value: '', label: 'All Doctors' },
  { value: 'Dr. Emily Chen', label: 'Dr. Emily Chen' },
  { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
  { value: 'Dr. Sarah Lee', label: 'Dr. Sarah Lee' },
  { value: 'Dr. Michael Chang', label: 'Dr. Michael Chang' },
];

const departments = [
  { value: '', label: 'All Departments' },
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Endocrinology', label: 'Endocrinology' },
  { value: 'Pulmonology', label: 'Pulmonology' },
  { value: 'Psychiatry', label: 'Psychiatry' },
];

const appointmentTypes = [
  { value: '', label: 'All Types' },
  { value: 'Checkup', label: 'Checkup' },
  { value: 'Consultation', label: 'Consultation' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Therapy', label: 'Therapy' },
  { value: 'Surgery Consult', label: 'Surgery Consult' },
];

const statusConfig = {
  confirmed: { variant: 'success', icon: CheckCircle, label: 'Confirmed' },
  'in-progress': { variant: 'warning', icon: Clock, label: 'In Progress' },
  pending: { variant: 'default', icon: AlertCircle, label: 'Pending' },
  cancelled: { variant: 'danger', icon: XCircle, label: 'Cancelled' },
  completed: { variant: 'success', icon: CheckCircle, label: 'Completed' },
};

export function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-03-01');

  const filteredAppointments = appointmentsData.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctor = !doctorFilter || apt.doctor === doctorFilter;
    const matchesDepartment = !departmentFilter || apt.department === departmentFilter;
    const matchesType = !typeFilter || apt.type === typeFilter;
    const matchesStatus = !statusFilter || apt.status === statusFilter;
    return matchesSearch && matchesDoctor && matchesDepartment && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-700 border-green-200',
      'in-progress': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 mt-1">Schedule and manage patient appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Calendar
            </button>
          </div>
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Today's Total</p>
                <p className="text-xl font-bold text-gray-900">48</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-100 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">In Progress</p>
                <p className="text-xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 rounded-xl">
                <AlertCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search patient or doctor..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select
                options={doctors}
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                icon={User}
              />
              <Select
                options={departments}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                icon={Stethoscope}
              />
              <Select
                options={appointmentTypes}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                icon={Filter}
              />
              <Select
                options={[
                  { value: '', label: 'All Status' },
                  { value: 'confirmed', label: 'Confirmed' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === 'list' ? (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {filteredAppointments.map((apt) => {
                const StatusIcon = statusConfig[apt.status]?.icon || AlertCircle;
                return (
                  <div
                    key={apt.id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Time */}
                      <div className="text-center min-w-[80px]">
                        <p className="text-lg font-bold text-gray-900">{apt.time.split(' ')[0]}</p>
                        <p className="text-xs text-gray-500">{apt.time.split(' ')[1]}</p>
                      </div>

                      {/* Status Indicator */}
                      <div className={`w-1 h-12 rounded-full ${getStatusColor(apt.status).split(' ')[0]}`} />

                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <Avatar name={apt.patient} size="md" />
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{apt.patient}</p>
                            <p className="text-sm text-gray-500">{apt.type} • {apt.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Doctor & Department */}
                      <div className="hidden md:block w-48">
                        <p className="text-sm font-medium text-gray-900">{apt.doctor}</p>
                        <p className="text-xs text-gray-500">{apt.department}</p>
                      </div>

                      {/* Status Badge */}
                      <div className="hidden sm:block">
                        <Badge variant={statusConfig[apt.status]?.variant || 'default'} size="md">
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[apt.status]?.label || apt.status}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Details */}
                    <div className="mt-3 md:hidden pl-14">
                      <p className="text-sm text-gray-600">{apt.doctor} • {apt.department}</p>
                      <div className="mt-2">
                        <Badge variant={statusConfig[apt.status]?.variant || 'default'} size="sm">
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[apt.status]?.label || apt.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Notes */}
                    {apt.notes && (
                      <div className="mt-3 pl-14">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Notes:</span> {apt.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Calendar View */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>March 2024</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">Today</Button>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center text-sm font-medium text-gray-500 border-r border-gray-100 last:border-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 3;
                const isToday = day === 1;
                const hasAppointments = [1, 5, 8, 12, 15, 20, 22, 28].includes(day);
                const appointmentCount = hasAppointments ? Math.floor(Math.random() * 5) + 1 : 0;

                return (
                  <div
                    key={i}
                    className={`
                      min-h-[100px] p-2 border-b border-r border-gray-100
                      ${day < 1 ? 'bg-gray-50' : 'hover:bg-gray-50'}
                    `}
                  >
                    {day > 0 && day <= 31 && (
                      <>
                        <div className={`
                          w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium
                          ${isToday ? 'bg-blue-600 text-white' : 'text-gray-900'}
                        `}>
                          {day}
                        </div>
                        {hasAppointments && (
                          <div className="mt-1 space-y-1">
                            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded truncate">
                              {appointmentCount} appt
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Schedule Appointment</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Patient Name" placeholder="Search patient..." icon={Search} />
                <Input label="Patient ID" placeholder="P001" />
              </div>
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
                  ...timeSlots.map(t => ({ value: t, label: t })),
                ]} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="Appointment Type" options={[
                  { value: '', label: 'Select Type' },
                  { value: 'Checkup', label: 'Checkup' },
                  { value: 'Consultation', label: 'Consultation' },
                  { value: 'Follow-up', label: 'Follow-up' },
                  { value: 'Therapy', label: 'Therapy' },
                ]} />
                <Input label="Duration" placeholder="30 min" />
              </div>
              <Select label="Status" options={[
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: 'Confirmed' },
              ]} />
              <Input label="Notes" placeholder="Additional notes..." />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
