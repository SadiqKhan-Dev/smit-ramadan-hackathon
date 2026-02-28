import React, { useState } from 'react';
import { 
  Users, DollarSign, Calendar, Activity, 
  Plus, Edit, Trash2, Eye, Search, Filter 
} from 'lucide-react';
import {
  DashboardCard,
  DataTable,
  StatusBadge,
  StatusBadgeAuto,
  ModalForm,
  PageHeader,
  LoadingSpinner,
  ErrorAlert,
  ConfirmDialog,
  ProfileDropdown,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
} from '../components/ui/components';

/**
 * Component Showcase Page
 * Demonstrates all reusable components
 */
export function ComponentShowcase() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Sample table data
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status', render: (value) => <StatusBadgeAuto status={value} size="sm" /> },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'pending' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'active' },
  ];

  const filters = [
    { key: 'status', label: 'Status', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <PageHeader
        title="Component Library"
        subtitle="Reusable UI components for Clinic Management System"
        breadcrumb={[
          { label: 'Home', href: '#' },
          { label: 'Components' },
        ]}
        actions={
          <Button icon={Plus} onClick={() => setShowModal(true)}>
            Add New
          </Button>
        }
      />

      {/* Dashboard Cards */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Patients"
            value="2,847"
            change="+12.5%"
            trend="up"
            icon={Users}
            color="blue"
          />
          <DashboardCard
            title="Revenue"
            value="$42,580"
            change="+15.3%"
            trend="up"
            icon={DollarSign}
            color="green"
          />
          <DashboardCard
            title="Appointments"
            value="48"
            change="+8.2%"
            trend="up"
            icon={Calendar}
            color="purple"
          />
          <DashboardCard
            title="Pending Reports"
            value="12"
            change="-2.4%"
            trend="down"
            icon={Activity}
            color="orange"
          />
        </div>
      </section>

      {/* Status Badges */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Badges</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <StatusBadge variant="default">Default</StatusBadge>
              <StatusBadge variant="primary">Primary</StatusBadge>
              <StatusBadge variant="success">Success</StatusBadge>
              <StatusBadge variant="warning">Warning</StatusBadge>
              <StatusBadge variant="danger">Danger</StatusBadge>
              <StatusBadge variant="purple">Purple</StatusBadge>
              <StatusBadge variant="cyan">Cyan</StatusBadge>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <StatusBadge variant="success" dot>Active</StatusBadge>
              <StatusBadge variant="warning" dot>Pending</StatusBadge>
              <StatusBadge variant="danger" dot>Cancelled</StatusBadge>
              <StatusBadge variant="success" dot icon>Completed</StatusBadge>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <StatusBadgeAuto status="active" />
              <StatusBadgeAuto status="pending" />
              <StatusBadgeAuto status="completed" />
              <StatusBadgeAuto status="cancelled" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Alerts */}
      {!dismissed && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
          <div className="space-y-3">
            <ErrorAlert
              type="error"
              title="Error Occurred"
              message="Something went wrong. Please try again."
              onDismiss={() => setDismissed(true)}
            />
            <ErrorAlert
              type="warning"
              title="Warning"
              message="Please review the information before proceeding."
            />
            <ErrorAlert
              type="success"
              title="Success"
              message="Your changes have been saved successfully."
            />
            <ErrorAlert
              type="info"
              title="Information"
              message="New features are available. Check the changelog."
            />
          </div>
        </section>
      )}

      {/* Data Table */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Table</h2>
        <DataTable
          columns={columns}
          data={data}
          searchable
          sortable
          filterable
          filters={filters}
          pagination
          pageSize={5}
          actions={(row) => (
            <>
              <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        />
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Loading States</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-6 flex-wrap">
              <LoadingSpinner size="sm" />
              <LoadingSpinner size="md" />
              <LoadingSpinner size="lg" />
              <LoadingSpinner size="xl" />
              <LoadingSpinner text="Loading..." />
              <Button onClick={() => setLoading(!loading)} variant="secondary">
                Toggle Overlay
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Profile Dropdown */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Dropdown</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <ProfileDropdown
                user={{
                  name: 'Dr. John Smith',
                  email: 'john.smith@clinicpro.com',
                  role: 'Administrator',
                }}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Elements */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Elements</h2>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email" type="email" placeholder="john@example.com" icon={Search} />
            <Select
              label="Department"
              options={[
                { value: '', label: 'Select Department' },
                { value: 'cardiology', label: 'Cardiology' },
                { value: 'neurology', label: 'Neurology' },
                { value: 'orthopedics', label: 'Orthopedics' },
              ]}
            />
          </CardContent>
        </Card>
      </section>

      {/* ModalForm */}
      <ModalForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Item"
        subtitle="Fill in the details below"
        submitLabel="Save"
        onSubmit={(e) => {
          e.preventDefault();
          setShowModal(false);
        }}
      >
        <div className="space-y-4">
          <Input label="Name" placeholder="Enter name" />
          <Input label="Email" type="email" placeholder="Enter email" />
          <Select
            label="Type"
            options={[
              { value: '', label: 'Select type' },
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>
      </ModalForm>

      {/* ConfirmDialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => console.log('Confirmed!')}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />

      {/* Trigger buttons for modals */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button onClick={() => setShowConfirm(true)} variant="danger">
          Show Confirm Dialog
        </Button>
      </div>

      {/* Loading Overlay */}
      {loading && <LoadingSpinner overlay text="Processing..." />}
    </div>
  );
}

export default ComponentShowcase;
