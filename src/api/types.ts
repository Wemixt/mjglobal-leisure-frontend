/**
 * Shared API types (errors, response wrappers).
 */

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Optional: use if your backend returns { data, message } */
export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value
  );
}
