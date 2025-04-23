import { API_CONFIG } from "./config";
import { ApiResponse } from "./types";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Base API client for making HTTP requests
 */
export const apiClient = {
  /**
   * Make a GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

      // Add query parameters if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      });

      return await processResponse<T>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "POST",
        headers: API_CONFIG.HEADERS,
        body: data ? JSON.stringify(data) : undefined,
      });

      return await processResponse<T>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: API_CONFIG.HEADERS,
        body: data ? JSON.stringify(data) : undefined,
      });

      return await processResponse<T>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: API_CONFIG.HEADERS,
      });

      return await processResponse<T>(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

/**
 * Process HTTP response
 */
async function processResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const status = response.status;

  try {
    // Parse JSON response
    const data = await response.json();

    if (response.ok) {
      return { data, status };
    } else {
      // Handle error response with JSON body
      return {
        error: {
          message: data.message || "An error occurred",
          code: data.code,
          status,
        },
        status,
      };
    }
  } catch (error) {
    // Handle non-JSON responses or network errors
    return {
      error: {
        message: response.ok
          ? "Invalid JSON response"
          : response.statusText || "Network error",
        status,
      },
      status,
    };
  }
}

/**
 * Handle API errors
 */
function handleApiError(error: any): ApiResponse<any> {
  console.error("API Request Error:", error);

  return {
    error: {
      message: error.message || "An unexpected error occurred",
      status: error.status || 500,
      code: error.code,
    },
    status: error.status || 500,
  };
}
