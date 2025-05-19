import * as Sentry from "@sentry/nextjs";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { z } from "zod";

// Response validation schema
const placeSuggestionSchema = z.object({
  place_id: z.string(),
  description: z.string(),
});

const placesResponseSchema = z.object({
  predictions: z.array(placeSuggestionSchema),
  status: z.string(),
  error_message: z.string().optional(),
});

interface PlaceSuggestion {
  place_id: string;
  description: string;
}

interface PlacesAutocompleteResult {
  suggestions: PlaceSuggestion[];
  loading: boolean;
  error: Error | null;
}

export function usePlacesAutocomplete(
  query: string,
  sessionToken?: string
): PlacesAutocompleteResult {
  const { i18n } = useTranslation();
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSuggestions = async () => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/places/autocomplete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            language: i18n.language,
            sessionToken,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch place suggestions");
        }

        const data = await response.json();
        
        // Validate response data
        const validatedData = placesResponseSchema.parse(data);

        if (validatedData.status !== "OK") {
          throw new Error(validatedData.error_message || "Invalid response from Places API");
        }

        if (isMounted) {
          setSuggestions(validatedData.predictions);
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error("Unknown error");
          setError(error);
          setSuggestions([]);

          // Log error to Sentry
          Sentry.captureException(error, {
            tags: { component: "usePlacesAutocomplete" },
            extra: { query, language: i18n.language },
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [query, i18n.language, sessionToken]);

  return { suggestions, loading, error };
} 