import TotalBins from './cards/TotalBins';
import BinsAbove90 from './cards/BinsAbove90';
import RouteDistance from './cards/RouteDistance';
import FuelSaved from './cards/FuelSaved';
import AvgFillLevel from './cards/AvgFillLevel';
import VehicleType from './cards/VehicleType';

const KPIMetrics = ({ bins = [], analytics = {}, isLoading = false }) => {
  // Extract metrics from context data
  const totalBins = bins.length || 0;
  const binsAbove90 = bins.filter(bin => bin.fillLevel >= 90).length || 12;
  const routeDistance = analytics.routeDistance || 28.4;
  const estimatedTime = analytics.estimatedTime || 45;
  const fuelSaved = analytics.fuelSaved || 23.5;
  const avgFillLevel = analytics.avgFillLevel || 67;
  const evPercentage = analytics.evPercentage || 45;
  const evCount = analytics.evCount || 8;
  const totalVehicles = analytics.totalVehicles || 18;

  // Sample trend data - can be replaced with real data
  const alertTrend = [10, 11, 12, 13, 12, 14, 12];
  const routeTrendData = [
    { time: '1', distance: 32.5 },
    { time: '2', distance: 30.2 },
    { time: '3', distance: 29.8 },
    { time: '4', distance: 28.9 },
    { time: '5', distance: 28.4 }
  ];
  const fuelTrendData = [
    { week: 'W1', saved: 15.2 },
    { week: 'W2', saved: 18.1 },
    { week: 'W3', saved: 20.5 },
    { week: 'W4', saved: 23.5 }
  ];

  return (
    <div className="w-full">
      {/* Metrics Title Section */}
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">Key Performance Indicators</h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Real-time metrics and trends</p>
      </div>

      {/* KPI Grid - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
        {/* Card 1: Total Bins */}
        <TotalBins 
          binsCount={totalBins} 
          change={5}
          normalBins={70}
          alertBins={30}
        />

        {/* Card 2: Bins Above 90% */}
        <BinsAbove90 
          alertCount={binsAbove90} 
          change={2}
          trend={alertTrend}
        />

        {/* Card 3: Optimized Route Distance */}
        <RouteDistance 
          distance={routeDistance} 
          estimatedTime={estimatedTime} 
          change={-3}
          sparklineData={routeTrendData}
        />

        {/* Card 4: Fuel Saved */}
        <FuelSaved 
          percentage={fuelSaved} 
          trend={5.2}
          trendData={fuelTrendData}
        />

        {/* Card 5: Avg Fill Level */}
        <AvgFillLevel 
          fillLevel={avgFillLevel} 
          status="Stable" 
        />

        {/* Card 6: Vehicle Type (EV Utilization) */}
        <VehicleType 
          evPercentage={evPercentage} 
          evCount={evCount} 
          totalVehicles={totalVehicles} 
        />
      </div>
    </div>
  );
};

export default KPIMetrics;
