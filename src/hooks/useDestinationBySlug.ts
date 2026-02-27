"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";
import { destinationsService } from "@/api/services";

/**
 * Fetch a single destination by slug (public).
 */
export function useDestinationBySlug(
  slug: string | null,
  options?: { enabled?: boolean }
) {
  const fetcher = useCallback(
    () => destinationsService.getBySlug(slug!),
    [slug]
  );
  return useApi(fetcher, { enabled: !!slug, ...options });
}
