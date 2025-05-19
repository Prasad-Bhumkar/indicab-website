import mongoose, { Schema, type Document } from "mongoose";

export interface IAnalyticsEvent extends Document {
	category: string;
	action: string;
	label?: string;
	value?: number;
	userId?: string;
	userRole?: string;
	userType?: string;
	properties?: Record<string, unknown>;
	timestamp: Date;
	createdAt: Date;
	updatedAt: Date;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>(
	{
		category: {
			type: String,
			required: true,
			index: true,
		},
		action: {
			type: String,
			required: true,
			index: true,
		},
		label: {
			type: String,
			index: true,
		},
		value: {
			type: Number,
		},
		userId: {
			type: String,
			index: true,
		},
		userRole: {
			type: String,
			index: true,
		},
		userType: {
			type: String,
			index: true,
		},
		properties: {
			type: Schema.Types.Mixed,
		},
		timestamp: {
			type: Date,
			default: Date.now,
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

// Create compound indexes for common queries
AnalyticsEventSchema.index({ category: 1, action: 1, timestamp: -1 });
AnalyticsEventSchema.index({ userId: 1, timestamp: -1 });
AnalyticsEventSchema.index({ category: 1, timestamp: -1 });

export const AnalyticsEvent =
	mongoose.models.AnalyticsEvent ||
	mongoose.model<IAnalyticsEvent>("AnalyticsEvent", AnalyticsEventSchema);
