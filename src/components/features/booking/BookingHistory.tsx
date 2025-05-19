"use client";

import { Button } from '@/components/ui/button';
import type { BookingStatus, BookingType } from '@/lib/types/booking';
import { cancelBooking, fetchBookings, modifyBooking } from '@/services/booking/bookingService';
import { Calendar, Car, CheckCircle, MapPin, XCircle } from 'lucide-react';
import { type ReactElement, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

type BookingHistoryProps = {
	bookings: BookingType[];
	onCancel?: (bookingId: string) => void;
};

const BookingHistory = ({ bookings, onCancel }: BookingHistoryProps): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [bookingsState, setBookings] = useState<BookingType[]>(bookings);
	const [cancellingId, setCancellingId] = useState<string | null>(null);
	const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">("all");

	const filteredBookings = useMemo((): BookingType[] => {
		return activeFilter === "all"
			? bookingsState
			: bookingsState.filter((booking) => booking.status === activeFilter);
	}, [activeFilter, bookingsState]);

	const refreshBookings = useCallback(async (): Promise<void> => {
		setIsLoading(true);
		setError(null);
		try {
			const userId = "123"; // In a real app, get from auth context
			const data = await fetchBookings(userId);
			setBookings(data);
		} catch (err) {
			setError("Failed to load bookings");
			toast.error("Failed to load bookings");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleCancel = useCallback(
		async (bookingId: string): Promise<void> => {
			setCancellingId(bookingId);
			try {
				await cancelBooking(bookingId);
				toast.success("Booking cancelled successfully");
				await refreshBookings();
				onCancel?.(bookingId);
			} catch (error) {
				toast.error("Failed to cancel booking");
			} finally {
				setCancellingId(null);
			}
		},
		[refreshBookings, onCancel],
	);

	const handleModify = useCallback(
		async (bookingId: string, changes: Partial<BookingType>): Promise<void> => {
			try {
				const updatedBooking = await modifyBooking(bookingId, changes);
				toast.success("Booking updated successfully");
				setBookings((prev) =>
					prev.map((b) => (b.id === bookingId ? updatedBooking : b)),
				);
			} catch (error) {
				toast.error("Failed to modify booking");
			}
		},
		[],
	);

	if (isLoading) return <div>Loading bookings...</div>;
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<div className="space-y-6">
			<div className="flex space-x-2 overflow-x-auto pb-2">
				<Button
					variant={activeFilter === "all" ? "default" : "outline"}
					onClick={(): void => setActiveFilter("all")}
				>
					All Bookings
				</Button>
				<Button
					variant={activeFilter === "upcoming" ? "default" : "outline"}
					onClick={(): void => setActiveFilter("upcoming")}
				>
					Upcoming
				</Button>
				<Button
					variant={activeFilter === "completed" ? "default" : "outline"}
					onClick={(): void => setActiveFilter("completed")}
				>
					Completed
				</Button>
				<Button
					variant={activeFilter === "cancelled" ? "default" : "outline"}
					onClick={(): void => setActiveFilter("cancelled")}
				>
					Cancelled
				</Button>
			</div>

			<div className="space-y-4">
				{filteredBookings.map(
					(booking): ReactElement => (
						<div key={booking.id} className="border rounded-lg p-4">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-medium flex items-center">
										{booking.status === "completed" && (
											<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
										)}
										{booking.status === "cancelled" && (
											<XCircle className="h-4 w-4 text-red-500 mr-2" />
										)}
										{booking.id}
									</h3>
									<div className="flex items-center text-sm text-gray-500 mt-1">
										<Calendar className="h-4 w-4 mr-1" />
										<span>
											{booking.date} at {booking.time}
										</span>
									</div>
								</div>
								<span
									className={`px-2 py-1 rounded text-xs ${
										booking.status === "completed"
											? "bg-green-100 text-green-800"
											: booking.status === "cancelled"
												? "bg-red-100 text-red-800"
												: "bg-blue-100 text-blue-800"
									}`}
								>
									{booking.status}
								</span>
							</div>

							<div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="flex items-start">
									<MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
									<div>
										<h4 className="font-medium text-sm">Route</h4>
										<p className="text-gray-600 text-sm mt-1">
											{booking.origin} → {booking.destination}
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<Car className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
									<div>
										<h4 className="font-medium text-sm">Vehicle</h4>
										<p className="text-gray-600 text-sm mt-1">
											{booking.carType} • {booking.fare}
										</p>
									</div>
								</div>
							</div>

							{booking.driver && booking.status === "upcoming" && (
								<div className="mt-3 pt-3 border-t">
									<h4 className="font-medium text-sm mb-2">Driver Details</h4>
									<div className="flex items-center justify-between">
										<div>
											<p className="text-gray-600 text-sm">
												{booking.driver.name}
											</p>
											<p className="text-gray-500 text-xs">
												{booking.driver.contact}
											</p>
										</div>
										<Button variant="outline" size="sm">
											Contact
										</Button>
									</div>
								</div>
							)}

							{booking.status === "upcoming" && (
								<div className="mt-4 flex space-x-2">
									<Button
										variant="outline"
										size="sm"
										className="flex-1"
										onClick={(): void =>
											handleModify(booking.id, {
												/* changes */
											})
										}
									>
										Modify
									</Button>
									<Button
										variant="destructive"
										size="sm"
										className="flex-1"
										onClick={(): void => handleCancel(booking.id)}
									>
										{cancellingId === booking.id ? "Cancelling..." : "Cancel"}
									</Button>
								</div>
							)}
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default BookingHistory;

