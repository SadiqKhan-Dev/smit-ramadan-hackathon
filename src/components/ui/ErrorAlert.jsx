import React from 'react';
import { AlertCircle, XCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

/**
 * ErrorAlert Component
 * Production-ready alert component for all message types
 */
export function ErrorAlert({
  type = 'error',
  title,
  message,
  onDismiss,
  className = '',
  icon = true,
  variant = 'filled',
}) {
  const variants = {
    error: {
      filled: 'bg-red-50 border-red-200',
      outline: 'bg-white border-red-300',
      subtle: 'bg-red-50/50 border-red-100',
    },
    warning: {
      filled: 'bg-yellow-50 border-yellow-200',
      outline: 'bg-white border-yellow-300',
      subtle: 'bg-yellow-50/50 border-yellow-100',
    },
    success: {
      filled: 'bg-green-50 border-green-200',
      outline: 'bg-white border-green-300',
      subtle: 'bg-green-50/50 border-green-100',
    },
    info: {
      filled: 'bg-blue-50 border-blue-200',
      outline: 'bg-white border-blue-300',
      subtle: 'bg-blue-50/50 border-blue-100',
    },
  };

  const textVariants = {
    error: { title: 'text-red-900', message: 'text-red-700', icon: 'text-red-500' },
    warning: { title: 'text-yellow-900', message: 'text-yellow-700', icon: 'text-yellow-500' },
    success: { title: 'text-green-900', message: 'text-green-700', icon: 'text-green-500' },
    info: { title: 'text-blue-900', message: 'text-blue-700', icon: 'text-blue-500' },
  };

  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    success: CheckCircle,
    info: Info,
  };

  const config = variants[type]?.[variant] || variants.error.filled;
  const textConfig = textVariants[type] || textVariants.error;
  const Icon = icons[type] || icons.error;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border
        animate-slide-up
        ${config}
        ${className}
      `}
      role="alert"
    >
      {icon && (
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textConfig.icon}`} />
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`font-semibold ${textConfig.title}`}>{title}</p>
        )}
        {message && (
          <p className={`mt-1 text-sm ${textConfig.message} ${title ? '' : 'mt-0'}`}>
            {message}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`
            p-1.5 rounded-lg 
            hover:bg-black/5 
            transition-colors
            ${textConfig.icon}
          `}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/**
 * InlineError Component
 * Small inline error message for form fields
 */
export function InlineError({ message, className = '', icon = true }) {
  if (!message) return null;

  return (
    <div className={`mt-1.5 flex items-center gap-1.5 ${className}`}>
      {icon && <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />}
      <p className="text-sm text-red-600 font-medium">{message}</p>
    </div>
  );
}

/**
 * EmptyState Component
 * Beautiful empty state for when there's no data
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
  illustration = 'default',
}) {
  const illustrations = {
    default: (
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {Icon ? (
          <Icon className="w-12 h-12 text-gray-400" />
        ) : (
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
    ),
    search: (
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    ),
    inbox: (
      <div className="w-24 h-24 rounded-full bg-purple-50 flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
    ),
    users: (
      <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`}>
      {illustrations[illustration] || illustrations.default}
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      )}
      {action && (
        <div className="flex items-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

/**
 * ErrorBoundary Component
 * React error boundary for catching and displaying errors
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {this.state.error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Toast Component
 * Notification toast message
 */
export function Toast({
  type = 'info',
  title,
  message,
  onDismiss,
  duration = 5000,
  className = '',
}) {
  React.useEffect(() => {
    if (duration && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const variants = {
    error: { bg: 'bg-red-500', icon: XCircle },
    warning: { bg: 'bg-yellow-500', icon: AlertTriangle },
    success: { bg: 'bg-green-500', icon: CheckCircle },
    info: { bg: 'bg-blue-500', icon: Info },
  };

  const config = variants[type] || variants.info;
  const Icon = config.icon;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl shadow-lg
        bg-white border border-gray-200
        animate-slide-in-right
        max-w-sm
        ${className}
      `}
    >
      <div className={`${config.bg} p-1.5 rounded-lg flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-gray-900 text-sm">{title}</p>}
        {message && <p className="text-sm text-gray-600 mt-0.5">{message}</p>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/**
 * ToastContainer Component
 * Container for managing multiple toasts
 */
export function ToastContainer({ toasts = [], onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={() => onDismiss?.(toast.id)}
        />
      ))}
    </div>
  );
}

export default ErrorAlert;
