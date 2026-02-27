"use client";

import { useCallback } from "react";
import { useApi } from "./useApi";
import { blogService } from "@/api/services";

/**
 * Fetch all blog posts (public).
 */
export function useBlogPosts(options?: { enabled?: boolean }) {
  return useApi(() => blogService.getAll(), options);
}

/**
 * Fetch paginated blog summary list for blog listing page (public).
 * Returns { items, meta } with page, totalPages, hasNextPage, etc.
 */
export function useBlogSummaryList(page: number, options?: { enabled?: boolean }) {
  const fetcher = useCallback(
    () => blogService.getSummaryList(page),
    [page]
  );
  return useApi(fetcher, { enabled: page >= 1, ...options });
}

/**
 * Fetch a single blog post by slug (public).
 */
export function useBlogPostBySlug(
  slug: string | null,
  options?: { enabled?: boolean }
) {
  const fetcher = useCallback(
    () => blogService.getBySlug(slug!),
    [slug]
  );
  return useApi(fetcher, { enabled: !!slug, ...options });
}
