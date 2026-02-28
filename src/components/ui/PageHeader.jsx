import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Avatar } from './Avatar';

/**
 * PageHeader Component
 * Consistent page header with title, subtitle, and actions
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  className = '',
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      <div>
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronDown className="w-4 h-4 rotate-[-90deg]" />}
                <span className={item.href ? 'hover:text-gray-700 cursor-pointer' : ''}>
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-wrap">{actions}</div>
      )}
    </div>
  );
}

export default PageHeader;
