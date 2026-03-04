import { useState, useMemo } from 'react';
import AlertBinItem from './AlertBinItem';

/**
 * AlertBinsPanel — right sidebar panel showing high-fill-level alert bins.
 *
 * Props:
 *  - bins: full bin list from context
 *  - alerts: alert events from WS
 *  - selectedBinId: currently highlighted bin id
 *  - onSelectBin: callback(bin) when a bin is clicked
 *  - collapsed: external collapsed state (optional)
 *  - onToggleCollapse: callback for toggling collapse (optional)
 */
const FILL_THRESHOLD = 75; // Bins above this % appear in the alert panel

const AlertBinsPanel = ({ bins = [], alerts = [], selectedBinId, onSelectBin, routeSummary }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('fillLevel'); // fillLevel | name | priority

  // ── Derive alert bins ─────────────────────────────────────────────
  const alertBins = useMemo(() => {
    // Use real bins if available; otherwise fall back to sample data
    const source = bins.length > 0 ? bins : SAMPLE_ALERT_BINS;

    let filtered = source
      .filter((b) => (b.fillLevel ?? 0) >= FILL_THRESHOLD)
      .map((b) => ({
        ...b,
        // Normalise an id field
        id: b.id ?? b.binId ?? `bin-${b.lat ?? Math.random()}`,
        name: b.name ?? b.binName ?? `Bin #${b.id ?? b.binId ?? '?'}`,
        fillLevel: b.fillLevel ?? b.fillPercentage ?? 0,
        change: b.change ?? null,
      }));

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          String(b.id).toLowerCase().includes(q) ||
          (b.address ?? '').toLowerCase().includes(q)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'fillLevel') return b.fillLevel - a.fillLevel;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.fillLevel - a.fillLevel; // default = priority
    });

    return filtered;
  }, [bins, searchQuery, sortBy]);

  // ── Summary stats ────────────────────────────
  const totalDistance = routeSummary?.totalDistance ?? '14.2 km';
  const estimatedTime = routeSummary?.estimatedTime ?? '38 min';

  return (
    <aside
      className={`alert-bins-panel flex flex-col bg-white border-l border-gray-200 shadow-lg transition-all duration-300 h-full ${
        collapsed ? 'w-12' : 'w-80'
      }`}
    >
      {/* ═══ Collapse Toggle ═══ */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -left-3 top-20 z-10 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors"
        title={collapsed ? 'Expand alerts' : 'Collapse alerts'}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {collapsed ? (
        // ── Collapsed state: icon only ──
        <div className="flex flex-col items-center pt-4 gap-3">
          <div className="relative">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {alertBins.length}
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* ═══ Panel Header ═══ */}
          <div className="shrink-0 px-4 pt-4 pb-3 border-b border-gray-100">
            {/* Title Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Alert Bins
                </h3>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded-full min-w-5 text-center">
                  {alertBins.length}
                </span>
              </div>
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-red-300"
              >
                <option value="fillLevel">By Fill %</option>
                <option value="name">By Name</option>
              </select>
            </div>

            {/* Summary Row */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="font-medium text-gray-700">{totalDistance}</span>
              </div>
              <div className="w-px h-3 bg-gray-300" />
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-gray-700">{estimatedTime}</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mt-2.5">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search bins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300 placeholder-gray-400"
              />
            </div>
          </div>

          {/* ═══ Scrollable Bin List ═══ */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 alert-bins-scroll">
            {alertBins.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">No alert bins</p>
                <p className="text-xs mt-1">All bins are below {FILL_THRESHOLD}%</p>
              </div>
            ) : (
              alertBins.map((bin) => (
                <AlertBinItem
                  key={bin.id}
                  bin={bin}
                  isSelected={selectedBinId === bin.id}
                  onSelect={onSelectBin}
                />
              ))
            )}
          </div>

          {/* ═══ Footer ═══ */}
          <div className="shrink-0 px-4 py-2.5 border-t border-gray-100 bg-gray-50/60">
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span>Threshold: ≥{FILL_THRESHOLD}%</span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Live
              </span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

// ── Sample data (used when no WS bins are available) ────────────────
const SAMPLE_ALERT_BINS = [
  { id: 'bin-001', name: 'MG Road Bin #1', fillLevel: 97, change: 4, lat: 28.6139, lng: 77.209, address: 'MG Road, Sector 14', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-002', name: 'Central Park Bin #3', fillLevel: 94, change: 6, lat: 28.6212, lng: 77.2165, address: 'Central Park, Block C', wasteType: 'organic', lastUpdated: new Date().toISOString() },
  { id: 'bin-003', name: 'Market Bin #7', fillLevel: 92, change: 3, lat: 28.6065, lng: 77.2016, address: 'Sarojini Market', wasteType: 'recyclable', lastUpdated: new Date().toISOString() },
  { id: 'bin-004', name: 'Station Rd Bin #12', fillLevel: 91, change: -2, lat: 28.6328, lng: 77.2197, address: 'Near Railway Station', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-005', name: 'Hospital Lane #4', fillLevel: 89, change: 5, lat: 28.6185, lng: 77.2054, address: 'AIIMS Campus Gate', wasteType: 'biomedical', lastUpdated: new Date().toISOString() },
  { id: 'bin-006', name: 'Green Park Bin #2', fillLevel: 88, change: 1, lat: 28.5594, lng: 77.2069, address: 'Green Park Metro Stn', wasteType: 'organic', lastUpdated: new Date().toISOString() },
  { id: 'bin-007', name: 'Hauz Khas Bin #9', fillLevel: 87, change: 7, lat: 28.5494, lng: 77.2001, address: 'Hauz Khas Village', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-008', name: 'Lajpat Nagar Bin #5', fillLevel: 86, change: 2, lat: 28.5700, lng: 77.2390, address: 'Lajpat Nagar Central', wasteType: 'recyclable', lastUpdated: new Date().toISOString() },
  { id: 'bin-009', name: 'Nehru Place #11', fillLevel: 84, change: -1, lat: 28.5488, lng: 77.2533, address: 'Nehru Place Market', wasteType: 'e-waste', lastUpdated: new Date().toISOString() },
  { id: 'bin-010', name: 'Connaught Pl #6', fillLevel: 82, change: 3, lat: 28.6315, lng: 77.2167, address: 'Connaught Place, Ring', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-011', name: 'Saket Bin #8', fillLevel: 81, change: 0, lat: 28.5244, lng: 77.2066, address: 'Saket District Centre', wasteType: 'organic', lastUpdated: new Date().toISOString() },
  { id: 'bin-012', name: 'Defence Col #3', fillLevel: 80, change: 4, lat: 28.5740, lng: 77.2300, address: 'Defence Colony Market', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-013', name: 'INA Market #2', fillLevel: 79, change: 2, lat: 28.5742, lng: 77.2103, address: 'INA Market South', wasteType: 'organic', lastUpdated: new Date().toISOString() },
  { id: 'bin-014', name: 'Lodhi Colony #10', fillLevel: 78, change: 1, lat: 28.5862, lng: 77.2273, address: 'Lodhi Colony Main Rd', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-015', name: 'Jangpura Bin #4', fillLevel: 77, change: -3, lat: 28.5824, lng: 77.2425, address: 'Jangpura Extension', wasteType: 'recyclable', lastUpdated: new Date().toISOString() },
  { id: 'bin-016', name: 'Kalkaji Bin #7', fillLevel: 76, change: 5, lat: 28.5382, lng: 77.2590, address: 'Kalkaji Mandir Metro', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
  { id: 'bin-017', name: 'Vasant Kunj #1', fillLevel: 75, change: 0, lat: 28.5196, lng: 77.1588, address: 'Vasant Kunj Sector D', wasteType: 'organic', lastUpdated: new Date().toISOString() },
  { id: 'bin-018', name: 'South Ext Bin #14', fillLevel: 75, change: 2, lat: 28.5744, lng: 77.2215, address: 'South Extension Part II', wasteType: 'mixed', lastUpdated: new Date().toISOString() },
];

export default AlertBinsPanel;
