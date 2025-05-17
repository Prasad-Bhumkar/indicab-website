export interface Route {
    id: number;
    from: string;
    to: string;
    price: number;
    distance: string;
    duration: string;
    vehicleTypes: VehicleType[];
    amenities: Amenity[];
    image: string;
    description: string;
    popular?: boolean;
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
