"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";
import { toursService } from "@/api/services";

/**
 * Fetch a single tour by slug (public).
 */
export function useTourBySlug(slug: string | null, options?: { enabled?: boolean }) {
  const fetcher = useCallback(
    () => toursService.getBySlug(slug!),
    [slug]
  );
  return useApi(fetcher, { enabled: !!slug, ...options });
}
