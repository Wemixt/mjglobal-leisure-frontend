"use client";

import { useApi } from "./useApi";
import { toursService } from "@/api/services";

/**
 * Fetch all tours (public).
 */
export function useTours(options?: { enabled?: boolean }) {
  return useApi(() => toursService.getAll(), options);
}
