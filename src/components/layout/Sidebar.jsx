import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  FileText, 
  Settings, 
  Pill,
  CreditCard,
  BarChart3,
  ClipboardList,
  UserCog,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

/**
 * Sidebar Component
 * Professional collapsible sidebar with role-based navigation
 */
export function Sidebar({ 
  currentPage, 
  onNavigate, 
  collapsed, 
  setCollapsed,
  userRole = 'admin',
  logo = { icon: 'C', title: 'ClinicPro', subtitle: 'Management' },
  className = ''
}) {
  const [expandedGroup, setExpandedGroup] = useState(null);

  // Role-based menu configuration
  const menuConfig = {
    admin: [
      {
        group: 'Main',
        items: [
          { name: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
          { name: 'Manage Doctors', icon: Stethoscope, href: 'doctors' },
          { name: 'Manage Receptionists', icon: UserCog, href: 'receptionists' },
          { name: 'Manage Patients', icon: Users, href: 'patients' },
        ]
      },
      {
        group: 'Analysis',
        items: [
          { name: 'Analytics', icon: BarChart3, href: 'analytics' },
          { name: 'Reports', icon: FileText, href: 'reports' },
        ]
      },
      {
        group: 'System',
        items: [
          { name: 'Settings', icon: Settings, href: 'settings' },
        ]
      }
    ],
    doctor: [
      {
        group: 'Clinical',
        items: [
          { name: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
          { name: 'My Patients', icon: Users, href: 'patients' },
          { name: 'Appointments', icon: Calendar, href: 'appointments' },
          { name: 'Prescriptions', icon: Pill, href: 'prescriptions' },
          { name: 'Documents', icon: FileText, href: 'documents' },
        ]
      },
      {
        group: 'System',
        items: [
          { name: 'Settings', icon: Settings, href: 'settings' },
        ]
      }
    ],
    receptionist: [
      {
        group: 'Front Desk',
        items: [
          { name: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
          { name: 'Appointments', icon: Calendar, href: 'appointments' },
          { name: 'Patients', icon: Users, href: 'patients' },
          { name: 'Billing', icon: CreditCard, href: 'billing' },
          { name: 'Documents', icon: FileText, href: 'documents' },
        ]
      },
      {
        group: 'System',
        items: [
          { name: 'Settings', icon: Settings, href: 'settings' },
        ]
      }
    ]
  };

  const menuGroups = menuConfig[userRole] || menuConfig.admin;

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen
        bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}
        ${className}
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <span className="text-white font-bold text-lg">{logo.icon}</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-white font-bold text-lg tracking-tight truncate">{logo.title}</span>
              <span className="text-slate-400 text-xs truncate">{logo.subtitle}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" style={{ height: 'calc(100vh - 144px)' }}>
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {/* Group Header */}
            {!collapsed && (
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {group.group}
                </span>
                {group.items.length > 3 && (
                  <button
                    onClick={() => setExpandedGroup(expandedGroup === groupIndex ? null : groupIndex)}
                    className="p-1 hover:bg-slate-700/50 rounded transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </div>
            )}

            {/* Menu Items */}
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const isActive = currentPage === item.href;
                const Icon = item.icon;
                
                return (
                  <button
                    key={itemIndex}
                    onClick={() => onNavigate(item.href)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200 group relative
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className={`
                      w-5 h-5 flex-shrink-0
                      transition-colors duration-200
                      ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                    `} />
                    
                    {!collapsed && (
                      <>
                        <span className="text-sm font-medium truncate flex-1 text-left">
                          {item.name}
                        </span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                        )}
                      </>
                    )}

                    {/* Active indicator dot for collapsed state */}
                    {collapsed && isActive && (
                      <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section - Logout */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3 border-t border-slate-700/50 bg-slate-800/50">
        <button
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-slate-300 hover:bg-red-500/20 hover:text-red-400
            transition-all duration-200 group
            ${collapsed ? 'justify-center' : ''}
          `}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-3 top-20
          w-6 h-6 rounded-full
          bg-white border-2 border-slate-700
          shadow-lg
          flex items-center justify-center
          hover:bg-slate-50 hover:scale-110
          transition-all duration-200
          group
        "
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-gray-800" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-600 group-hover:text-gray-800" />
        )}
      </button>
    </aside>
  );
}

/**
 * SidebarProvider Component
 * Manages sidebar state and provides context
 */
export function SidebarProvider({ children, defaultCollapsed = false, userRole = 'admin' }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Persist collapse state to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) {
      setCollapsed(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, currentPage, setCurrentPage, userRole }}>
      {children}
    </SidebarContext.Provider>
  );
}

/**
 * SidebarContext for accessing sidebar state
 */
const SidebarContext = React.createContext(null);

/**
 * useSidebar Hook
 * Access sidebar state and methods from anywhere in the app
 */
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

/**
 * SidebarLayout Component
 * Complete layout wrapper with sidebar and content area
 */
export function SidebarLayout({ children, userRole = 'admin' }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userRole={userRole}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 h-full w-64
        bg-gradient-to-b from-slate-900 to-slate-800
        transform transition-transform duration-300 ease-in-out
        lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            setMobileOpen(false);
          }}
          collapsed={false}
          setCollapsed={() => {}}
          userRole={userRole}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
      >
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 px-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-gray-900">ClinicPro</span>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
