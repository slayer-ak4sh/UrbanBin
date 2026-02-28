import { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import KPIMetrics from '../components/dashboard/KPIMetrics';
import { useApp } from '../contexts/AppContext';

const Dashboard = () => {
  const { bins, alerts, analytics, wsConnected } = useApp();
  const [isLoading, setIsLoading] = useState(false);

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
              {wsConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </span>
          </div>
        </div>

        {/* KPI Metrics Section - Phase 1 to 6 Implementation */}
        <div className="w-full">
          <KPIMetrics bins={bins} analytics={analytics} isLoading={isLoading} />
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Bin Locations Map</h3>
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg h-80 md:h-96 flex items-center justify-center border border-gray-200">
            <div className="text-center px-4">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-600 font-medium text-sm md:text-base">Map Component Placeholder</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">Integrate Google Maps or Leaflet here</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
