"use client";

import { useApi } from "./useApi";
import { toursService } from "@/api/services";
import { useCallback } from "react";

/**
 * Fetch all tours (public).
 */
export function useTours(options?: { enabled?: boolean }) {
  return useApi(() => toursService.getAll(), options);
}

/**
 * Fetch paginated tour packages summary list for tours listing page (public).
 * Returns { items, meta } with page, totalPages, hasNextPage, etc.
 */
export function useTourSummaryList(page: number, options?: { enabled?: boolean }) {
  const fetcher = useCallback(
    () => toursService.getSummaryList(page),
    [page]
  );
  return useApi(fetcher, { enabled: page >= 1, ...options });
}
