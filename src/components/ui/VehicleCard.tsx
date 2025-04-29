import { VehicleType } from '@/lib/types';
import { Button } from './Button';

export const VehicleCard = ({ vehicle }: { vehicle: VehicleType }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
    <div className="flex items-center gap-4 mb-4">
      <img 
        src={vehicle.image} 
        alt={vehicle.name}
        className="w-32 h-32 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
        <p className="text-gray-600 mb-2">{vehicle.description}</p>
        <div className="flex gap-4 text-sm">
          <span>🪑 Capacity: {vehicle.capacity}</span>
          <span>💰 ₹{vehicle.pricePerKm}/km</span>
        </div>
      </div>
    </div>
    <Button className="w-full">
      Book {vehicle.name}
    </Button>
  </div>
);