'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import BookingForm from '@/components/BookingForm'

interface Vehicle {
  _id: string
  make: string
  model: string
  year: number
  type: string
  dailyRate: number
  imageUrl: string
  seatingCapacity: number
  fuelType: string
  transmission: string
  features: string[]
}

export default function VehicleDetails({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`/api/vehicles/${params.id}`)
        const data = await res.json()
        setVehicle(data)
      } catch (error) {
        console.error('Error fetching vehicle:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVehicle()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!vehicle) {
    return <div className="text-center py-8">Vehicle not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={vehicle.imageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {vehicle.type}
            </span>
            <span className="text-gray-600">${vehicle.dailyRate}/day</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="font-semibold text-gray-500">Fuel Type</h3>
              <p className="capitalize">{vehicle.fuelType}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">Transmission</h3>
              <p className="capitalize">{vehicle.transmission}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">Seating</h3>
              <p>{vehicle.seatingCapacity} people</p>
            </div>
          </div>

          {vehicle.features && vehicle.features.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-500 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          <BookingForm vehicleId={vehicle._id} dailyRate={vehicle.dailyRate} />
        </div>
      </div>
    </div>
  )
}