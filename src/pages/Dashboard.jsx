import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import KPIMetrics from '../components/dashboard/KPIMetrics';
import BinLocationsMap from '../components/dashboard/BinLocationsMap';
import AlertBinsPanel from '../components/dashboard/AlertBinsPanel';
import { useApp } from '../contexts/AppContext';
import { useAlertNotifications } from '../hooks/useAlertNotifications.jsx';

const Dashboard = () => {
  const { bins, alerts, analytics, wsConnected, selectedBin, selectBin } = useApp();
  const isLoading = false;

  // Fire toast notifications when bins cross the 90% threshold
  useAlertNotifications(bins, 90, selectBin);

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('WebSocket connected:', wsConnected);
    console.log('Bins:', bins);
    console.log('Alerts:', alerts);
    console.log('Analytics:', analytics);
  }, [wsConnected, bins, alerts, analytics]);

  return (
    <MainLayout>
      {/* Toast notifications container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { zIndex: 9999 },
        }}
      />

      <div className="flex h-full gap-0 relative">
        {/* ── Main Content Area ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Page Header with Gradient */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h2>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Real-time waste management insights
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className={`w-2.5 h-2.5 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse shadow-lg`}></div>
              <span className="text-sm text-gray-700 font-semibold">
                {wsConnected ? 'Live Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* KPI Metrics Section */}
          <div className="w-full">
            <KPIMetrics bins={bins} analytics={analytics} isLoading={isLoading} />
          </div>

          {/* Bin Locations Map with Enhanced Styling */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Bin Locations Map</h3>
                  <p className="text-xs text-gray-500">Interactive real-time tracking</p>
                </div>
              </div>
            </div>
            <BinLocationsMap bins={bins} selectedBin={selectedBin} />
          </div>
        </div>

        {/* ── Right Sidebar: Alert Bins Panel (Fixed Position) ── */}
        <div className="shrink-0">
          <AlertBinsPanel
            bins={bins}
            alerts={alerts}
            selectedBinId={selectedBin?.id}
            onSelectBin={selectBin}
            routeSummary={analytics}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
