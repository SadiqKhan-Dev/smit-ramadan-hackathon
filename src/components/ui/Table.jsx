import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '' }) {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
}

export function TableRow({ children, className = '', hover = true }) {
  return (
    <tr className={`
      border-b border-gray-100 last:border-0
      ${hover ? 'hover:bg-gray-50 transition-colors' : ''}
      ${className}
    `}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return (
    <th className={`
      px-6 py-3
      text-left text-xs font-semibold text-gray-500 uppercase tracking-wider
      ${className}
    `}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = '' }) {
  return (
    <td className={`
      px-6 py-4
      text-sm text-gray-900
      ${className}
    `}>
      {children}
    </td>
  );
}

export function TableBody({ children, className = '' }) {
  return (
    <tbody className={`bg-white ${className}`}>
      {children}
    </tbody>
  );
}

export function TableFooter({ children, className = '' }) {
  return (
    <tfoot className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      {children}
    </tfoot>
  );
}
