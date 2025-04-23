/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: "https://starkwager-backend.onrender.com",
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpointsß
  AUTH: {
    CREATE: "/auth/create-login",
  },
};
