"use client";

import { Button } from '@/components/ui/button';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { Route } from '../../data/routes';

// Fix for Leaflet marker issue in Next.js
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Generate a color based on the route id (for visual distinction)
const getRouteColor = (routeId: number) => {
  const colors = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // green
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#14b8a6', // teal
  ];

  return colors[routeId % colors.length];
};

interface MapViewProps {
  routes: Route[];
  onRouteSelect: (routeId: number) => void;
}

export default function MapView({ routes, onRouteSelect }: MapViewProps): JSX.Element {
  // State to track which routes to show
  const [visibleRoutes, setVisibleRoutes] = useState<number[]>(
    routes.length > 5 ? [] : routes.map(_r => _r.id)
  );

  // Calculate center based on all route coordinates
  const _calculateCenter = () => {
    if (routes.length === 0) {
      return [20.5937, 78.9629] as [number, number]; // Center of India
    }

    let totalLat = 0;
    let totalLng = 0;
    let count = 0;

    routes.forEach(route => {
      totalLat += route.fromCoordinates[0] + route.toCoordinates[0];
      totalLng += route.fromCoordinates[1] + route.toCoordinates[1];
      count += 2;
    });

    return [totalLat / count, totalLng / count] as [number, number];
  };

  const center = _calculateCenter();

  // Toggle route visibility
  const _toggleRouteVisibility = (routeId: number) => {
    if (visibleRoutes.includes(routeId)) {
      setVisibleRoutes(visibleRoutes.filter(id => id !== routeId));
    } else {
      setVisibleRoutes([...visibleRoutes, routeId]);
    }
  };

  // Generate intermediate points for route simulation
  const _generateIntermediatePoints = (from: [number, number], to: [number, number]) => {
    const points: [number, number][] = [from];

    const numPoints = 3; // Number of intermediate points
    const _latDiff = to[0] - from[0];
    const _lngDiff = to[1] - from[1];

    for (let i = 1; i <= numPoints; i++) {
      // Add some randomness to make the route look more natural
      const _offsetLat = (Math.random() - 0.5) * 0.05;
      const _offsetLng = (Math.random() - 0.5) * 0.05;

      const _point: [number, number] = [
        from[0] + (_latDiff * (i / (numPoints + 1))) + _offsetLat,
        from[1] + (_lngDiff * (i / (numPoints + 1))) + _offsetLng
      ];

      points.push(_point);
    }

    points.push(to);
    return points;
  };

  return (
    <div className="relative h-full">
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.map(route => {
          const _isVisible = visibleRoutes.includes(route.id);
          const _routeColor = getRouteColor(route.id);
          const _routePoints = _generateIntermediatePoints(route.fromCoordinates, route.toCoordinates);

          return (
            <React.Fragment key={route.id}>
              {/* Only render the route if it's visible */}
              {_isVisible && (
                <>
                  <Marker position={route.fromCoordinates} icon={markerIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>{route.from}</strong><br />
                        <span className="text-xs">Starting point</span>
                        <div className="mt-2">
                          <Button
                            className="w-full bg-primary text-white text-xs"
                            onClick={() => onRouteSelect(route.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>

                  <Marker position={route.toCoordinates} icon={markerIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong>{route.to}</strong><br />
                        <span className="text-xs">Destination</span>
                        <div className="flex text-xs justify-between mt-1 mb-2">
                          <span>{route.distance}</span>
                          <span>{route.duration}</span>
                          <span>{route.price}</span>
                        </div>
                        <Button
                          className="w-full bg-primary text-white text-xs"
                          onClick={() => onRouteSelect(route.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </Popup>
                  </Marker>

                  <Polyline
                    positions={_routePoints}
                    color={_routeColor}
                    weight={4}
                    opacity={0.7}
                    dashArray={route.popular ? "" : "10,10"}
                  />
                </>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Route toggle controls */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md z-[1000] max-h-[300px] overflow-y-auto">
        <h4 className="font-medium text-sm mb-2 text-center">Available Routes</h4>
        {routes.map(route => (
          <div key={route.id} className="flex items-center mb-1 text-sm">
            <input
              type="checkbox"
              id={`route-${route.id}`}
              checked={visibleRoutes.includes(route.id)}
              onChange={() => _toggleRouteVisibility(route.id)}
              className="mr-2"
            />
            <label
              htmlFor={`route-${route.id}`}
              className="cursor-pointer flex-1"
            >
              {route.from} to {route.to}
            </label>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getRouteColor(route.id) }}
            />
          </div>
        ))}

        {/* Toggle all routes */}
        <div className="border-t mt-2 pt-2 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setVisibleRoutes(routes.map(_r => _r.id))}
          >
            Show All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setVisibleRoutes([])}
          >
            Hide All
          </Button>
        </div>
      </div>
    </div>
  );
}
