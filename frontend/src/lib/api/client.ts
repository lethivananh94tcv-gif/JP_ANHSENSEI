import { ApiResponse, ErrorResponse } from "@/types";

const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  if (typeof window !== "undefined") {
    return "/api/v1";
  }
  return "http://localhost:8080/api/v1";
};

export class ApiError extends Error {
  public status: number;
  public code: string;
  public fieldErrors?: ErrorResponse["fieldErrors"];
  public correlationId?: string;

  constructor(errorResponse: ErrorResponse) {
    super(errorResponse.message || "An unexpected API error occurred");
    this.name = "ApiError";
    this.status = errorResponse.status;
    this.code = errorResponse.code;
    this.fieldErrors = errorResponse.fieldErrors;
    this.correlationId = errorResponse.correlationId;
  }
}

export interface ApiClientOptions extends RequestInit {
  throwOnError?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const { throwOnError = false, ...fetchOptions } = options;

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  const baseUrl = getApiBaseUrl();
  const fullUrl = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  try {
    const response = await fetch(fullUrl, config);

    if (!response.ok) {
      let errorData: ErrorResponse;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          timestamp: new Date().toISOString(),
          status: response.status,
          code: "HTTP_ERROR",
          message: response.statusText || "HTTP Request failed",
        };
      }

      if (throwOnError) {
        throw new ApiError(errorData);
      }

      console.warn(`[ApiClient] Request to ${endpoint} returned status ${response.status}:`, errorData.message);

      return {
        success: false,
        data: null as unknown as T,
        message: errorData.message || "HTTP Request failed",
        timestamp: new Date().toISOString(),
      };
    }

    if (response.status === 204) {
      return {
        success: true,
        data: null as unknown as T,
        message: "No content",
        timestamp: new Date().toISOString(),
      };
    }

    const text = await response.text();
    if (!text || !text.trim()) {
      return {
        success: true,
        data: null as unknown as T,
        message: "Empty response",
        timestamp: new Date().toISOString(),
      };
    }

    try {
      return JSON.parse(text);
    } catch {
      return {
        success: response.ok,
        data: text as unknown as T,
        message: "Text response",
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }

    const fallbackMessage = err instanceof Error ? err.message : "Network error";
    console.warn(`[ApiClient] Network/Fetch error on ${endpoint}:`, fallbackMessage);

    if (throwOnError) {
      throw err;
    }

    return {
      success: false,
      data: null as unknown as T,
      message: fallbackMessage,
      timestamp: new Date().toISOString(),
    };
  }
}
