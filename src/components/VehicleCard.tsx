import Link from 'next/link'

interface Vehicle {
  _id: string
  make: string
  model: string
  year: number
  type: string
  dailyRate: number
  imageUrl: string
  fuelType?: string
  transmission?: string
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <img 
          src={vehicle.imageUrl || '/assets/cars/default-car.jpg'}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/cars/default-car.jpg'
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-gray-600">{vehicle.year}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {vehicle.type}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {vehicle.fuelType && `${vehicle.fuelType} • `}
              {vehicle.transmission}
            </p>
            <p className="text-xl font-bold text-blue-600">
              ${vehicle.dailyRate}<span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
          <Link
            href={`/vehicles/${vehicle._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}