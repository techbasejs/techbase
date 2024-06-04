export interface RequestOptions {
  retry?: number;
  timeout?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface TokenResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}
