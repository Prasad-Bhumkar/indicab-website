export interface BookingFormData {
  pickup: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  vehicleType: string;
  fare: number;
  customerId: string;
  status?: string;
}