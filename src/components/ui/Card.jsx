import React from 'react';

/**
 * Card Component
 * Production-ready card with multiple variants
 */
export function Card({ 
  children, 
  className = '', 
  hover = true,
  clickable = false,
  onClick,
  ...props 
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-gray-200
        ${hover ? 'transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardHeader Component
 */
export function CardHeader({ children, className = '', border = true }) {
  return (
    <div className={`px-6 py-4 ${border ? 'border-b border-gray-100' : ''} ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardTitle Component
 */
export function CardTitle({ children, className = '', as: Component = 'h3' }) {
  return (
    <Component className={`text-base font-semibold text-gray-900 ${className}`}>
      {children}
    </Component>
  );
}

/**
 * CardSubtitle Component
 */
export function CardSubtitle({ children, className = '' }) {
  return (
    <p className={`text-sm text-gray-500 mt-1 ${className}`}>
      {children}
    </p>
  );
}

/**
 * CardContent Component
 */
export function CardContent({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * CardFooter Component
 */
export function CardFooter({ children, className = '', border = true }) {
  return (
    <div className={`px-6 py-4 ${border ? 'border-t border-gray-100' : ''} bg-gray-50 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
}

/**
 * StatCard Component
 * Specialized card for displaying statistics
 */
export function StatCard({
  title,
  value,
  change,
  trend = 'stable',
  icon: Icon,
  color = 'blue',
  footer,
  className = '',
  loading = false,
}) {
  const colorVariants = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-500 to-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-green-500 to-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-500 to-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-orange-500 to-orange-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600', gradient: 'from-red-500 to-red-600' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', gradient: 'from-cyan-500 to-cyan-600' },
  };

  const colors = colorVariants[color] || colorVariants.blue;

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-5 animate-pulse ${className}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-32 mt-3" />
            <div className="h-3 bg-gray-200 rounded w-20 mt-2" />
          </div>
          <div className={`h-12 w-12 ${colors.bg} rounded-xl`} />
        </div>
      </div>
    );
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' && (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
                {trend === 'down' && (
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
                <span className={`text-sm font-medium ${
                  trend === 'up' ? 'text-green-600' : 
                  trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
          )}
        </div>
      </CardContent>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
      {footer && (
        <CardFooter border={false} className="pt-0">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

/**
 * InfoCard Component
 * Card with icon and description
 */
export function InfoCard({
  icon: Icon,
  title,
  description,
  action,
  color = 'blue',
  className = '',
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <Card className={className} hover={false}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className={`p-3 rounded-xl ${colors[color] || colors.blue}`}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
            {action && <div className="mt-3">{action}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * MetricCard Component
 * Card for displaying a single metric with trend
 */
export function MetricCard({
  label,
  value,
  trend,
  trendValue,
  icon: Icon,
  className = '',
}) {
  const isPositive = trend === 'up';
  const isNeutral = trend === 'stable';

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {trendValue && (
              <div className={`flex items-center gap-1 mt-1 text-sm ${
                isPositive ? 'text-green-600' : isNeutral ? 'text-gray-500' : 'text-red-600'
              }`}>
                {isPositive && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {isNeutral && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                  </svg>
                )}
                {!isPositive && !isNeutral && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className="font-medium">{trendValue}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="p-2.5 bg-gray-100 rounded-xl">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Card;
