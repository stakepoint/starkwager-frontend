import axios from "axios";
import { API_CONFIG } from "./config";
import { userService } from "./userService";

// Create axios instance with default configuration
const axiosClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor to include authentication token
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== "undefined") {
      const authTokens = localStorage.getItem("auth_tokens");

      if (authTokens) {
        const { accessToken } = JSON.parse(authTokens);
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        let refreshToken = null;
        if (typeof window !== "undefined") {
          const authTokens = localStorage.getItem("auth_tokens");
          if (authTokens) {
            const tokens = JSON.parse(authTokens);
            refreshToken = tokens.refreshToken;
          }
        }
        const data = await userService.refreshAccessToken(refreshToken);
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_tokens", JSON.stringify(data.tokens));
        }

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.tokens.accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_tokens");
          localStorage.removeItem("auth_user");
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
