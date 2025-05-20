"use client";

import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Car, Navigation } from 'lucide-react';

// Fix for Leaflet marker issue in Next.js
const _markerIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// Custom marker icon for destination
const _destinationIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    className: 'destination-marker'
});

// Component to fit map to markers
const _FitBounds = ({ coordinates }: { coordinates: [number, number][] }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            map.fitBounds(coordinates);
        }
    }, [map, coordinates]);

    return null;
};

interface RouteMapViewProps {
    fromCoordinates: [number, number];
    toCoordinates: [number, number];
    fromCity: string;
    toCity: string;
}

export default function RouteMapView({
    fromCoordinates,
    toCoordinates,
    fromCity,
    toCity
}: RouteMapViewProps): JSX.Element {
    // Generate intermediate points for route simulation
    const _generateIntermediatePoints = () => {
        const points: [number, number][] = [fromCoordinates];

        const numPoints = 5; // Number of intermediate points
        const _latDiff = toCoordinates[0] - fromCoordinates[0];
        const _lngDiff = toCoordinates[1] - fromCoordinates[1];

        for (let i = 1; i <= numPoints; i++) {
            // Add some randomness to make the route look more natural
            const _offsetLat = (Math.random() - 0.5) * 0.05;
            const _offsetLng = (Math.random() - 0.5) * 0.05;

            const _point: [number, number] = [
                fromCoordinates[0] + (_latDiff * (i / (numPoints + 1))) + _offsetLat,
                fromCoordinates[1] + (_lngDiff * (i / (numPoints + 1))) + _offsetLng
            ];

            points.push(_point);
        }

        points.push(toCoordinates);
        return points;
    };

    const _routePoints = _generateIntermediatePoints();

    // Calculate map bounds for auto-zoom
    const _bounds = [fromCoordinates, toCoordinates];

    return (
        <MapContainer
            center={[(fromCoordinates[0] + toCoordinates[0]) / 2, (fromCoordinates[1] + toCoordinates[1]) / 2]}
            zoom={8}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Source marker */}
            <Marker position={fromCoordinates} icon={_markerIcon}>
                <Popup>
                    <div className="text-center">
                        <strong>{fromCity}</strong><br />
                        Starting point
                    </div>
                </Popup>
            </Marker>

            {/* Destination marker */}
            <Marker position={toCoordinates} icon={_destinationIcon}>
                <Popup>
                    <div className="text-center">
                        <strong>{toCity}</strong><br />
                        Destination
                    </div>
                </Popup>
            </Marker>

            {/* Route line */}
            <Polyline
                positions={_routePoints}
                color="#3b82f6"
                weight={4}
                opacity={0.7}
                dashArray="10, 10"
                dashOffset="0"
            />

            {/* Auto-fit the map to show both markers */}
            <_FitBounds coordinates={_bounds} />
        </MapContainer>
    );
}
