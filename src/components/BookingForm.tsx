"use client";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Sentry from "@sentry/nextjs";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import * as z from "zod";

import ErrorBoundary from '@/components/common/ErrorBoundary';

import { useAuthContext } from "../context/AuthContext";
import type { BookingState } from "../context/BookingContext";
import { BookingContext } from "../context/BookingContext";
import { calculateFare } from "../lib/pricing";
import { createBooking } from "../services/booking/api";

import _BookingProgress from "./BookingProgress";
import { DateRangePicker } from "./DateRangePicker";
import PaymentStep from "./PaymentStep";
import { VehicleTypeSelector } from "./VehicleTypeSelector";
import LocationSearch from "./booking/LocationSearch";

// Enhanced validation schema
const bookingSchema = z.object({
	pickup: z.string().min(1, "Pickup location is required"),
	destination: z.string().min(1, "Destination is required"),
	startDate: z.date().min(new Date(), "Start date must be in the future"),
	endDate: z.date(),
	vehicleType: z.string().min(1, "Vehicle type is required"),
}).refine((data) => data.startDate < data.endDate, {
	message: "End date must be after start date",
	path: ["endDate"],
}).refine((data) => data.pickup.toLowerCase() !== data.destination.toLowerCase(), {
	message: "Pickup and destination cannot be the same",
	path: ["destination"],
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm(): JSX.Element {
	const router = useRouter();
	const { user } = useAuthContext();
	const { dispatch } = useContext(BookingContext);
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const { t } = useTranslation();

	// Add default vehicle types
	const vehicleTypes = useMemo(() => [
		{
			id: 'sedan',
			name: 'Sedan',
			description: 'Comfortable sedan for city and highway travel',
			price: 2000,
			image: '/images/vehicles/sedan.png',
		},
		{
			id: 'suv',
			name: 'SUV',
			description: 'Spacious SUV for family and group trips',
			price: 3000,
			image: '/images/vehicles/suv.png',
		},
		{
			id: 'hatchback',
			name: 'Hatchback',
			description: 'Economical hatchback for short trips',
			price: 1500,
			image: '/images/vehicles/hatchback.png',
		},
	], []);

	// Memoized error handler
	const handleError = useCallback((error: unknown) => {
		console.error("BookingForm error:", error);
		const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
		setError(errorMessage);
		Sentry.captureException(error, {
			tags: { component: "BookingForm" },
			extra: { step, loading },
		});
		toast.error(errorMessage);
	}, [step, loading]);

	// Memoized default values
	const defaultValues = useMemo(() => ({
		pickup: "",
		destination: "",
		startDate: new Date(),
		endDate: new Date(Date.now() + 86400000),
		vehicleType: "",
	}), []);

	// Move useForm above useEffect
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting },
		setValue,
		trigger,
	} = useForm<BookingFormData>({
		resolver: zodResolver(bookingSchema),
		defaultValues,
		mode: "onChange",
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				const savedData = {
					pickup: localStorage.getItem("booking_pickup") || "",
					destination: localStorage.getItem("booking_destination") || "",
					startDate: new Date(localStorage.getItem("booking_startDate") || Date.now()),
					endDate: new Date(localStorage.getItem("booking_endDate") || Date.now() + 86400000),
					vehicleType: localStorage.getItem("booking_vehicleType") || "",
				};
				Object.entries(savedData).forEach(([key, value]) => {
					setValue(key as keyof BookingFormData, value);
				});
			} catch (err) {
				handleError(err);
			}
		}
	}, [setValue, handleError]);

	// Memoized form data persistence
	const persistFormData = useCallback((data: Partial<BookingFormData>) => {
		try {
			Object.entries(data).forEach(([key, value]) => {
				if (value instanceof Date) {
					localStorage.setItem(`booking_${key}`, value.toISOString());
				} else if (typeof value === "string") {
					localStorage.setItem(`booking_${key}`, value);
				}
			});
		} catch (err) {
			handleError(err);
		}
	}, [handleError]);

	// Memoized form submission
	const onSubmit = useCallback(async (data: BookingFormData) => {
		if (!user) {
			toast.error(t("Please login to continue booking"));
			router.push("/auth/login");
			return;
		}

		Sentry.addBreadcrumb({
			category: "booking",
			message: "Booking submission started",
			level: "info",
		});

		setLoading(true);
		try {
			const fare = calculateFare(data.vehicleType, data.startDate, data.endDate);
			const bookingData = {
				pickupLocation: data.pickup,
				dropLocation: data.destination,
				pickupDate: data.startDate.toISOString(),
				returnDate: data.endDate.toISOString(),
				vehicleType: data.vehicleType,
				customerId: user.id,
				fare,
				status: "pending" as const,
			};

			const bookingResponse = await createBooking(bookingData);
			persistFormData(data);

			Sentry.captureMessage("Booking created successfully", "info");
			toast.success(t("Booking created successfully"));

			const bookingState: BookingState = {
				id: bookingResponse.id || "",
				pickupLocation: data.pickup,
				dropLocation: data.destination,
				pickupDate: data.startDate.toISOString(),
				returnDate: data.endDate.toISOString(),
				vehicleType: data.vehicleType,
				fare: bookingResponse.fare || 0,
				customerId: user.id,
				status: "pending",
			};

			dispatch({
				type: "SET_BOOKING",
				payload: bookingState,
			});
			setStep(2);
		} catch (err: unknown) {
			handleError(err);
		} finally {
			setLoading(false);
		}
	}, [user, router, dispatch, persistFormData, handleError, t]);

	// Memoized form fields
	const formFields = useMemo(() => (
		<div className="space-y-4">
			<LocationSearch
				name="pickup"
				control={control}
				label={t("Pickup Location")}
				placeholder={t("Enter pickup location")}
				error={errors.pickup}
				disabled={loading}
				aria-required="true"
				aria-invalid={errors.pickup ? "true" : "false"}
				aria-describedby={errors.pickup ? "pickup-error" : undefined}
			/>

			{errors.pickup && (
				<span
					id="pickup-error"
					role="alert"
					className="text-red-600 text-sm mt-1"
				>
					{errors.pickup.message}
				</span>
			)}

			<LocationSearch
				name="destination"
				control={control}
				label={t("Destination")}
				placeholder={t("Enter destination")}
				error={errors.destination}
				disabled={loading}
				aria-required="true"
				aria-invalid={errors.destination ? "true" : "false"}
				aria-describedby={errors.destination ? "destination-error" : undefined}
			/>

			{errors.destination && (
				<span
					id="destination-error"
					role="alert"
					className="text-red-600 text-sm mt-1"
				>
					{errors.destination.message}
				</span>
			)}

			<DateRangePicker
				control={control}
				startDateName="startDate"
				endDateName="endDate"
				errors={errors}
				disabled={loading}
			/>

			<VehicleTypeSelector
				control={control}
				name="vehicleType"
				error={errors.vehicleType}
				disabled={loading}
				vehicleTypes={vehicleTypes}
			/>
		</div>
	), [control, errors, loading, t, vehicleTypes]);

	return (
		<ErrorBoundary
			onError={handleError}
			fallback={
				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-lg font-medium text-red-800 mb-4">
						{t("Booking Error")}
					</h3>
					<p className="text-red-700 mb-4">
						{t("We encountered an issue loading the booking form. Please try refreshing the page.")}
					</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
					>
						{t("Refresh Page")}
					</button>
				</div>
			}
		>
			<div className="bg-white rounded-lg shadow-md p-6">
				<_BookingProgress currentStep={step} />
				<div className="flex mb-6">
					{[1, 2].map((i) => (
						<div key={i} className="flex-1">
							<div
								className={`h-2 rounded-full transition-colors duration-200 ${
									step >= i ? "bg-blue-600" : "bg-gray-200"
								}`}
							/>
							<p
								className={`text-sm mt-2 transition-colors duration-200 ${
									step >= i ? "text-blue-600 font-medium" : "text-gray-500"
								}`}
							>
								{i === 1 ? t("Trip Details") : t("Payment")}
							</p>
						</div>
					))}
				</div>

				{error && (
					<div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm" role="alert">
						{error}
					</div>
				)}

				{step === 1 ? (
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{formFields}
						<button
							type="submit"
							disabled={loading || isSubmitting}
							className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
							aria-busy={loading || isSubmitting}
						>
							{loading || isSubmitting ? t("Processing...") : t("Continue to Payment")}
						</button>
					</form>
				) : (
					<PaymentStep onBack={() => setStep(1)} />
				)}
			</div>
		</ErrorBoundary>
	);
}
