import KPICard from '../KPICard';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const RouteDistance = ({ 
  distance = '28.4', 
  estimatedTime = '45', 
  change = -3,
  sparklineData = [
    { time: '1', distance: 32.5 },
    { time: '2', distance: 30.2 },
    { time: '3', distance: 29.8 },
    { time: '4', distance: 28.9 },
    { time: '5', distance: 28.4 }
  ]
}) => {
  const Icon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  return (
    <KPICard
      title="Optimized Route Distance"
      value={`${distance} km`}
      icon={<Icon />}
      colorScheme="green"
      subText={`ETA: ${estimatedTime} min`}
      footer={
        <div className="flex items-center gap-1">
          <span className={`font-semibold ${change < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change}%
          </span>
          <span className="text-gray-600">vs yesterday</span>
        </div>
      }
    >
      {/* Mini Sparkline Chart: Distance optimization trend */}
      <div className="h-16 -mx-2 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <XAxis dataKey="time" hide={true} />
            <YAxis hide={true} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
              cursor={false}
              formatter={(value) => `${value.toFixed(1)} km`}
            />
            <Line 
              type="monotone" 
              dataKey="distance" 
              stroke="#10b981" 
              dot={false}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-600 mt-1">
        Route improvement over time
      </div>
    </KPICard>
  );
};

export default RouteDistance;
