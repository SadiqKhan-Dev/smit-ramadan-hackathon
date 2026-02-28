import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronDown,
  Mail,
  HelpCircle,
  Moon,
  Maximize2
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function TopNavbar({ onMenuClick, title }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'New appointment request', time: '5 min ago', unread: true },
    { id: 2, title: 'Lab results ready for Patient #1234', time: '1 hour ago', unread: true },
    { id: 3, title: 'Dr. Sarah completed consultation', time: '2 hours ago', unread: false },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Search */}
        <div className="hidden md:block max-w-md flex-1">
          <Input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            icon={Search}
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        {/* Help */}
        <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>

        {/* Theme Toggle */}
        <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Moon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Fullscreen */}
        <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Maximize2 className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <span className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                    Mark all read
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${notif.unread ? 'bg-blue-50/50' : ''}`}
                    >
                      <p className="text-sm text-gray-900 font-medium">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700 w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Messages */}
        <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Mail className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Avatar name="Dr. John Smith" size="md" />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-gray-900">Dr. John Smith</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
          </button>

          {showProfile && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfile(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Dr. John Smith</p>
                  <p className="text-xs text-gray-500">john.smith@clinicpro.com</p>
                </div>
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    My Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Account Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Activity Log
                  </a>
                </div>
                <div className="py-2 border-t border-gray-100">
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Sign out
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
