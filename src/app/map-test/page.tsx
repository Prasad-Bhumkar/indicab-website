"use client";

import MaharashtraMap from '@/features/maps/MaharashtraMap';

const initialMarkers = [
  { id: 1, lat: 19.076, lng: 72.8777, label: 'Mumbai' },
  { id: 2, lat: 18.5204, lng: 73.8567, label: 'Pune' },
  { id: 3, lat: 20.2961, lng: 85.8245, label: 'Bhubaneswar' },
];

export default function MapTestPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Maharashtra Map Test</h1>
      <MaharashtraMap markers={initialMarkers} />
    </div>
  );
}
