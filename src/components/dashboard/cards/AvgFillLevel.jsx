import KPICard from '../KPICard';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AvgFillLevel = ({ fillLevel = 67, status = 'Stable' }) => {
  const Icon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // Determine color based on fill level
  const getStatusColor = (level) => {
    if (level >= 90) return 'text-red-600';
    if (level >= 70) return 'text-orange-600';
    return 'text-green-600';
  };

  const getStatusText = (level) => {
    if (level >= 90) return 'Critical';
    if (level >= 70) return 'High';
    return 'Normal';
  };

  const getGaugeColor = (level) => {
    if (level >= 90) return '#ef4444';
    if (level >= 70) return '#f97316';
    return '#10b981';
  };

  // Data for gauge chart
  const gaugeData = [
    { name: 'Used', value: fillLevel },
    { name: 'Available', value: 100 - fillLevel }
  ];

  return (
    <KPICard
      title="Avg Fill Level"
      value={`${fillLevel}%`}
      icon={<Icon />}
      colorScheme="indigo"
      subText="Network average"
      footer={
        <div className="flex items-center gap-2 justify-between">
          <span className={`text-xs font-semibold ${getStatusColor(fillLevel)}`}>
            {getStatusText(fillLevel)} Status
          </span>
          <span className="text-xs text-gray-600">Capacity: Good</span>
        </div>
      }
    >
      {/* Mini Gauge Chart: Fill level visualization */}
      <div className="h-20 -mx-2 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={32}
              outerRadius={48}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={getGaugeColor(fillLevel)} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between gap-2 text-xs mb-1">
          <span className="text-gray-600">Capacity</span>
          <span className="font-semibold text-gray-700">{fillLevel}%</span>
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              fillLevel >= 90 ? 'bg-red-500' : fillLevel >= 70 ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${fillLevel}%` }}
          ></div>
        </div>
      </div>
    </KPICard>
  );
};

export default AvgFillLevel;
