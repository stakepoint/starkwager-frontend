/**
 * API Response types
 */
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    status?: number;
  };
  status: number;
}

/**
 * User related types
 */
export interface User {
  address: string;
  username: string;
  picture: string;
}

export interface CreateUserRequest {
  address: string;
  username: string;
  picture: string;
}

export interface CreateUserResponse {
  user: User;
}
