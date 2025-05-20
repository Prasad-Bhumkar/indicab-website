export const calculateFare = (_startDate: Date, _endDate: Date, options?: { vehicleType?: string }): number => {
  // Calculate the number of days
  const durationMs = _endDate.getTime() - _startDate.getTime();
  const days = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
  
  // Default base fare
  let baseFare = 1000; // ₹1000 per day
  
  // Apply vehicle type multiplier if provided
  if (options?.vehicleType) {
    switch (options.vehicleType.toLowerCase()) {
      case 'sedan':
        baseFare = 1000;
        break;
      case 'suv':
        baseFare = 1500;
        break;
      case 'luxury':
        baseFare = 3000;
        break;
      case 'hatchback':
        baseFare = 800;
        break;
      default:
        baseFare = 1000;
    }
  }
  
  // Calculate total fare
  const totalFare = baseFare * days;
  
  return totalFare;
};
