// Core application types
export type VehicleType = {
    id: string;
    name: string;
    image: string;
    capacity: number;
    pricePerKm: number;
    description: string;
};

export type BookingRequest = {
    vehicleTypeId: string;
    pickupLocation: string;
    destination: string;
    distance: number;
    passengers: number;
};
