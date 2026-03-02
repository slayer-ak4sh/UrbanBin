import { useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import KPIMetrics from '../components/dashboard/KPIMetrics';
import BinLocationsMap from '../components/dashboard/BinLocationsMap';
import { useApp } from '../contexts/AppContext';

const Dashboard = () => {
  const { bins, alerts, analytics, wsConnected } = useApp();
  const isLoading = false;

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('WebSocket connected:', wsConnected);
    console.log('Bins:', bins);
    console.log('Alerts:', alerts);
    console.log('Analytics:', analytics);
  }, [wsConnected, bins, alerts, analytics]);

  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Page Header - Responsive Typography */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">Overview of waste management system</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {wsConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* KPI Metrics Section */}
        <div className="w-full">
          <KPIMetrics bins={bins} analytics={analytics} isLoading={isLoading} />
        </div>

        {/* Bin Locations Map */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Bin Locations Map</h3>
          <BinLocationsMap bins={bins} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
