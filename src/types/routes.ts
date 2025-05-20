// Vehicle types used in the platform
export type VehicleType = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Electric';

// Amenities available for routes/vehicles
export type Amenity = 'WiFi' | 'Water' | 'Entertainment' | 'Charging' | 'AC' | 'Luggage Space' | 'Child Seat';

// User review for a route or vehicle
export interface Review {
  id: number;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

// Route definition
export interface Route {
  id: number;
  from: string;
  to: string;
  description: string;
  distance: string;
  duration: string;
  price: string;
  image: string;
  popular: boolean;
  fromCoordinates: [number, number];
  toCoordinates: [number, number];
  vehicleTypes: VehicleType[];
  amenities: Amenity[];
  reviews: Review[];
  coordinates: {
    from: { lat: number; lng: number };
    to: { lat: number; lng: number };
  };
} 