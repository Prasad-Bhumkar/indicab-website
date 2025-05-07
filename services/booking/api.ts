import { VehicleType } from '../../src/types/vehicle';
import { BookingFormData } from '../../src/types/booking';

export const API_BASE_URL = '/api';

import logger from '../../lib/logger';
import { getCachedData, cacheData } from '../../src/lib/redis';

export const getVehicles = async (): Promise<VehicleType[]> => {
  const cacheKey = 'vehicles_list';
  try {
    const cachedVehicles = await getCachedData<VehicleType[]>(cacheKey);
    if (cachedVehicles) {
      return cachedVehicles;
    }
    const response = await fetch(`${API_BASE_URL}/vehicles`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    const vehicles = await response.json();
    await cacheData(cacheKey, vehicles, 3600); // Cache for 1 hour
    return vehicles;
  } catch (error) {
    logger.error('Vehicle API Error:', error);
    throw error;
  }
};

export const submitBooking = async (booking: BookingFormData): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });

    if (!response.ok) throw new Error('Booking submission failed');
    return await response.json();
  } catch (error) {
    logger.error('Booking API Error:', error);
    throw error;
  }
};
