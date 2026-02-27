// Reusable KPI Card Component with enhanced styling for Phase 3 & 4 + Phase 5 & 6
const KPICard = ({ 
  title, 
  value, 
  icon, 
  colorScheme = 'blue',
  subText,
  footer,
  children,
  isLoading = false
}) => {
  // Define color schemes with gradients and accents
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      borderAccent: 'border-t-4 border-t-blue-500',
      icon: 'bg-blue-100 text-blue-600',
      accent: 'text-blue-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      borderAccent: 'border-t-4 border-t-red-500',
      icon: 'bg-red-100 text-red-600',
      accent: 'text-red-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      borderAccent: 'border-t-4 border-t-green-500',
      icon: 'bg-green-100 text-green-600',
      accent: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      borderAccent: 'border-t-4 border-t-purple-500',
      icon: 'bg-purple-100 text-purple-600',
      accent: 'text-purple-600'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      borderAccent: 'border-t-4 border-t-indigo-500',
      icon: 'bg-indigo-100 text-indigo-600',
      accent: 'text-indigo-600'
    },
    teal: {
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      borderAccent: 'border-t-4 border-t-teal-500',
      icon: 'bg-teal-100 text-teal-600',
      accent: 'text-teal-600'
    }
  };

  const colors = colorConfig[colorScheme] || colorConfig.blue;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`${colors.bg} border ${colors.border} ${colors.borderAccent} rounded-lg p-5 md:p-6 shadow-sm`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className={`${colors.icon} w-10 h-10 rounded-lg flex-shrink-0 animate-pulse`}></div>
        </div>
        <div className="mb-4">
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        {children && <div className="h-20 bg-gray-200 rounded animate-pulse mb-3"></div>}
        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} border ${colors.border} ${colors.borderAccent} rounded-lg p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 will-change-transform`}>
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-tight truncate">
            {title}
          </p>
        </div>
        {icon && (
          <div className={`${colors.icon} w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
            {icon}
          </div>
        )}
      </div>

      {/* Main Value - Enhanced styling with responsive font sizes */}
      <div className="mb-3 md:mb-4">
        <p className={`text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-gray-800 ${colors.accent} break-words`}>
          {value}
        </p>
        {subText && (
          <p className="text-xs sm:text-xs text-gray-600 mt-1 md:mt-2 font-medium line-clamp-2">
            {subText}
          </p>
        )}
      </div>

      {/* Children (for charts, custom content) */}
      {children && (
        <div className="mb-2 md:mb-3 overflow-hidden">
          {children}
        </div>
      )}

      {/* Footer section with enhanced styling */}
      {footer && (
        <div className="text-xs text-gray-700 pt-2 md:pt-3 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default KPICard;
