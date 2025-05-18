'use client';

import { Route } from '@/types/routes';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapViewProps {
  routes: Route[];
  onRouteSelect: (routeId: number) => void;
}

export default function MapView({ routes, onRouteSelect }: MapViewProps) {
  // Calculate map bounds based on route coordinates
  const bounds = useMemo(() => {
    const coordinates: LatLngTuple[] = routes.flatMap(route => [
      [route.coordinates.from.lat, route.coordinates.from.lng],
      [route.coordinates.to.lat, route.coordinates.to.lng]
    ]);
    return L.latLngBounds(coordinates);
  }, [routes]);

  return (
    <MapContainer
      bounds={bounds}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routes.map((route) => (
        <div key={route.id}>
          <Marker
            position={[route.coordinates.from.lat, route.coordinates.from.lng] as LatLngTuple}
            icon={icon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{route.from}</strong>
                <p className="mt-1">{route.description}</p>
                <button
                  onClick={() => onRouteSelect(route.id)}
                  className="mt-2 text-primary hover:underline"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
          <Marker
            position={[route.coordinates.to.lat, route.coordinates.to.lng] as LatLngTuple}
            icon={icon}
          >
            <Popup>
              <div className="text-sm">
                <strong>{route.to}</strong>
                <p className="mt-1">{route.description}</p>
                <button
                  onClick={() => onRouteSelect(route.id)}
                  className="mt-2 text-primary hover:underline"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  );
}
