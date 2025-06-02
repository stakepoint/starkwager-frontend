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

/**
 * Wager Service - handles all wager-related API operations
 */
export const wagerService = {
  /**
   * Fetch all wagers from the backend
   */
  async getAllWagers(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
  }): Promise<ApiResponse<GetAllWagersResponse>> {
    return apiClient.get<GetAllWagersResponse>(API_ENDPOINTS.WAGER.ALL, params);
  },

  /**
   * Fetch a specific wager by ID
   */
  async getWagerById(id: string): Promise<ApiResponse<Wager>> {
    return apiClient.get<Wager>(API_ENDPOINTS.WAGER.VIEW(id));
  },

  /**
   * Create a new wager
   */
  async createWager(wagerData: Partial<Wager>): Promise<ApiResponse<Wager>> {
    return apiClient.post<Wager>(API_ENDPOINTS.WAGER.CREATE, wagerData);
  },
}; 