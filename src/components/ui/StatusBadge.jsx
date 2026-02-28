import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock, X } from 'lucide-react';

/**
 * StatusBadge Component
 * Color-coded status indicator with optional dot and icon
 */
export function StatusBadge({
  status,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
  icon = false,
  children,
}) {
  const variants = {
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      dot: 'bg-gray-500',
      border: 'border-gray-200',
    },
    primary: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
      border: 'border-blue-200',
    },
    success: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      dot: 'bg-green-500',
      border: 'border-green-200',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      dot: 'bg-yellow-500',
      border: 'border-yellow-200',
    },
    danger: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
      border: 'border-red-200',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      dot: 'bg-purple-500',
      border: 'border-purple-200',
    },
    cyan: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-700',
      dot: 'bg-cyan-500',
      border: 'border-cyan-200',
    },
  };

  const config = variants[variant] || variants.default;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const icons = {
    success: CheckCircle,
    danger: XCircle,
    warning: AlertCircle,
    primary: Clock,
  };

  const StatusIcon = icon ? icons[variant] : null;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full
        ${config.bg}
        ${config.text}
        ${sizes[size]}
        ${className}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      {StatusIcon && <StatusIcon className="w-3 h-3" />}
      {children || status}
    </span>
  );
}

/**
 * getStatusConfig helper function
 * Returns the appropriate variant based on status string
 */
export function getStatusConfig(status) {
  const config = {
    active: 'success',
    inactive: 'default',
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'danger',
    completed: 'success',
    'in-progress': 'warning',
    'checked-in': 'success',
    waiting: 'warning',
    'no-show': 'danger',
    available: 'success',
    busy: 'warning',
    'on-leave': 'default',
  };
  return config[status?.toLowerCase()] || 'default';
}

/**
 * StatusBadgeWithAuto variant
 * Automatically determines color based on status string
 */
export function StatusBadgeAuto({ status, size = 'md', className = '', dot = false }) {
  const variant = getStatusConfig(status);
  return (
    <StatusBadge variant={variant} size={size} className={className} dot={dot}>
      {status}
    </StatusBadge>
  );
}

export default StatusBadge;
