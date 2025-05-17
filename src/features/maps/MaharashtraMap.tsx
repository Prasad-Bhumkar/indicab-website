"use client";

import React, { useEffect, useState } from "react";

export interface MaharashtraMapProps {
  markers?: { id: number; lat: number; lng: number; label: string }[];
}

const _MaharashtraMap: React.FC<MaharashtraMapProps> = ({ markers }): JSX.Element => {
  const [vehicleMarkers, setVehicleMarkers] = useState(markers || []);
  const [Leaflet, setLeaflet] = useState<any>(null);

  useEffect(() => {
    import("react-leaflet").then(_mod => {
      setLeaflet(_mod);
    });
  }, []);

  // Simulate real-time updates by polling every 5 seconds
  useEffect(() => {
    const _interval = setInterval(() => {
      // Fetch updated vehicle locations from API or WebSocket here
      // For demo, randomly move markers slightly
      setVehicleMarkers(_prevMarkers =>
        _prevMarkers.map(marker => ({
          ...marker,
          lat: marker.lat + (Math.random() - 0.5) * 0.01,
          lng: marker.lng + (Math.random() - 0.5) * 0.01,
        }))
      );
    }, 5000);

    return () => clearInterval(_interval);
  }, []);

  if (!Leaflet) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="map-container" style={{ height: "500px", width: "100%" }}>
      <h2>Maharashtra Map</h2>
      <Leaflet.MapContainer center={[19.7515, 75.7139]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <Leaflet.TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicleMarkers.map(marker => (
          <Leaflet.Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Leaflet.Popup>{marker.label}</Leaflet.Popup>
          </Leaflet.Marker>
        ))}
      </Leaflet.MapContainer>
    </div>
  );
};

export default _MaharashtraMap;
