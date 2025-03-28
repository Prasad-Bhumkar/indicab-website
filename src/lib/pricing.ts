export function calculateFare(vehicleType: string, startDate: Date, endDate: Date): number {
  const dailyRates: Record<string, number> = {
    'economy': 50,
    'standard': 75,
    'premium': 100,
    'luxury': 150
  }

  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  return (dailyRates[vehicleType] || 0) * days
}