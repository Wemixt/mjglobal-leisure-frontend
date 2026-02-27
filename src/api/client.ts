/**
 * Base API client – public routes only, no auth.
 * Uses NEXT_PUBLIC_API_BASE_URL when set; otherwise relative to app origin.
 */

import type { ApiError } from "./types";

const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "";
};

function buildUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalizedPath}` : normalizedPath;
}

export class ClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ClientError";
    this.status = status;
    this.code = code;
  }
}

export interface RequestConfig extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown> | FormData;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let message = response.statusText;
    if (isJson) {
      try {
        const err = (await response.json()) as ApiError | { error?: string };
        message = err.message ?? err.error ?? message;
      } catch {
        // use statusText
      }
    }
    throw new ClientError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (isJson) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}

/**
 * GET request
 */
export async function apiGet<T>(path: string, config?: RequestInit): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * POST request (e.g. contact form)
 */
export async function apiPost<T>(
  path: string,
  body?: Record<string, unknown> | FormData,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(path);
  const isFormData = body instanceof FormData;
  const response = await fetch(url, {
    method: "POST",
    headers: isFormData
      ? (config?.headers as HeadersInit)
      : { "Content-Type": "application/json", ...config?.headers },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * PUT request (if needed later)
 */
export async function apiPut<T>(
  path: string,
  body?: Record<string, unknown>,
  config?: RequestConfig
): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...config?.headers },
    body: body ? JSON.stringify(body) : undefined,
    ...config,
  });
  return handleResponse<T>(response);
}

/**
 * DELETE request (if needed later)
 */
export async function apiDelete<T>(path: string, config?: RequestInit): Promise<T> {
  const url = buildUrl(path);
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...config?.headers },
    ...config,
  });
  return handleResponse<T>(response);
}
