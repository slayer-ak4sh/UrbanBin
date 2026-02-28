import KPICard from '../KPICard';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const BinsAbove90 = ({ alertCount = 12, change = 2, trend = [10, 11, 12, 13, 12, 14, 12] }) => {
  const Icon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // Trend data for mini bar chart
  const trendData = trend.map((value, idx) => ({ day: idx + 1, count: value }));

  return (
    <KPICard
      title="Bins Above 90%"
      value={alertCount}
      icon={<Icon />}
      colorScheme="red"
      subText="Critical fill level"
      footer={
        <div className="flex items-center gap-1">
          <span className="text-red-600 font-semibold">↑ {change}</span>
          <span className="text-gray-600">new alerts today</span>
        </div>
      }
    >
      {/* Mini Bar Chart: Daily Alert Trend */}
      <div className="h-20 -mx-2 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <XAxis dataKey="day" hide={true} />
            <YAxis hide={true} domain={[0, Math.max(...trend) + 2]} />
            <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} isAnimationActive={true} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-600 mt-1">
        7-day trend
      </div>
    </KPICard>
  );
};

export default BinsAbove90;
