import React from "react";

"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

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

export default function MapComponent(): JSX.Element {
    // IndiCab office location (Bangalore)
    const position: [number, number] = [12.9716, 77.5946]; // Bangalore coordinates

    return (
        <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={_markerIcon}>
                <Popup>
                    <div className="text-center">
                        <strong>IndiCab Headquarters</strong><br />
                        123 Transport Plaza, MG Road<br />
                        Bangalore, Karnataka 560001
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
