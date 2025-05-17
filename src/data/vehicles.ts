import { VehicleType } from '../types/vehicle'

export const vehicleTypes: VehicleType[] = [
    {
        id: 'sedan',
        name: 'Sedan',
        image: '/assets/cars/sedan.png',
        price: 50,
        capacity: 4,
        features: ['AC', '4 Seats', 'Automatic']
    },
    {
        id: 'suv',
        name: 'SUV',
        image: '/assets/cars/suv.png',
        price: 70,
        capacity: 6,
        features: ['AC', '6 Seats', 'Spacious']
    },
    {
        id: 'luxury',
        name: 'Luxury',
        image: '/assets/cars/luxury.png',
        price: 100,
        capacity: 4,
        features: ['Premium', 'Leather Seats', 'Chauffeur']
    },
    {
        id: 'minivan',
        name: 'Minivan',
        image: '/assets/cars/minivan.png',
        price: 80,
        capacity: 8,
        features: ['AC', '8 Seats', 'Family']
    },
    {
        id: 'hatchback',
        name: 'Hatchback',
        image: '/assets/cars/hatchback.png',
        price: 45,
        capacity: 4,
        features: ['Compact', 'Economical', 'City']
    }
]
