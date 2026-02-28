import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { InlineError } from './ErrorAlert';

/**
 * Input Component
 * Production-ready input with validation, icons, and states
 */
export const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  icon: Icon,
  leftElement,
  rightElement,
  clearable = false,
  type = 'text',
  helperText,
  disabled = false,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || '');

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const handleClear = () => {
    setValue('');
    const event = { target: { value: '' } };
    props.onChange?.(event);
  };

  const hasValue = value && value.length > 0;
  const showClear = clearable && hasValue && !disabled;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftElement}
          </div>
        )}
        {Icon && !leftElement && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-2.5
            text-gray-900 placeholder-gray-400
            bg-white border rounded-lg
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            ${(Icon || leftElement) ? 'pl-10' : ''}
            ${rightElement || showClear || isPassword ? 'pr-10' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            ${isFocused && !error ? 'ring-2 ring-blue-200 border-blue-500' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {showClear && !isPassword && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {rightElement && !isPassword && !showClear && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && <InlineError message={error} />}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * TextArea Component
 */
export const TextArea = forwardRef(({ 
  label, 
  error, 
  className = '', 
  rows = 4,
  helperText,
  disabled = false,
  resizable = false,
  maxLength,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || '');

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const remainingChars = maxLength ? maxLength - value.length : null;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={ref}
          rows={rows}
          className={`
            w-full px-4 py-2.5
            text-gray-900 placeholder-gray-400
            bg-white border rounded-lg
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            resize-none
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            ${isFocused && !error ? 'ring-2 ring-blue-200 border-blue-500' : ''}
            ${!resizable ? 'resize-none' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5">
        {error ? (
          <InlineError message={error} />
        ) : helperText ? (
          <p className="text-sm text-gray-500">{helperText}</p>
        ) : (
          <div />
        )}
        {maxLength && (
          <p className={`text-sm ${remainingChars < 0 ? 'text-red-600' : 'text-gray-500'}`}>
            {remainingChars} characters remaining
          </p>
        )}
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

/**
 * Select Component
 */
export const Select = forwardRef(({ 
  label, 
  error, 
  className = '', 
  options = [],
  icon: Icon,
  placeholder = 'Select an option',
  helperText,
  disabled = false,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5
            text-gray-900
            bg-white border rounded-lg
            appearance-none
            cursor-pointer
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            ${isFocused && !error ? 'ring-2 ring-blue-200 border-blue-500' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <InlineError message={error} />}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

/**
 * Checkbox Component
 */
export const Checkbox = forwardRef(({ 
  label, 
  error, 
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  return (
    <label className={`flex items-start gap-3 cursor-pointer group ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        className={`
          w-5 h-5 rounded
          border-gray-300 
          text-blue-600 
          focus:ring-2 focus:ring-blue-200 focus:ring-offset-0
          transition-colors duration-200
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        disabled={disabled}
        {...props}
      />
      {label && (
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

/**
 * Radio Component
 */
export const Radio = forwardRef(({ 
  label, 
  error, 
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  return (
    <label className={`flex items-start gap-3 cursor-pointer group ${className}`}>
      <input
        ref={ref}
        type="radio"
        className={`
          w-5 h-5 rounded-full
          border-gray-300 
          text-blue-600 
          focus:ring-2 focus:ring-blue-200 focus:ring-offset-0
          transition-colors duration-200
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        disabled={disabled}
        {...props}
      />
      {label && (
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

/**
 * Switch Component
 */
export const Switch = forwardRef(({ 
  label, 
  error, 
  className = '',
  disabled = false,
  size = 'md',
  ...props 
}, ref) => {
  const sizes = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  };

  const thumbSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          disabled={disabled}
          {...props}
        />
        <div className={`
          ${sizes[size]} rounded-full
          bg-gray-300
          transition-colors duration-200
          group-hover:bg-gray-400
          has-[:checked]:bg-blue-600
          has-[:checked]:group-hover:bg-blue-700
          has-[:disabled]:bg-gray-200 has-[:disabled]:cursor-not-allowed
        `} />
        <div className={`
          absolute top-0.5 left-0.5
          ${thumbSizes[size]} rounded-full
          bg-white shadow-sm
          transform transition-transform duration-200
          group-has-[:checked]:translate-x-full group-has-[:checked]:-translate-x-[100%]
          has-[:disabled]:bg-gray-400
        `} />
      </div>
      {label && (
        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
      )}
    </label>
  );
});

Switch.displayName = 'Switch';

export default Input;
