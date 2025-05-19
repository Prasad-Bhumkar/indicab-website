"use client";

import { useCallback, useEffect, useState } from "react";
import type { Route } from "../../../../types/route";

// Popular cities for autocomplete
const _popularCities = [
	"Mumbai",
	"Pune",
	"Lonavala",
	"Mahabaleshwar",
	"Shirdi",
	"Nashik",
	"Alibaug",
	"Lavasa",
	"Aurangabad",
	"Matheran",
];

// Popular routes
const popularRoutes: Route[] = [
	{
		id: 1,
		from: "Mumbai",
		to: "Pune",
		description: "Quick trip from Mumbai to Pune",
		price: 2499, // Ensure price is a number
		image: "/images/mumbai-pune.jpg",
		distance: "150 km",
		duration: "3 hours",
		popular: true,
		fromCoordinates: [19.076, 72.8777],
		toCoordinates: [18.5204, 73.8567],
		vehicleTypes: ["Sedan", "SUV"],
		amenities: ["WiFi", "Water"],
		reviews: [],
	},
	{
		id: 2,
		from: "Pune",
		to: "Lonavala",
		description: "Enjoy a scenic drive to Lonavala",
		price: 1399, // Ensure price is a number
		image: "/images/pune-lonavala.jpg",
		distance: "65 km",
		duration: "1.5 hours",
		popular: true,
		fromCoordinates: [18.5204, 73.8567],
		toCoordinates: [18.7546, 73.4006],
		vehicleTypes: ["Hatchback", "Luxury"],
		amenities: ["AC", "Entertainment"],
		reviews: [],
	},
	{
		id: 3,
		from: "Pune",
		to: "Mahabaleshwar",
		description: "Visit the beautiful hill station",
		price: 2299, // Ensure price is a number
		image: "/images/pune-mahabaleshwar.jpg",
		distance: "120 km",
		duration: "3 hours",
		popular: true,
		fromCoordinates: [18.5204, 73.8567],
		toCoordinates: [17.9184, 73.6612],
		vehicleTypes: ["SUV", "Luxury"],
		amenities: ["WiFi", "Water"],
		reviews: [],
	},
	{
		id: 4,
		from: "Mumbai",
		to: "Alibaug",
		description: "Relax at the beach in Alibaug",
		price: 1999, // Ensure price is a number
		image: "/images/mumbai-alibaug.jpg",
		distance: "95 km",
		duration: "2.5 hours",
		popular: true,
		fromCoordinates: [19.076, 72.8777],
		toCoordinates: [18.6, 72.83],
		vehicleTypes: ["Sedan", "Hatchback"],
		amenities: ["AC", "Luggage Space"],
		reviews: [],
	},
];

interface RouteSelectionProps {
	onNext: () => void;
	onBack: () => void;
}

export const RouteSelection: React.FC<RouteSelectionProps> = ({
	onNext,
	onBack,
}) => {
	const [formData, setFormData] = useState({
		pickup: "",
		dropoff: "",
		date: new Date(),
		time: "",
		passengers: 1,
		vehicleType: "",
	});

	const [isValid, setIsValid] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleRouteSelect = (route: Route): void => {
		setFormData((prev) => ({
			...prev,
			pickup: route.from,
			dropoff: route.to,
		}));
	};

	const handleDateChange = (date: Date): void => {
		setFormData((prev) => ({
			...prev,
			date,
		}));
	};

	const handleTimeChange = (time: string): void => {
		setFormData((prev) => ({
			...prev,
			time,
		}));
	};

	const handlePassengersChange = (count: number): void => {
		setFormData((prev) => ({
			...prev,
			passengers: count,
		}));
	};

	const handleVehicleTypeChange = (type: string): void => {
		setFormData((prev) => ({
			...prev,
			vehicleType: type,
		}));
	};

	const handleSubmit = (): void => {
		if (validateForm()) {
			onNext();
		}
	};

	const validateForm = useCallback((): boolean => {
		const isValid =
			!!formData.pickup &&
			!!formData.dropoff &&
			formData.pickup !== formData.dropoff;
		setIsValid(isValid);
		return isValid;
	}, [formData, setIsValid]);

	useEffect(() => {
		validateForm();
	}, [validateForm]);

	return <div className="space-y-6">{/* Form content */}</div>;
};
