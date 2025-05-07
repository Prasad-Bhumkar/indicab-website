import Link from 'next/link'
import Image from '../optimized/Image'

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
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          fallback="/assets/cars/default-car.jpg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            <div className="flex gap-2 mb-1">
              {vehicle.fuelType && (
                <span className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1h2a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h2V4zm2 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  {vehicle.fuelType}
                </span>
              )}
              {vehicle.transmission && (
                <span className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {vehicle.transmission}
                </span>
              )}
            </div>
            <p className="text-xl font-bold text-blue-600">
              ${vehicle.dailyRate}<span className="text-sm font-normal text-gray-500">/day</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              + ${Math.round(vehicle.dailyRate * 0.15)} taxes & fees
            </p>
          </div>
          <Link
            href={`/vehicles/${vehicle._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
