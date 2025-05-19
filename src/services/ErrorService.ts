import type { ErrorType } from "@/lib/services/errorService";
import type { ErrorContext } from "@/types/errors";

export interface AppError {
	id: string;
	message: string;
	type?: ErrorType;
	context?: ErrorContext;
}

export const ErrorService = {
	handleError: (
		error: Error,
		type: ErrorType,
		context: ErrorContext,
	): AppError => {
		console.error("Handled error:", error, type, context);
		return { id: "stub-error-id", message: error.message, type, context };
	},
	handle: (error: Error, type: ErrorType, context: ErrorContext): AppError => {
		console.error("Handled error:", error, type, context);
		return { id: "stub-error-id", message: error.message, type, context };
	},
	logInfo: (message: string, context: ErrorContext): void => {
		console.info("Log info:", message, context);
	},
};
