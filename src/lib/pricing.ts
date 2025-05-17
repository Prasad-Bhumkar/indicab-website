export function calculateFare(_vehicleType: string, _startDate: Date, _endDate: Date): number {
    const _dailyRates: Record<string, number> = {
        'economy': 50,
        'standard': 75,
        'premium': 100,
        'luxury': 150
    }

    const _days = Math.ceil((_endDate.getTime() - _startDate.getTime()) / (1000 * 60 * 60 * 24))
    return (_dailyRates[_vehicleType] || 0) * _days
}
