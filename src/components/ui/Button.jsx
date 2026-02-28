import React from 'react';
import { InlineLoader } from './LoadingSpinner';

/**
 * Button Component
 * Production-ready button with multiple variants, sizes, and states
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  as: Component = 'button',
  ...props 
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-500 
      text-white 
      hover:from-blue-700 hover:to-blue-600
      focus:ring-blue-500 
      shadow-sm hover:shadow-md hover:shadow-blue-500/30
      hover:-translate-y-0.5
    `,
    secondary: `
      bg-white 
      text-gray-700 
      border border-gray-300 
      hover:bg-gray-50 
      hover:border-gray-400
      focus:ring-blue-500 
      shadow-sm hover:shadow-md
    `,
    ghost: `
      text-gray-600 
      hover:bg-gray-100 
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-500 
      text-white 
      hover:from-red-700 hover:to-red-600
      focus:ring-red-500 
      shadow-sm hover:shadow-md hover:shadow-red-500/30
      hover:-translate-y-0.5
    `,
    success: `
      bg-gradient-to-r from-green-600 to-green-500 
      text-white 
      hover:from-green-700 hover:to-green-600
      focus:ring-green-500 
      shadow-sm hover:shadow-md hover:shadow-green-500/30
      hover:-translate-y-0.5
    `,
    warning: `
      bg-gradient-to-r from-yellow-500 to-yellow-400 
      text-white 
      hover:from-yellow-600 hover:to-yellow-500
      focus:ring-yellow-500 
      shadow-sm hover:shadow-md
    `,
    outline: `
      bg-transparent 
      text-blue-600 
      border border-blue-600 
      hover:bg-blue-50 
      focus:ring-blue-500
    `,
    link: `
      text-blue-600 
      hover:text-blue-700 
      hover:underline 
      focus:ring-blue-500
      px-2
    `,
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs gap-1.5',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  return (
    <Component
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <InlineLoader size={size === 'sm' ? 'xs' : 'sm'} />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />
      )}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon className="w-4 h-4" />}
    </Component>
  );
}

/**
 * IconButton Component
 * Button with only an icon
 */
export function IconButton({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  badge,
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
  };

  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant] || variants.ghost}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
      <Icon className="w-5 h-5" />
    </button>
  );
}

/**
 * ButtonGroup Component
 * Group of buttons displayed together
 */
export function ButtonGroup({ children, className = '', vertical = false }) {
  return (
    <div
      className={`
        inline-flex 
        ${vertical ? 'flex-col' : 'flex-row'}
        rounded-lg 
        overflow-hidden 
        border border-gray-200
        ${className}
      `}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child, {
          className: `
            ${child.props.className || ''}
            rounded-none
            ${index === 0 ? (vertical ? 'rounded-t-lg' : 'rounded-l-lg') : ''}
            ${index === React.Children.count(children) - 1 ? (vertical ? 'rounded-b-lg' : 'rounded-r-lg') : ''}
            ${index > 0 && index < React.Children.count(children) - 1 ? '' : ''}
            ${vertical ? '' : (index > 0 ? 'border-l border-gray-200' : '')}
            ${vertical && index > 0 ? 'border-t border-gray-200' : ''}
          `.trim(),
        });
      })}
    </div>
  );
}

/**
 * ToggleButton Component
 * Button that can be toggled on/off
 */
export function ToggleButton({
  children,
  icon: Icon,
  pressed = false,
  onChange,
  className = '',
  ...props
}) {
  return (
    <button
      role="switch"
      aria-checked={pressed}
      onClick={() => onChange?.(!pressed)}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        font-medium rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${pressed
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

export default Button;
