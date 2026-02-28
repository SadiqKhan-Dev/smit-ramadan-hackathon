import React, { useState } from 'react';
import { Sidebar, SidebarLayout, useSidebar } from '../components/layout/Sidebar';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

/**
 * Sidebar Showcase Page
 * Demonstrates the collapsible sidebar with different roles
 */
export function SidebarShowcase() {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const roleDescriptions = {
    admin: {
      title: 'Administrator',
      description: 'Full access to all system features',
      color: 'blue'
    },
    doctor: {
      title: 'Doctor',
      description: 'Clinical and patient management',
      color: 'green'
    },
    receptionist: {
      title: 'Receptionist',
      description: 'Front desk and appointments',
      color: 'purple'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role Selector Banner */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sidebar Component Showcase</h1>
            <p className="text-sm text-gray-500 mt-1">
              Test different role-based menu configurations
            </p>
          </div>
          <div className="flex items-center gap-2">
            {Object.entries(roleDescriptions).map(([role, config]) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedRole === role
                    ? `bg-${config.color}-600 text-white shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {config.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <SidebarWrapper
          userRole={selectedRole}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />

        {/* Content Area */}
        <div className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="p-6 space-y-6">
            {/* Current Role Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-${roleDescriptions[selectedRole].color}-100`}>
                    <Badge variant={roleDescriptions[selectedRole].color} size="lg">
                      {roleDescriptions[selectedRole].title}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {roleDescriptions[selectedRole].title} View
                    </h2>
                    <p className="text-sm text-gray-500">
                      {roleDescriptions[selectedRole].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sidebar Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Collapsible', desc: 'Toggle between expanded (256px) and collapsed (80px) states' },
                    { title: 'Role-Based Menu', desc: 'Different navigation items based on user role' },
                    { title: 'Active Highlight', desc: 'Current page highlighted with blue background' },
                    { title: 'Smooth Hover', desc: 'Subtle hover effects on all menu items' },
                    { title: 'Responsive', desc: 'Mobile drawer with overlay backdrop' },
                    { title: 'Persistent State', desc: 'Collapse state saved to localStorage' },
                    { title: 'Grouped Navigation', desc: 'Menu items organized by category' },
                    { title: 'Tooltip Support', desc: 'Item names shown as tooltips when collapsed' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Page Display */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Current Page</h3>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">
                    Active Route: <span className="font-mono bg-white px-2 py-1 rounded">{currentPage}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Usage Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Usage</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                  <code>{`// Basic Usage
import { SidebarLayout } from './components/layout/Sidebar';

function App() {
  return (
    <SidebarLayout userRole="admin">
      <YourContent />
    </SidebarLayout>
  );
}

// With Hook
import { useSidebar } from './components/layout/Sidebar';

function MyComponent() {
  const { collapsed, setCollapsed, currentPage, setCurrentPage } = useSidebar();
  
  return <div>...</div>;
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component to use Sidebar without context
function SidebarWrapper({ userRole, currentPage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-full">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        userRole={userRole}
      />
    </div>
  );
}

export default SidebarShowcase;
