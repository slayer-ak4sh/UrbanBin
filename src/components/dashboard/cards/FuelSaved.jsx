import KPICard from '../KPICard';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const FuelSaved = ({ 
  percentage = 23.5, 
  trend = 5.2,
  trendData = [
    { week: 'W1', saved: 15.2 },
    { week: 'W2', saved: 18.1 },
    { week: 'W3', saved: 20.5 },
    { week: 'W4', saved: 23.5 }
  ]
}) => {
  const Icon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <KPICard
      title="Fuel Saved"
      value={`${percentage}%`}
      icon={<Icon />}
      colorScheme="purple"
      subText="This month"
      footer={
        <div className="flex items-center gap-1">
          <span className="text-green-600 font-semibold">↑ {trend}%</span>
          <span className="text-gray-600">upward trend</span>
        </div>
      }
    >
      {/* Mini Area Chart: Weekly fuel savings trend */}
      <div className="h-16 -mx-2 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" hide={true} />
            <YAxis hide={true} domain={[10, 25]} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
              cursor={false}
              formatter={(value) => `${value.toFixed(1)}%`}
            />
            <Area 
              type="monotone" 
              dataKey="saved" 
              stroke="#a855f7" 
              fillOpacity={1} 
              fill="url(#colorSaved)"
              isAnimationActive={true}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-600 mt-1">
        Weekly improvement
      </div>
    </KPICard>
  );
};

export default FuelSaved;
