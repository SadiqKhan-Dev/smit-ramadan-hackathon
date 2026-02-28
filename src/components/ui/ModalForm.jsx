import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

/**
 * ModalForm Component
 * A reusable modal dialog with form content
 */
export function ModalForm({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isLoading = false,
  size = 'md',
  closeOnSubmit = true,
  showCloseButton = true,
  footerActions,
}) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[90vw]',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (closeOnSubmit) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-white rounded-2xl shadow-2xl
          w-full ${sizes[size]}
          max-h-[90vh] overflow-hidden
          animate-slide-up
        `}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {children}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
            {footerActions}
            <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </Button>
            {onSubmit && (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : submitLabel}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * ConfirmDialog Component
 * A simple confirmation dialog
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) {
  const variants = {
    danger: { button: 'bg-red-600 hover:bg-red-700', icon: 'text-red-600' },
    warning: { button: 'bg-yellow-600 hover:bg-yellow-700', icon: 'text-yellow-600' },
    primary: { button: 'bg-blue-600 hover:bg-blue-700', icon: 'text-blue-600' },
    success: { button: 'bg-green-600 hover:bg-green-700', icon: 'text-green-600' },
  };

  const config = variants[variant] || variants.danger;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full bg-${variant}-100`}>
            <AlertCircle className={`w-6 h-6 ${config.icon}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {message && <p className="text-sm text-gray-500 mt-1">{message}</p>}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
              if (!isLoading) onClose();
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Confirming...' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Import AlertCircle for ConfirmDialog
import { AlertCircle } from 'lucide-react';

export default ModalForm;
