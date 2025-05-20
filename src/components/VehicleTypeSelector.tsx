"use client";

import type React from "react";

import type { Control, FieldError } from "react-hook-form";

interface VehicleType {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

interface VehicleTypeSelectorProps {
	control: Control<Record<string, unknown>>;
	error?: FieldError;
	vehicleTypes: VehicleType[];
}

export const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
	control,
	error,
	vehicleTypes,
}) => {
	return (
		<div className="space-y-4">
			<label className="block text-sm font-medium text-gray-700">
				Select Vehicle Type
			</label>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{vehicleTypes.map((type) => (
					<div
						key={type.id}
						className="relative rounded-lg border p-4 hover:border-green-500 cursor-pointer"
					>
						<input
							type="radio"
							value={type.id}
							className="sr-only"
							{...control.register("vehicleType", {
								required: "Please select a vehicle type",
							})}
						/>
						<div className="flex items-center space-x-4">
							<img
								src={type.image}
								alt={type.name}
								className="w-16 h-16 object-cover rounded"
							/>
							<div>
								<h3 className="text-lg font-medium">{type.name}</h3>
								<p className="text-sm text-gray-500">{type.description}</p>
								<p className="text-sm font-medium text-green-600">
									₹{type.price}/day
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			{error && <p className="text-sm text-red-600">{error.message}</p>}
		</div>
	);
};
