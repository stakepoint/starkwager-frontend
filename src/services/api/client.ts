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
 * Create a fetch request with timeout
 */
function fetchWithTimeout(url: string, options: RequestInit, timeout: number = API_CONFIG.TIMEOUT): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);

    fetch(url, { ...options, signal: controller.signal })
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeoutId));
  });
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
      console.log(`🌐 API GET: ${endpoint}`, params);
      
      const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

      // Add query parameters if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      console.log(`🔗 Full URL: ${url.toString()}`);

      const response = await fetchWithTimeout(url.toString(), {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      }, 10000); // 10 second timeout

      console.log(`📡 Response status: ${response.status}`);
      return await processResponse<T>(response);
    } catch (error: any) {
      console.error(`❌ API GET failed for ${endpoint}:`, error);
      return handleApiError(error);
    }
  },

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      console.log(`🌐 API POST: ${endpoint}`, data);
      
      const response = await fetchWithTimeout(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "POST",
        headers: API_CONFIG.HEADERS,
        body: data ? JSON.stringify(data) : undefined,
      }, 15000); // 15 second timeout for POST

      console.log(`📡 Response status: ${response.status}`);
      return await processResponse<T>(response);
    } catch (error: any) {
      console.error(`❌ API POST failed for ${endpoint}:`, error);
      return handleApiError(error);
    }
  },

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      console.log(`🌐 API PUT: ${endpoint}`, data);
      
      const response = await fetchWithTimeout(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: API_CONFIG.HEADERS,
        body: data ? JSON.stringify(data) : undefined,
      }, 15000); // 15 second timeout for PUT

      console.log(`📡 Response status: ${response.status}`);
      return await processResponse<T>(response);
    } catch (error: any) {
      console.error(`❌ API PUT failed for ${endpoint}:`, error);
      return handleApiError(error);
    }
  },

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log(`🌐 API DELETE: ${endpoint}`);
      
      const response = await fetchWithTimeout(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: API_CONFIG.HEADERS,
      }, 10000); // 10 second timeout

      console.log(`📡 Response status: ${response.status}`);
      return await processResponse<T>(response);
    } catch (error: any) {
      console.error(`❌ API DELETE failed for ${endpoint}:`, error);
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
    console.log(`📦 Response data:`, data);

    if (response.ok) {
      return { data, status };
    } else {
      // Handle error response with JSON body
      console.error(`❌ API Error Response:`, data);
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
    console.error("Error parsing response:", error);
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

  // Handle specific error types
  if (error.name === 'AbortError' || error.message?.includes('timeout')) {
    return {
      error: {
        message: "Request timeout - please check your connection",
        status: 408,
        code: "TIMEOUT",
      },
      status: 408,
    };
  }

  return {
    error: {
      message: error.message || "An unexpected error occurred",
      status: error.status || 500,
      code: error.code,
    },
    status: error.status || 500,
  };
}
