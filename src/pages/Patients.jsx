import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  FileText,
  Edit,
  Trash2,
  Eye,
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

const patientsData = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, gender: 'Female', phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', address: '123 Main St, New York, NY', bloodGroup: 'A+', lastVisit: '2024-02-28', status: 'active', condition: 'Hypertension' },
  { id: 'P002', name: 'Michael Brown', age: 45, gender: 'Male', phone: '+1 (555) 234-5678', email: 'michael.b@email.com', address: '456 Oak Ave, Los Angeles, CA', bloodGroup: 'O+', lastVisit: '2024-02-27', status: 'active', condition: 'Diabetes Type 2' },
  { id: 'P003', name: 'Emma Davis', age: 28, gender: 'Female', phone: '+1 (555) 345-6789', email: 'emma.d@email.com', address: '789 Pine Rd, Chicago, IL', bloodGroup: 'B+', lastVisit: '2024-02-26', status: 'active', condition: 'Migraine' },
  { id: 'P004', name: 'Robert Miller', age: 52, gender: 'Male', phone: '+1 (555) 456-7890', email: 'robert.m@email.com', address: '321 Elm St, Houston, TX', bloodGroup: 'AB+', lastVisit: '2024-02-25', status: 'inactive', condition: 'Cardiac Arrhythmia' },
  { id: 'P005', name: 'Lisa Anderson', age: 38, gender: 'Female', phone: '+1 (555) 567-8901', email: 'lisa.a@email.com', address: '654 Maple Dr, Phoenix, AZ', bloodGroup: 'O-', lastVisit: '2024-02-24', status: 'active', condition: 'Asthma' },
  { id: 'P006', name: 'James Wilson', age: 61, gender: 'Male', phone: '+1 (555) 678-9012', email: 'james.w@email.com', address: '987 Cedar Ln, Philadelphia, PA', bloodGroup: 'A-', lastVisit: '2024-02-23', status: 'active', condition: 'Arthritis' },
  { id: 'P007', name: 'Jennifer Martinez', age: 29, gender: 'Female', phone: '+1 (555) 789-0123', email: 'jennifer.m@email.com', address: '147 Birch Ct, San Antonio, TX', bloodGroup: 'B-', lastVisit: '2024-02-22', status: 'active', condition: 'Anxiety Disorder' },
  { id: 'P008', name: 'David Thompson', age: 42, gender: 'Male', phone: '+1 (555) 890-1234', email: 'david.t@email.com', address: '258 Walnut Way, San Diego, CA', bloodGroup: 'O+', lastVisit: '2024-02-21', status: 'inactive', condition: 'Lower Back Pain' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const genderOptions = [
  { value: '', label: 'All Genders' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const bloodGroupOptions = [
  { value: '', label: 'All Blood Groups' },
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
];

export function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || patient.status === statusFilter;
    const matchesGender = !genderFilter || patient.gender === genderFilter;
    const matchesBloodGroup = !bloodGroupFilter || patient.bloodGroup === bloodGroupFilter;
    return matchesSearch && matchesStatus && matchesGender && matchesBloodGroup;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">Manage patient records and information</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>
          Add Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Patients</p>
                <p className="text-2xl font-bold text-gray-900">2,421</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointments Today</p>
                <p className="text-2xl font-bold text-gray-900">48</p>
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
                placeholder="Search by name or ID..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                icon={Filter}
              />
              <Select
                options={genderOptions}
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              />
              <Select
                options={bloodGroupOptions}
                value={bloodGroupFilter}
                onChange={(e) => setBloodGroupFilter(e.target.value)}
              />
              <Button variant="secondary" icon={Download}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
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
                      <span className="text-sm font-mono text-gray-600">{patient.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{patient.age} / {patient.gender}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="primary" size="sm">{patient.bloodGroup}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600">{patient.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={patient.status === 'active' ? 'success' : 'default'} size="sm">
                        {patient.condition}
                      </Badge>
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
                    <TableCell>
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
          </div>
        </CardContent>
        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredPatients.length}</span> of{' '}
            <span className="font-medium">{patientsData.length}</span> patients
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled>Previous</Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === 1
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button variant="secondary" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Add New Patient</h2>
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
              <div className="grid grid-cols-2 gap-4">
                <Select label="Blood Group" options={[
                  { value: '', label: 'Select Blood Group' },
                  { value: 'A+', label: 'A+' },
                  { value: 'A-', label: 'A-' },
                  { value: 'B+', label: 'B+' },
                  { value: 'B-', label: 'B-' },
                  { value: 'O+', label: 'O+' },
                  { value: 'O-', label: 'O-' },
                  { value: 'AB+', label: 'AB+' },
                  { value: 'AB-', label: 'AB-' },
                ]} />
                <Input label="Emergency Contact" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
