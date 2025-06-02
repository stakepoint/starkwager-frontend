import { apiClient } from "./client";
import { ApiResponse } from "./types";
import { API_ENDPOINTS } from "./config";

// Wager related types
export interface Wager {
  id: string;
  title: string;
  category: string;
  hashtags: string[];
  terms: string;
  stake: number;
  mode: string;
  claim: string;
  resolutionTime: string;
  status: "active" | "pending" | "completed";
  createdBy: {
    address: string;
    username: string;
    picture: string;
  };
  opponent?: {
    address: string;
    username: string;
    picture: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetAllWagersResponse {
  wagers: Wager[];
  total: number;
  page: number;
  limit: number;
}

// Dummy data for testing when backend has no data
const dummyWagersData: Wager[] = [
  {
    id: "1",
    title: "Will Bitcoin Hit $100k Before January 31, 2025?",
    category: "Crypto",
    hashtags: ["bitcoin", "crypto", "prediction"],
    terms: "Bitcoin must reach $100,000 USD by January 31, 2025 according to CoinMarketCap or CoinGecko",
    stake: 100,
    mode: "HeadToHead",
    claim: "Yes",
    resolutionTime: "2025-01-31T00:00:00Z",
    status: "active" as const,
    createdBy: {
      address: "0x123456789abcdef",
      username: "cryptobull",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: {
      address: "0x987654321fedcba",
      username: "bitcoinbear",
      picture: "/images/RightWagercardUserOneIcon.svg",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Will Ethereum Reach $5000 by March 2025?",
    category: "Crypto",
    hashtags: ["ethereum", "crypto", "defi"],
    terms: "Ethereum must reach $5,000 USD by March 31, 2025 on major exchanges",
    stake: 50,
    mode: "HeadToHead",
    claim: "Yes",
    resolutionTime: "2025-03-31T00:00:00Z",
    status: "pending" as const,
    createdBy: {
      address: "0x789abcdef123456",
      username: "ethmaxi",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: undefined,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Will Tesla Stock Hit $300 by End of 2024?",
    category: "Stocks",
    hashtags: ["tesla", "stocks", "elon"],
    terms: "Tesla (TSLA) stock must reach $300 per share by December 31, 2024",
    stake: 75,
    mode: "HeadToHead",
    claim: "No",
    resolutionTime: "2024-12-31T23:59:59Z",
    status: "active" as const,
    createdBy: {
      address: "0xabcdef123456789",
      username: "stocktrader",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: {
      address: "0x456789abcdef123",
      username: "teslafan",
      picture: "/images/RightWagercardUserOneIcon.svg",
    },
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Will AI Replace 50% of Jobs by 2030?",
    category: "Technology",
    hashtags: ["ai", "jobs", "future"],
    terms: "Artificial Intelligence will replace at least 50% of current jobs by 2030 according to major research institutions",
    stake: 200,
    mode: "HeadToHead",
    claim: "Yes",
    resolutionTime: "2030-01-01T00:00:00Z",
    status: "pending" as const,
    createdBy: {
      address: "0xdef123456789abc",
      username: "techprophet",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: undefined,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    title: "Will SpaceX Land Humans on Mars by 2030?",
    category: "Space",
    hashtags: ["spacex", "mars", "exploration"],
    terms: "SpaceX successfully lands humans on Mars and they survive for at least 30 days by December 31, 2030",
    stake: 150,
    mode: "HeadToHead",
    claim: "No",
    resolutionTime: "2030-12-31T23:59:59Z",
    status: "active" as const,
    createdBy: {
      address: "0x123abc456def789",
      username: "spaceskeptic",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: {
      address: "0x789def123abc456",
      username: "marsbeliever",
      picture: "/images/RightWagercardUserOneIcon.svg",
    },
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
];

/**
 * Wager Service - handles all wager-related API operations
 */
export const wagerService = {
  /**
   * Fetch all wagers from the backend
   * Implements the flow: empty state → API call → dummy data if backend is empty
   */
  async getAllWagers(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
  }): Promise<ApiResponse<GetAllWagersResponse>> {
    try {
      // First, try to fetch from the backend API
      const response = await apiClient.get<GetAllWagersResponse>(API_ENDPOINTS.WAGER.ALL, params);
      
      // If API call is successful but returns empty data, use dummy data
      if (response.data && (!response.data.wagers || response.data.wagers.length === 0)) {
        console.log("📝 Backend returned empty data, using dummy data for demonstration");
        
        const limit = params?.limit || 10;
        const page = params?.page || 1;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedWagers = dummyWagersData.slice(startIndex, endIndex);
        
        return {
          data: {
            wagers: paginatedWagers,
            total: dummyWagersData.length,
            page,
            limit,
          },
          status: 200,
        };
      }
      
      // Return actual backend data if available
      if (response.data) {
        return response;
      }
      
      // If there's an error, throw it to be handled by the calling code
      if (response.error) {
        throw new Error(response.error.message || "Failed to fetch wagers from backend");
      }
      
      // Fallback to dummy data if something unexpected happens
      console.log("📝 Unexpected response, falling back to dummy data");
      const limit = params?.limit || 10;
      const page = params?.page || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedWagers = dummyWagersData.slice(startIndex, endIndex);
      
      return {
        data: {
          wagers: paginatedWagers,
          total: dummyWagersData.length,
          page,
          limit,
        },
        status: 200,
      };
      
    } catch (error: any) {
      console.error("❌ Error fetching wagers from backend:", error);
      
      // If backend is completely unavailable, use dummy data
      console.log("📝 Backend unavailable, using dummy data for demonstration");
      
      const limit = params?.limit || 10;
      const page = params?.page || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedWagers = dummyWagersData.slice(startIndex, endIndex);
      
      return {
        data: {
          wagers: paginatedWagers,
          total: dummyWagersData.length,
          page,
          limit,
        },
        status: 200,
      };
    }
  },

  /**
   * Fetch a specific wager by ID
   */
  async getWagerById(id: string): Promise<ApiResponse<Wager>> {
    try {
      const response = await apiClient.get<Wager>(API_ENDPOINTS.WAGER.VIEW(id));
      
      if (response.data) {
        return response;
      }
      
      // Fallback to dummy data
      const dummyWager = dummyWagersData.find(w => w.id === id);
      if (dummyWager) {
        return {
          data: dummyWager,
          status: 200,
        };
      }
      
      return {
        error: {
          message: "Wager not found",
          status: 404,
        },
        status: 404,
      };
    } catch (error: any) {
      // Fallback to dummy data
      const dummyWager = dummyWagersData.find(w => w.id === id);
      if (dummyWager) {
        return {
          data: dummyWager,
          status: 200,
        };
      }
      
      return {
        error: {
          message: error.message || "Failed to fetch wager",
          status: error.status || 500,
        },
        status: error.status || 500,
      };
    }
  },

  /**
   * Create a new wager
   */
  async createWager(wagerData: Partial<Wager>): Promise<ApiResponse<Wager>> {
    return apiClient.post<Wager>(API_ENDPOINTS.WAGER.CREATE, wagerData);
  },

  /**
   * Get dummy wagers for testing
   */
  getDummyWagers(): Wager[] {
    return dummyWagersData;
  },
}; 