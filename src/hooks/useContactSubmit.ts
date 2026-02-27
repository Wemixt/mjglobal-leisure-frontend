"use client";

import { useState, useCallback } from "react";
import { contactService, type ContactPayload } from "@/api/services";
import { ClientError } from "@/api/client";

export interface UseContactSubmitState {
  submit: (payload: ContactPayload) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

/**
 * Hook for contact form submission (public).
 * Returns submit function, loading, error, and success state.
 */
export function useContactSubmit(): UseContactSubmitState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (payload: ContactPayload): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await contactService.submit(payload);
      setSuccess(result?.success ?? true);
      return result?.success ?? true;
    } catch (e) {
      const message =
        e instanceof ClientError ? e.message : "Something went wrong";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return { submit, isLoading, error, success, reset };
}
