"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";
import { destinationsService } from "@/api/services";

/**
 * Fetch all destinations (public).
 */
export function useDestinations(options?: { enabled?: boolean }) {
  return useApi(() => destinationsService.getAll(), options);
}

/**
 * Fetch paginated destination summary list for destinations listing page (public).
 */
export function useDestinationSummaryList(
  page: number,
  options?: { enabled?: boolean }
) {
  const fetcher = useCallback(
    () => destinationsService.getSummaryList(page),
    [page]
  );
  return useApi(fetcher, { enabled: page >= 1, ...options });
}
