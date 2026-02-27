"use client";

import { useState, useEffect, useCallback } from "react";
import { ClientError } from "@/api/client";

export interface UseApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
}

/**
 * Generic hook for GET-style API calls (public routes).
 * Use for list/single resource fetching.
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  options?: { enabled?: boolean }
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (e) {
      const message =
        e instanceof ClientError ? e.message : "Something went wrong";
      setError(message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}
