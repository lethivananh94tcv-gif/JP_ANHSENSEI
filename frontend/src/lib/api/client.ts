import { ApiResponse, ErrorResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

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

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

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
    throw new ApiError(errorData);
  }

  return response.json();
}
