import KPICard from '../KPICard';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';

const VehicleType = ({ evPercentage = 45, evCount = 8, totalVehicles = 18 }) => {
  const Icon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  // Data for vehicle type breakdown
  const vehicleData = [
    { type: 'EV', count: evCount, percentage: evPercentage },
    { type: 'Gas', count: totalVehicles - evCount, percentage: 100 - evPercentage }
  ];

  return (
    <KPICard
      title="EV Fleet Utilization"
      value={`${evPercentage}%`}
      icon={<Icon />}
      colorScheme="teal"
      subText="Electric vehicles in use"
      footer={
        <div className="flex items-center gap-2 justify-between">
          <span className="text-xs text-gray-600">
            {evCount} of {totalVehicles} vehicles
          </span>
          <span className="text-xs font-semibold text-teal-600">Active</span>
        </div>
      }
    >
      {/* Mini Bar Chart: Vehicle Type Distribution */}
      <div className="h-16 -mx-2 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={vehicleData}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
          >
            <XAxis type="number" hide={true} domain={[0, totalVehicles]} />
            <YAxis dataKey="type" type="category" width={25} tick={{ fontSize: 12 }} />
            <Bar dataKey="count" fill="#14b8a6" radius={[0, 4, 4, 0]} isAnimationActive={true}>
              <Cell fill="#14b8a6" />
              <Cell fill="#d1d5db" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Fleet Indicator Dots */}
      <div className="mt-3">
        <div className="flex flex-wrap gap-1">
          {[...Array(totalVehicles)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < evCount 
                  ? 'bg-teal-500 shadow-sm' 
                  : 'bg-gray-300'
              }`}
              title={i < evCount ? 'Active EV' : 'Gas Vehicle'}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            EV ({evCount})
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            Gas ({totalVehicles - evCount})
          </span>
        </div>
      </div>
    </KPICard>
  );
};

export default VehicleType;
