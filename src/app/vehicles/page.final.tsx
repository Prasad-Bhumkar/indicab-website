'use client'
import { useEffect, useState } from 'react'
import VehicleCard from '../../components/VehicleCard' // Verified relative path

interface Vehicle {
  _id: string
  make: string
  model: string
  year: number
  type: string
  dailyRate: number
  imageUrl: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch('/api/vehicles')
        const data = await res.json()
        setVehicles(data)
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVehicles()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Vehicles</h1>
        <div className="flex space-x-4">
          <select className="border rounded px-3 py-2">
            <option>Filter by Type</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Luxury</option>
          </select>
          <input 
            type="text" 
            placeholder="Search vehicles..." 
            className="border rounded px-3 py-2 w-64"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  )
}