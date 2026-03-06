"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";
import { galleryService } from "@/api/services";

/**
 * Fetch paginated gallery images list for the gallery page.
 */
export function useGalleryList(
  page: number,
  options?: { enabled?: boolean }
) {
  const fetcher = useCallback(
    () => galleryService.getList(page),
    [page]
  );
  return useApi(fetcher, { enabled: page >= 1, ...options });
}
