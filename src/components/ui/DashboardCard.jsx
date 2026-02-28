import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * DashboardCard Component
 * A versatile card for displaying statistics and metrics on dashboards
 */
export function DashboardCard({
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

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';

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
    <div className={`bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon className={`w-4 h-4 ${trendColor}`} />
              <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors.bg}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        )}
      </div>
      {footer && <div className="mt-4 pt-4 border-t border-gray-100">{footer}</div>}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-b-xl`} />
    </div>
  );
}

export default DashboardCard;
