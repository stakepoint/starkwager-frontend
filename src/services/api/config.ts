/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://starkwager-backend.onrender.com",
  TIMEOUT: 120000,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    CREATE: "/auth/create-login",
  },

  // User endpoints
  USERS: {
    CREATE: "/users/create",
    ALL: "/users",
    GET: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    UPDATE: "/users/update",
    AVATAR: "/users/avatar",
  },

  // Category endpoints
  CATEGORIES: {
    CREATE: "/categories/create",
    ALL: "/categories/all",
    VIEW: (id: string) => `/categories/view/${id}`,
  },

  // Wager endpoints
  WAGER: {
    CREATE: "/wager/create",
    ALL: "/wager/all",
    VIEW: (id: string) => `/wager/view/${id}`,
    BULK_CREATE: "/wager/bulk-create",
  },

  // Hashtags endpoints
  HASHTAGS: {
    CREATE: "/hashtags",
    ALL: "/hashtags",
  },

  // WagerInvitation endpoints
  INVITATIONS: {
    CREATE: "/invitations/create",
    BY_WAGER: (wagerId: string) => `/invitations/wager/${wagerId}`,
  },

  // Notification endpoints
  NOTIFICATION: {
    CREATE: "/notification/create",
    ALL: "/notification/all",
    READ: (id: string) => `/notification/${id}/read`,
    DELETE: (id: string) => `/notification/${id}`,
    GET: (id: string) => `/notification/${id}`,
  },

  // WagerClaim endpoints
  WAGER_CLAIM: {
    CREATE: "/wager-claim",
    ACCEPT: (id: string) => `/wager-claim/accept/${id}`,
    REJECT: "/wager-claim/reject",
  },
};
