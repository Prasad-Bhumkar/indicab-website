/**
 * Represents the data submitted through the booking form
 */
export interface BookingFormData {
    pickupLocation: string;
    dropLocation: string;
    pickupDate: string; // ISO date string
    returnDate?: string; // ISO date string, optional for one-way trips
    vehicleType: string;
    passengers?: number;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    specialRequests?: string;
}

/**
 * Represents a booking in the system with additional metadata
 */
export interface Booking extends BookingFormData {
    bookingId: string;
    status: BookingStatus;
    paymentStatus?: PaymentStatus;
    totalAmount?: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

/**
 * Possible booking statuses
 */
export type BookingStatus = 
    | 'pending'
    | 'confirmed'
    | 'in-progress'
    | 'completed'
    | 'cancelled';

/**
 * Possible payment statuses
 */
export type PaymentStatus =
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'refunded';

/**
 * Booking search and filter parameters
 */
export interface BookingSearchParams {
    status?: BookingStatus;
    fromDate?: string;
    toDate?: string;
    vehicleType?: string;
    contactEmail?: string;
    contactPhone?: string;
    limit?: number;
    page?: number;
}
