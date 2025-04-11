import React from 'react';

export interface MaharashtraMapProps {
  markers?: { id: number; lat: number; lng: number; label: string }[];
}

const MaharashtraMap: React.FC<MaharashtraMapProps> = ({ markers }) => {
  return (
    <div className="map-container">
      <h2>Maharashtra Map</h2>
      {/* Render map and markers here */}
      {markers && markers.map(marker => (
        <div key={marker.id}>
          <p>{marker.label} at ({marker.lat}, {marker.lng})</p>
        </div>
      ))}
    </div>
  );
};

export default MaharashtraMap;
