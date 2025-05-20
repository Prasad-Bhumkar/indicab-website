'use client';

import type { Route } from '@/types/routes';
import type { LatLngTuple } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';

import 'leaflet/dist/leaflet.css';

// Import types for client-side components

interface MapViewProps {
  routes: Route[];
  onRouteSelect: (routeId: number) => void;
}

export default function MapView({ routes, onRouteSelect }: MapViewProps) {
  // State to track if component is mounted on client
  const [isMounted, setIsMounted] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);

  // Only load Leaflet on client-side
  useEffect(() => {
    // Set mount state
    setIsMounted(true);

    // Dynamically import Leaflet components
    const loadLeafletComponents = async () => {
      const L = (await import('leaflet')).default;
      const { MapContainer, Marker, Popup, TileLayer } = await import('react-leaflet');

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

      setMapComponents({
        L,
        MapContainer,
        Marker,
        Popup,
        TileLayer,
        icon
      });
    };

    loadLeafletComponents().catch(console.error);
  }, []);

  // Calculate map bounds based on route coordinates
  const bounds = useMemo(() => {
    if (!MapComponents || !isMounted) return null;
    
    const coordinates: LatLngTuple[] = routes.flatMap(route => [
      [route.coordinates.from.lat, route.coordinates.from.lng],
      [route.coordinates.to.lat, route.coordinates.to.lng]
    ]);
    
    return MapComponents.L.latLngBounds(coordinates);
  }, [routes, MapComponents, isMounted]);

  // Don't render map until client-side and components are loaded
  if (!isMounted || !MapComponents || !bounds) {
    return <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

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
            icon={MapComponents.icon}
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
            icon={MapComponents.icon}
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
