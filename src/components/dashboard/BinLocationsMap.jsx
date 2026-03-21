import { useMemo, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

const DEFAULT_CENTER = [28.6139, 77.209];

const makeIcon = (color, size = 28) => L.divIcon({
  className: '',
  html: `<div style="width:${size}px;height:${size}px;background:${color};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3)"><div style="width:8px;height:8px;background:white;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(45deg)"></div></div>`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

const greenIcon  = makeIcon('#22c55e');
const orangeIcon = makeIcon('#f97316');
const redIcon    = makeIcon('#ef4444');

const getIcon = (fillLevel) => {
  if (fillLevel >= 90) return redIcon;
  if (fillLevel >= 70) return orangeIcon;
  return greenIcon;
};

const FlyToSelected = ({ selectedBin }) => {
  const map = useMap();
  useEffect(() => {
    if (!selectedBin) return;
    const lat = selectedBin.lat ?? selectedBin.latitude ?? selectedBin.position?.[0];
    const lng = selectedBin.lng ?? selectedBin.longitude ?? selectedBin.position?.[1];
    if (lat != null && lng != null) map.flyTo([lat, lng], 16, { duration: 1.2 });
  }, [selectedBin, map]);
  return null;
};

const SAMPLE_MARKERS = [
  { id: 'bin-104', name: 'Bin #104', fillLevel: 92, address: 'Sector 20, Gurgaon', lastUpdated: '10 mins ago', position: [28.6139, 77.209] },
  { id: 'bin-102', name: 'Bin #102', fillLevel: 95, address: 'Sector 62, Noida',   lastUpdated: '5 mins ago',  position: [28.6212, 77.2165] },
  { id: 'bin-87',  name: 'Bin #87',  fillLevel: 92, address: 'Sector 15, Gurgaon', lastUpdated: '8 mins ago',  position: [28.6065, 77.2016] },
  { id: 'bin-45',  name: 'Bin #45',  fillLevel: 91, address: 'Market Area',        lastUpdated: '12 mins ago', position: [28.6300, 77.2200] },
  { id: 'bin-101', name: 'Bin #101', fillLevel: 45, address: 'Sector 12',          lastUpdated: '3 mins ago',  position: [28.6180, 77.2080] },
  { id: 'bin-55',  name: 'Bin #55',  fillLevel: 68, address: 'Sector 5',           lastUpdated: '15 mins ago', position: [28.6050, 77.2150] },
];

const BinLocationsMap = ({ bins = [], selectedBin = null }) => {
  const markers = useMemo(() => {
    if (bins.length > 0) {
      return bins.map(b => {
        const lat = b.lat ?? b.latitude ?? b.location?.lat;
        const lng = b.lng ?? b.longitude ?? b.location?.lng;
        if (!lat || !lng) return null;
        return { id: b.id, name: b.name ?? `Bin #${b.id}`, fillLevel: b.fillLevel ?? 0, address: b.address ?? '', lastUpdated: b.lastUpdated ?? 'Recently', position: [lat, lng] };
      }).filter(Boolean);
    }
    return SAMPLE_MARKERS;
  }, [bins]);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700" style={{ height: '360px' }}>
      <MapContainer center={DEFAULT_CENTER} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }} className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToSelected selectedBin={selectedBin} />
        {markers.map(m => (
          <Marker key={m.id} position={m.position} icon={getIcon(m.fillLevel)}>
            <Popup closeButton={false} className="bin-popup">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 min-w-[180px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 text-sm">{m.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                  <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  {m.address}
                </div>
                <p className="text-xs text-gray-700">
                  Fill level: <span className={`font-bold ${m.fillLevel >= 90 ? 'text-red-500' : m.fillLevel >= 70 ? 'text-orange-500' : 'text-green-500'}`}>{m.fillLevel}%</span>
                </p>
                <p className="text-xs text-gray-700 mt-0.5">
                  Status: <span className={`font-bold ${m.fillLevel >= 90 ? 'text-red-500' : 'text-green-500'}`}>{m.fillLevel >= 90 ? 'Alert' : 'Normal'}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Last Updated: {m.lastUpdated}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BinLocationsMap;
