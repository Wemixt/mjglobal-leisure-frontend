"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";
import { reviewsService } from "@/api/services";

/**
 * Fetch paginated reviews list (e.g. limit 3 per page).
 */
export function useReviewsList(
  page: number,
  options?: { enabled?: boolean }
) {
  const fetcher = useCallback(
    () => reviewsService.getList(page),
    [page]
  );
  return useApi(fetcher, { enabled: page >= 1, ...options });
}
