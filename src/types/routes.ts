export type VehicleType = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Electric';

export type Amenity = 'WiFi' | 'Water' | 'Entertainment' | 'Charging' | 'AC' | 'Luggage Space' | 'Child Seat';

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

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

export type VehicleType = 'Sedan' | 'SUV' | 'Luxury' | 'Van' | 'Bus';

export type Amenity = 
  | 'AC' 
  | 'WiFi' 
  | 'Entertainment' 
  | 'Refreshments' 
  | 'Charging Points' 
  | 'Luggage Space' 
  | 'Child Seat' 
  | 'Pet Friendly';

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

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
