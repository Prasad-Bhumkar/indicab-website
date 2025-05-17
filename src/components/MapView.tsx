import React from 'react';
import { Route } from '@/types/routes';

interface MapViewProps {
    routes: Route[];
    onRouteSelect: (routeId: number) => void;
}

const _MapView: React.FC<MapViewProps> = ({ routes, onRouteSelect }): JSX.Element => {
    return (
        <div className="w-full h-full">
            {/* Map implementation goes here */}
            <div className="text-center p-4">Map View Coming Soon</div>
        </div>
    );
};

export default _MapView;
