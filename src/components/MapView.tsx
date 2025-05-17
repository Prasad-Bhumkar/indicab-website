import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Route } from '@/data/routes';
import { _Button as Button } from '@/components/ui/Button';
import Link from 'next/link';

export interface MapViewProps {
  routes: Route[];
  onRouteSelect: (routeId: number) => void;
}

export default function MapView({ routes, onRouteSelect }: MapViewProps): JSX.Element {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center of India
      zoom={5}
      className="h-[400px] w-full rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routes.map((route) => (
        <Marker
          key={route.id}
          position={route.fromCoordinates}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium mb-1">{route.from} to {route.to}</h3>
              <p className="text-sm text-gray-600 mb-2">{route.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary">{route.price}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRouteSelect(route.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
