import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, User, Settings, Shield, X } from 'lucide-react';
import { Avatar } from './Avatar';

/**
 * ProfileDropdown Component
 * User profile menu with avatar and dropdown options
 */
export function ProfileDropdown({
  user,
  menuItems = [],
  onMenuItemClick,
  className = '',
  align = 'right',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const defaultMenuItems = [
    { icon: User, label: 'My Profile', href: '#profile' },
    { icon: Settings, label: 'Settings', href: '#settings' },
    { icon: Shield, label: 'Privacy', href: '#privacy' },
    { icon: LogOut, label: 'Logout', href: '#logout', danger: true },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  const defaultUser = {
    name: 'User Name',
    email: 'user@example.com',
    role: 'User',
    avatar: null,
  };

  const userData = { ...defaultUser, ...user };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Avatar
          src={userData.avatar}
          name={userData.name}
          size="md"
        />
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900">{userData.name}</p>
          <p className="text-xs text-gray-500">{userData.role || userData.email}</p>
        </div>
        <ChevronDown className={`hidden lg:block w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div
            className={`
              absolute top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden
              animate-slide-up
              ${align === 'right' ? 'right-0' : 'left-0'}
            `}
          >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <Avatar src={userData.avatar} name={userData.name} size="md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{userData.name}</p>
                  <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    onMenuItemClick?.(item);
                    if (!item.stayOpen) setIsOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-2 text-sm
                    transition-colors
                    ${item.danger
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className={`w-4 h-4 ${item.danger ? 'text-red-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * NotificationBell Component
 * Notification icon with badge count and dropdown
 */
export function NotificationBell({
  notifications = [],
  badgeCount = 0,
  onNotificationClick,
  onViewAll,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {badgeCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {badgeCount > 0 && (
                <span className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                  Mark all read
                </span>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    onClick={() => onNotificationClick?.(notif)}
                    className={`
                      px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0
                      ${notif.unread ? 'bg-blue-50/50' : ''}
                    `}
                  >
                    <p className="text-sm text-gray-900 font-medium">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">No notifications</p>
                </div>
              )}
            </div>
            {onViewAll && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={onViewAll}
                  className="text-sm text-blue-600 font-medium hover:text-blue-700 w-full text-center"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileDropdown;
