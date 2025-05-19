import mongoose, { type Document, Schema } from "mongoose";

export interface IDriver extends Document {
	name: string;
	email: string;
	phone: string;
	licenseNumber: string;
	status: "active" | "inactive" | "suspended";
	rating: number;
	totalTrips: number;
	createdAt: Date;
	updatedAt: Date;
}

const DriverSchema = new Schema<IDriver>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true },
		licenseNumber: { type: String, required: true, unique: true },
		status: {
			type: String,
			enum: ["active", "inactive", "suspended"],
			default: "active",
		},
		rating: { type: Number, default: 0 },
		totalTrips: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

export const Driver =
	mongoose.models.Driver || mongoose.model<IDriver>("Driver", DriverSchema);
