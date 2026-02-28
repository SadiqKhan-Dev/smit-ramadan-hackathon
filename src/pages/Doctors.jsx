import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  Edit,
  Trash2,
  Eye,
  Stethoscope,
  Award,
  Users,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

const doctorsData = [
  { id: 1, name: 'Dr. Emily Chen', specialty: 'Cardiology', email: 'emily.chen@clinicpro.com', phone: '+1 (555) 123-4567', experience: '12 years', patients: 1247, rating: 4.9, status: 'available', image: '', education: 'MD, Harvard Medical School', schedule: 'Mon-Fri, 9AM-5PM' },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Endocrinology', email: 'james.wilson@clinicpro.com', phone: '+1 (555) 234-5678', experience: '15 years', patients: 1589, rating: 4.8, status: 'busy', image: '', education: 'MD, Johns Hopkins', schedule: 'Mon-Sat, 10AM-6PM' },
  { id: 3, name: 'Dr. Sarah Lee', specialty: 'Cardiology', email: 'sarah.lee@clinicpro.com', phone: '+1 (555) 345-6789', experience: '8 years', patients: 892, rating: 4.9, status: 'available', image: '', education: 'MD, Stanford University', schedule: 'Tue-Sat, 8AM-4PM' },
  { id: 4, name: 'Dr. Michael Chang', specialty: 'Orthopedics', email: 'michael.chang@clinicpro.com', phone: '+1 (555) 456-7890', experience: '20 years', patients: 2156, rating: 4.7, status: 'off-duty', image: '', education: 'MD, Yale School of Medicine', schedule: 'Mon-Fri, 9AM-5PM' },
  { id: 5, name: 'Dr. Amanda Roberts', specialty: 'Neurology', email: 'amanda.roberts@clinicpro.com', phone: '+1 (555) 567-8901', experience: '10 years', patients: 1034, rating: 4.8, status: 'available', image: '', education: 'MD, Columbia University', schedule: 'Mon-Thu, 9AM-5PM' },
  { id: 6, name: 'Dr. Robert Taylor', specialty: 'Pediatrics', email: 'robert.taylor@clinicpro.com', phone: '+1 (555) 678-9012', experience: '18 years', patients: 1876, rating: 4.9, status: 'busy', image: '', education: 'MD, University of Pennsylvania', schedule: 'Mon-Fri, 8AM-4PM' },
  { id: 7, name: 'Dr. Lisa Anderson', specialty: 'Dermatology', email: 'lisa.anderson@clinicpro.com', phone: '+1 (555) 789-0123', experience: '14 years', patients: 1423, rating: 4.8, status: 'available', image: '', education: 'MD, UCLA School of Medicine', schedule: 'Tue-Sat, 10AM-6PM' },
  { id: 8, name: 'Dr. David Martinez', specialty: 'General Medicine', email: 'david.martinez@clinicpro.com', phone: '+1 (555) 890-1234', experience: '22 years', patients: 2543, rating: 4.7, status: 'available', image: '', education: 'MD, Mayo Clinic', schedule: 'Mon-Fri, 9AM-5PM' },
];

const specialties = [
  { value: '', label: 'All Specialties' },
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Endocrinology', label: 'Endocrinology' },
  { value: 'Pediatrics', label: 'Pediatrics' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'General Medicine', label: 'General Medicine' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'off-duty', label: 'Off Duty' },
];

const statusConfig = {
  available: { variant: 'success', label: 'Available' },
  busy: { variant: 'warning', label: 'Busy' },
  'off-duty': { variant: 'default', label: 'Off Duty' },
};

export function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialtyFilter || doctor.specialty === specialtyFilter;
    const matchesStatus = !statusFilter || doctor.status === statusFilter;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-500 mt-1">Manage medical staff and schedules</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
          </div>
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Doctor
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Doctors</p>
                <p className="text-xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 rounded-xl">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Available Now</p>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 rounded-xl">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Specialists</p>
                <p className="text-xl font-bold text-gray-900">18</p>
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
                <p className="text-xs text-gray-500">On Consultation</p>
                <p className="text-xl font-bold text-gray-900">5</p>
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
                placeholder="Search by name or specialty..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select
                options={specialties}
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                icon={Filter}
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              {/* Card Header with Background */}
              <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 relative">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <Avatar name={doctor.name} size="xl" className="ring-4 ring-white" />
                </div>
              </div>
              
              <CardContent className="pt-12 pb-4">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">{doctor.specialty}</p>
                  
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{doctor.rating}</span>
                    <span className="text-sm text-gray-500">({doctor.patients} patients)</span>
                  </div>

                  <Badge
                    variant={statusConfig[doctor.status]?.variant || 'default'}
                    size="sm"
                    className="mt-3"
                    dot
                  >
                    {statusConfig[doctor.status]?.label || doctor.status}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>{doctor.experience}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="truncate">{doctor.schedule}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Specialty</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Experience</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Patients</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Schedule</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={doctor.name} size="md" />
                          <div>
                            <p className="font-medium text-gray-900">{doctor.name}</p>
                            <p className="text-sm text-gray-500">{doctor.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="primary" size="sm">{doctor.specialty}</Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{doctor.experience}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{doctor.patients.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900">{doctor.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{doctor.schedule}</td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={statusConfig[doctor.status]?.variant || 'default'}
                          size="sm"
                          dot
                        >
                          {statusConfig[doctor.status]?.label || doctor.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Add New Doctor</h2>
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
              <Input label="Schedule" placeholder="Mon-Fri, 9AM-5PM" />
              <Select label="Status" options={[
                { value: 'available', label: 'Available' },
                { value: 'busy', label: 'Busy' },
                { value: 'off-duty', label: 'Off Duty' },
              ]} />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>
                Add Doctor
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
