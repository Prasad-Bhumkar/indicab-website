import React from 'react';
import { Route } from '@/types/routes';

interface MapViewProps {
  routes: Route[];
  onRouteSelect: (routeId: number) => void;
}

const MapView: React.FC<MapViewProps> = ({ routes, onRouteSelect }) => {
  return (
    <div className="w-full h-full">
      {/* Map implementation goes here */}
      <div className="text-center p-4">Map View Coming Soon</div>
    </div>
  );
};

export default MapView;