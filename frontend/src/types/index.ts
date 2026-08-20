export type UserRole = "LEARNER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  targetLevel?: string;
  avatarUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  fieldErrors?: FieldError[];
  correlationId?: string;
}
