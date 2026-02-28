import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Production-ready loading indicator with multiple variants
 */
export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  text,
  className = '',
  overlay = false,
  overlayBg = 'bg-white/80',
  fullscreen = false,
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variants = {
    default: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-400',
    primary: 'text-blue-600',
    success: 'text-green-600',
    danger: 'text-red-600',
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizes[size]} ${variants[variant]} animate-spin`} />
      {text && (
        <p className="text-sm text-gray-500 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBg} backdrop-blur-sm`}>
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * LoadingSkeleton Component
 * Placeholder content while data is loading
 */
export function LoadingSkeleton({ lines = 3, className = '', height = 'h-4' }) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-gray-200 rounded ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          style={{ 
            width: i === lines - 1 ? '75%' : '100%',
            animationDelay: `${i * 100}ms`
          }}
        />
      ))}
    </div>
  );
}

/**
 * CardSkeleton Component
 * Skeleton loader for card components
 */
export function CardSkeleton({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

/**
 * TableSkeleton Component
 * Skeleton loader for table components
 */
export function TableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
            {Array.from({ length: columns - 1 }).map((_, j) => (
              <div key={j} className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PageLoader Component
 * Full page loading state with optional branding
 */
export function PageLoader({ 
  text = 'Loading...', 
  showLogo = true,
  logoSize = 'lg'
}) {
  const logoSizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {showLogo && (
        <div className={`mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 ${logoSizes[logoSize]} flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse`}>
          <span className="text-white font-bold">C</span>
        </div>
      )}
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

/**
 * InlineLoader Component
 * Small inline loader for buttons and small elements
 */
export function InlineLoader({ size = 'sm', className = '' }) {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };

  return (
    <Loader2 className={`${sizes[size]} animate-spin ${className}`} />
  );
}

/**
 * ContentLoader Component
 * Wrapper for content with loading state
 */
export function ContentLoader({ 
  loading, 
  children, 
  skeletonLines = 3,
  className = '' 
}) {
  if (loading) {
    return <LoadingSkeleton lines={skeletonLines} className={className} />;
  }
  return children;
}

/**
 * ImageWithLoader Component
 * Image component with loading state
 */
export function ImageWithLoader({ 
  src, 
  alt, 
  className = '',
  aspectRatio = 'square'
}) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  if (error) {
    return (
      <div className={`${aspectRatios[aspectRatio]} ${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${aspectRatios[aspectRatio]} ${className} relative overflow-hidden rounded-lg bg-gray-100`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

export default LoadingSpinner;
