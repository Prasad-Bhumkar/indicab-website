// Type definitions for routes in the application
export interface Route {
  id: string;
  title: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  fare: number;
  stops?: string[];
  description?: string;
  image: string;
  popular: boolean;
  slug: string;
}

export interface RouteDetail {
  id: string;
  fromCity: string;
  toCity: string;
  distance: string;
  duration: string;
  baseFare: number;
  taxRate: number;
  featured: boolean;
  image: string;
  description: string;
  stops: string[];
  highlights: string[];
  returnAvailable: boolean;
  vehicles: Vehicle[];
  pickupPoints: PickupPoint[];
  dropoffPoints: PickupPoint[];
  faqs: FAQ[];
  slug: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: number;
  fare: number;
  features: string[];
  image: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  time: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}
