import { wagerService, type Wager, type GetAllWagersResponse } from "@/services/api/wagerService";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

// Mock the API client
jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

// Mock data
const mockWager: Wager = {
  id: "1",
  title: "Will Bitcoin hit $100k?",
  category: "Crypto",
  hashtags: ["bitcoin", "crypto"],
  terms: "Bitcoin must reach $100,000 USD",
  stake: 100,
  mode: "HeadToHead",
  claim: "Yes",
  resolutionTime: "2025-01-31T00:00:00Z",
  status: "active",
  createdBy: {
    address: "0x123",
    username: "testuser",
    picture: "/avatar.png",
  },
  opponent: {
    address: "0x456",
    username: "opponent",
    picture: "/opponent.png",
  },
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const mockWagersResponse: GetAllWagersResponse = {
  wagers: [mockWager],
  total: 1,
  page: 1,
  limit: 10,
};

describe("wagerService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllWagers", () => {
    it("should fetch all wagers successfully", async () => {
      const mockResponse: ApiResponse<GetAllWagersResponse> = {
        data: mockWagersResponse,
        status: 200,
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await wagerService.getAllWagers();

      expect(mockApiClient.get).toHaveBeenCalledWith("/wager/all", undefined);
      expect(result).toEqual(mockResponse);
    });

    it("should fetch wagers with query parameters", async () => {
      const params = { page: 1, limit: 5, status: "active" };
      const mockResponse: ApiResponse<GetAllWagersResponse> = {
        data: mockWagersResponse,
        status: 200,
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await wagerService.getAllWagers(params);

      expect(mockApiClient.get).toHaveBeenCalledWith("/wager/all", params);
      expect(result).toEqual(mockResponse);
    });

    it("should handle API errors", async () => {
      const mockErrorResponse: ApiResponse<GetAllWagersResponse> = {
        error: {
          message: "Server error",
          status: 500,
        },
        status: 500,
      };

      mockApiClient.get.mockResolvedValue(mockErrorResponse);

      const result = await wagerService.getAllWagers();

      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Server error");
    });
  });

  describe("getWagerById", () => {
    it("should fetch a specific wager successfully", async () => {
      const wagerId = "1";
      const mockResponse: ApiResponse<Wager> = {
        data: mockWager,
        status: 200,
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await wagerService.getWagerById(wagerId);

      expect(mockApiClient.get).toHaveBeenCalledWith(`/wager/view/${wagerId}`);
      expect(result).toEqual(mockResponse);
    });

    it("should handle wager not found", async () => {
      const wagerId = "999";
      const mockErrorResponse: ApiResponse<Wager> = {
        error: {
          message: "Wager not found",
          status: 404,
        },
        status: 404,
      };

      mockApiClient.get.mockResolvedValue(mockErrorResponse);

      const result = await wagerService.getWagerById(wagerId);

      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Wager not found");
    });
  });

  describe("createWager", () => {
    it("should create a wager successfully", async () => {
      const wagerData = {
        title: "New Wager",
        category: "Sports",
        stake: 50,
      };

      const mockResponse: ApiResponse<Wager> = {
        data: mockWager,
        status: 201,
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await wagerService.createWager(wagerData);

      expect(mockApiClient.post).toHaveBeenCalledWith("/wager/create", wagerData);
      expect(result).toEqual(mockResponse);
    });

    it("should handle validation errors", async () => {
      const wagerData = {
        title: "", // Invalid empty title
      };

      const mockErrorResponse: ApiResponse<Wager> = {
        error: {
          message: "Validation failed",
          status: 400,
        },
        status: 400,
      };

      mockApiClient.post.mockResolvedValue(mockErrorResponse);

      const result = await wagerService.createWager(wagerData);

      expect(result.error).toBeDefined();
      expect(result.error?.message).toBe("Validation failed");
    });
  });

  describe("error handling", () => {
    it("should handle network errors", async () => {
      const networkError = new Error("Network error");
      mockApiClient.get.mockRejectedValue(networkError);

      const result = await wagerService.getAllWagers();

      expect(result.error).toBeDefined();
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new Error("Request timeout");
      mockApiClient.get.mockRejectedValue(timeoutError);

      const result = await wagerService.getAllWagers();

      expect(result.error).toBeDefined();
    });
  });
}); 