// Vehicle types used in the platform
export type VehicleType =
  | 'Hatchback'
  | 'Sedan'
  | 'SUV'
  | 'Luxury'
  | 'Electric'
  | 'Van'
  | 'Bus';

// Amenities available for routes/vehicles
export type Amenity =
  | 'AC'
  | 'WiFi'
  | 'Entertainment'
  | 'Refreshments'
  | 'Charging'
  | 'Charging Points'
  | 'Luggage Space'
  | 'Child Seat'
  | 'Pet Friendly'
  | 'Water';

// User review for a route or vehicle
export interface Review {
  id: number;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

// Coordinates for mapping
export interface Coordinates {
  lat: number;
  lng: number;
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
  vehicleTypes: VehicleType[];
  amenities: Amenity[];
  reviews: Review[];
  coordinates: {
    from: Coordinates;
    to: Coordinates;
  };
  fromCoordinates?: [number, number];
  toCoordinates?: [number, number];
}

export interface Route {
    id: number;
    from: string;
    to: string;
    price: string;
    distance: string;
    duration: string;
    vehicleTypes: VehicleType[];
    amenities: Amenity[];
    image: string;
    description: string;
    popular: boolean;
    fromCoordinates: [number, number];
    toCoordinates: [number, number];
    reviews: Review[];
}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    userName: string;
    date: string;
}

export type VehicleType = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Electric';

export type Amenity = 'WiFi' | 'Water' | 'Entertainment' | 'Charging' | 'AC' | 'Luggage Space' | 'Child Seat'; 
