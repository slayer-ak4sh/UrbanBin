import KPICard from '../KPICard';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TotalBins = ({ binsCount = 0, change = 5, normalBins = 70, alertBins = 30 }) => {
  const Icon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  // Data for pie chart - Normal vs Alert bins
  const data = [
    { name: 'Normal', value: normalBins },
    { name: 'Alert', value: alertBins }
  ];

  return (
    <KPICard
      title="Total Bins"
      value={binsCount}
      icon={<Icon />}
      colorScheme="blue"
      subText="Active bins in network"
      footer={
        <div className="flex items-center gap-1">
          <span className="text-green-600 font-semibold">↑ {change}%</span>
          <span className="text-gray-600">from yesterday</span>
        </div>
      }
    >
      {/* Mini Pie Chart: Normal vs Alert Split */}
      <div className="h-24 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={24}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              <Cell fill="#3b82f6" />
              <Cell fill="#ef4444" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 text-xs mt-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">{normalBins}% Normal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-gray-600">{alertBins}% Alert</span>
        </div>
      </div>
    </KPICard>
  );
};

export default TotalBins;
