import { VehicleType, BookingRequest } from './types';

export const API_BASE_URL = '/api';

export const getVehicles = async (): Promise<VehicleType[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/vehicles`);
        if (!response.ok) throw new Error('Failed to fetch vehicles');
        return await response.json();
    } catch (error) {
        console.error('Vehicle API Error:', error);
        throw error;
    }
};

export const submitBooking = async (_booking: BookingRequest): Promise<{ success: boolean }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_booking)
        });

        if (!response.ok) throw new Error('Booking submission failed');
        return await response.json();
    } catch (error) {
        console.error('Booking API Error:', error);
        throw error;
    }
};
