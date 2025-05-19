import { Client } from "@googlemaps/google-maps-services-js";
import * as Sentry from "@sentry/nextjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Initialize rate limiter
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  analytics: true,
});

// Initialize Google Maps client
const client = new Client({});

// Request validation schema
const requestSchema = z.object({
  query: z.string().min(2).max(100),
  language: z.string().optional(),
  sessionToken: z.string().optional(),
});

// Response validation schema
const placeSuggestionSchema = z.object({
  place_id: z.string(),
  description: z.string(),
  types: z.array(z.string()).optional(),
  matched_substrings: z.array(z.any()).optional(),
  terms: z.array(z.any()).optional(),
  reference: z.string().optional(),
});

const placesResponseSchema = z.object({
  predictions: z.array(placeSuggestionSchema),
  status: z.string(),
  error_message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `places_autocomplete_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests",
          limit,
          reset,
          remaining,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { query, language = "en", sessionToken } = requestSchema.parse(body);

    // Call Google Places API
    const response = await client.placeAutocomplete({
      params: {
        input: query,
        language,
        sessiontoken: sessionToken,
        key: process.env.GOOGLE_MAPS_API_KEY!,
        components: ["country:in"], // Restrict to India
        types: ["address", "establishment", "geocode"],
      },
    });

    // Validate response data
    const validatedData = placesResponseSchema.parse(response.data);

    if (validatedData.status !== "OK") {
      throw new Error(validatedData.error_message || "Invalid response from Places API");
    }

    // Return validated response
    return NextResponse.json(validatedData, {
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  } catch (error) {
    console.error("Places Autocomplete Error:", error);

    // Log error to Sentry
    Sentry.captureException(error, {
      tags: { component: "places-autocomplete-api" },
      extra: {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers),
      },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request parameters",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
          status: "ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch place suggestions",
        status: "ERROR",
      },
      { status: 500 }
    );
  }
} 