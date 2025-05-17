export const calculateFare = (vehicleType: string, _startDate: Date, _endDate: Date): number => {
    // Placeholder implementation for fare calculation
    const _baseFare = 100; // Base fare
    const _farePerHour = 20; // Fare per hour
    const _durationInHours = (_endDate.getTime() - _startDate.getTime()) / (1000 * 60 * 60);

    return _baseFare + (_farePerHour * _durationInHours);
};
