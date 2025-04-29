import { NextRequest, NextResponse } from 'next/server';
import { ErrorHandler, AppError, ValidationError, ErrorType, ErrorContext } from '../errors/errorHandler';
import { ZodError } from 'zod';

/**
 * Wraps an API route handler with standardized error handling
 * @param handler The API route handler function
 * @returns A wrapped handler with error handling
 */
export function withErrorHandling<T extends Record<string, any> = {}>(
  handler: (req: NextRequest, context?: T) => Promise<Response> | Response
) {
  return async function(req: NextRequest, context?: T): Promise<Response> {
    try {
      return await handler(req, context);
    } catch (error) {
      // Create context with request information
      const errorContext: ErrorContext = {
        url: req.url,
        method: req.method,
        headers: Object.fromEntries(req.headers.entries()),
        timestamp: new Date(),
        // Include any additional context passed to the handler
        ...(context || {})
      };

      // Handle the error
      const appError = await ErrorHandler.handleError(error, errorContext);
      
      // Return appropriate response
      return NextResponse.json(
        { 
          error: {
            message: appError.message,
            code: appError.code,
            type: appError.type,
            ...(appError instanceof ValidationError && appError.details ? { details: appError.details } : {})
          }
        },
        { status: appError.statusCode }
      );
    }
  };
}

/**
 * Handles Zod validation errors
 * @param error The Zod validation error
 * @param context Additional context for the error
 * @returns A ValidationError instance
 */
export function handleZodError(error: ZodError, context: ErrorContext = {}): ValidationError {
  const fieldErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    fieldErrors[path] = err.message;
  });
  
  return ErrorHandler.createValidationError(
    'Validation failed',
    fieldErrors,
    context
  );
}

/**
 * Example usage in an API route:
 * 
 * ```typescript
 * import { withErrorHandling, handleZodError } from '@/lib/api/apiErrorHandler';
 * import { z } from 'zod';
 * 
 * // Define validation schema
 * const BookingSchema = z.object({
 *   name: z.string().min(2, "Name must be at least 2 characters"),
 *   email: z.string().email("Invalid email address"),
 *   pickup: z.string(),
 *   dropoff: z.string(),
 *   date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
 * });
 * 
 * export const POST = withErrorHandling(async (req: NextRequest) => {
 *   const data = await req.json();
 *   
 *   // Validate with Zod
 *   try {
 *     const validatedData = BookingSchema.parse(data);
 *     
 *     // Process booking...
 *     const result = await createBooking(validatedData);
 *     
 *     return NextResponse.json(result, { status: 201 });
 *   } catch (error) {
 *     if (error instanceof ZodError) {
 *       throw handleZodError(error, { action: 'create_booking' });
 *     }
 *     throw error;
 *   }
 * });
 * ```
 */