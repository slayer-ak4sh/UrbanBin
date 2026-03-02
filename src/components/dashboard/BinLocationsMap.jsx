import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER = [28.6139, 77.209];

const toNumber = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const extractBinLocation = (bin) => {
  const lat =
    toNumber(bin?.lat) ??
    toNumber(bin?.latitude) ??
    toNumber(bin?.location?.lat) ??
    toNumber(bin?.location?.latitude);
  const lng =
    toNumber(bin?.lng) ??
    toNumber(bin?.lon) ??
    toNumber(bin?.longitude) ??
    toNumber(bin?.location?.lng) ??
    toNumber(bin?.location?.lon) ??
    toNumber(bin?.location?.longitude);

  if (lat == null || lng == null) return null;

  return {
    id: bin?.id ?? `bin-${lat}-${lng}`,
    name: bin?.name ?? bin?.binName ?? `Bin ${bin?.id ?? ''}`.trim(),
    fillLevel: bin?.fillLevel ?? bin?.fillPercentage ?? null,
    position: [lat, lng],
  };
};

const BinLocationsMap = ({ bins = [] }) => {
  const markers = useMemo(() => {
    const locations = bins.map(extractBinLocation).filter(Boolean);

    if (locations.length > 0) return locations;

    return [
      { id: 'sample-1', name: 'Central Bin 1', fillLevel: 72, position: [28.6139, 77.209] },
      { id: 'sample-2', name: 'Central Bin 2', fillLevel: 43, position: [28.6212, 77.2165] },
      { id: 'sample-3', name: 'Central Bin 3', fillLevel: 91, position: [28.6065, 77.2016] },
    ];
  }, [bins]);

  const center = markers[0]?.position ?? DEFAULT_CENTER;

  return (
    <div className="rounded-lg h-80 md:h-96 overflow-hidden border border-gray-200">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <div className="min-w-28">
                <p className="font-semibold text-gray-800">{marker.name}</p>
                <p className="text-gray-600 text-sm">
                  Fill Level: {marker.fillLevel == null ? 'N/A' : `${marker.fillLevel}%`}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BinLocationsMap;
