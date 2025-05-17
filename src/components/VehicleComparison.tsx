import React from 'react';
import { VehicleType } from '../types/vehicle';

interface VehicleComparisonProps {
    vehicles?: VehicleType[];
    initialDistance?: number;
}

const _VehicleComparison = ({ vehicles = [], initialDistance = 0 }: VehicleComparisonProps): JSX.Element => {
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Compare Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehicles.map((vehicle): JSX.Element => (
                    <div key={vehicle.id} className="border p-4 rounded">
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        <p className="text-gray-600">${vehicle.price}/day</p>
                        {/* Add more comparison fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default _VehicleComparison;
