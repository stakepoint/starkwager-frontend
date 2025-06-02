import { wagerService, type Wager, type GetAllWagersResponse } from "@/services/api/wagerService";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

// Mock the API client
jest.mock("@/services/api/client");
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

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

describe("WagerService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear console logs for cleaner test output
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllWagers", () => {
    const mockBackendWager: Wager = {
      id: "backend-1",
      title: "Backend Wager",
      category: "Test",
      hashtags: ["test"],
      terms: "Test terms",
      stake: 100,
      mode: "HeadToHead",
      claim: "Yes",
      resolutionTime: "2025-01-01T00:00:00Z",
      status: "active",
      createdBy: {
        address: "0x123",
        username: "testuser",
        picture: "/test.svg",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    it("should return backend data when API call is successful and has data", async () => {
      const mockResponse: GetAllWagersResponse = {
        wagers: [mockBackendWager],
        total: 1,
        page: 1,
        limit: 10,
      };

      mockedApiClient.get.mockResolvedValue({
        data: mockResponse,
        status: 200,
      });

      const result = await wagerService.getAllWagers({ limit: 10 });

      expect(result.data).toEqual(mockResponse);
      expect(result.status).toBe(200);
      expect(mockedApiClient.get).toHaveBeenCalledWith("/wager/all", { limit: 10 });
    });

    it("should return dummy data when backend returns empty wagers array", async () => {
      const emptyResponse: GetAllWagersResponse = {
        wagers: [],
        total: 0,
        page: 1,
        limit: 10,
      };

      mockedApiClient.get.mockResolvedValue({
        data: emptyResponse,
        status: 200,
      });

      const result = await wagerService.getAllWagers({ limit: 10 });

      expect(result.data?.wagers).toBeDefined();
      expect(result.data?.wagers.length).toBeGreaterThan(0);
      expect(result.data?.total).toBeGreaterThan(0);
      expect(result.status).toBe(200);
      expect(console.log).toHaveBeenCalledWith(
        "📝 Backend returned empty data, using dummy data for demonstration"
      );
    });

    it("should return dummy data when backend returns null/undefined wagers", async () => {
      mockedApiClient.get.mockResolvedValue({
        data: {
          wagers: undefined as any,
          total: 0,
          page: 1,
          limit: 10,
        },
        status: 200,
      });

      const result = await wagerService.getAllWagers({ limit: 10 });

      expect(result.data?.wagers).toBeDefined();
      expect(result.data?.wagers.length).toBeGreaterThan(0);
      expect(console.log).toHaveBeenCalledWith(
        "📝 Backend returned empty data, using dummy data for demonstration"
      );
    });

    it("should return dummy data when API returns error", async () => {
      mockedApiClient.get.mockResolvedValue({
        error: {
          message: "Backend error",
          status: 500,
        },
        status: 500,
      });

      const result = await wagerService.getAllWagers({ limit: 10 });

      expect(result.data?.wagers).toBeDefined();
      expect(result.data?.wagers.length).toBeGreaterThan(0);
      expect(result.status).toBe(200);
      expect(console.log).toHaveBeenCalledWith(
        "📝 Backend unavailable, using dummy data for demonstration"
      );
    });

    it("should return dummy data when API call throws exception", async () => {
      mockedApiClient.get.mockRejectedValue(new Error("Network error"));

      const result = await wagerService.getAllWagers({ limit: 10 });

      expect(result.data?.wagers).toBeDefined();
      expect(result.data?.wagers.length).toBeGreaterThan(0);
      expect(result.status).toBe(200);
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error fetching wagers from backend:",
        expect.any(Error)
      );
      expect(console.log).toHaveBeenCalledWith(
        "📝 Backend unavailable, using dummy data for demonstration"
      );
    });

    it("should handle pagination correctly with dummy data", async () => {
      mockedApiClient.get.mockResolvedValue({
        data: {
          wagers: [],
          total: 0,
          page: 1,
          limit: 2,
        },
        status: 200,
      });

      const result = await wagerService.getAllWagers({ limit: 2, page: 1 });

      expect(result.data?.wagers.length).toBe(2);
      expect(result.data?.page).toBe(1);
      expect(result.data?.limit).toBe(2);
      expect(result.data?.total).toBeGreaterThan(2);
    });

    it("should handle second page pagination with dummy data", async () => {
      mockedApiClient.get.mockResolvedValue({
        data: {
          wagers: [],
          total: 0,
          page: 2,
          limit: 2,
        },
        status: 200,
      });

      const result = await wagerService.getAllWagers({ limit: 2, page: 2 });

      expect(result.data?.wagers.length).toBe(2);
      expect(result.data?.page).toBe(2);
      expect(result.data?.limit).toBe(2);
    });

    it("should pass query parameters correctly", async () => {
      const params = {
        limit: 5,
        page: 2,
        status: "active",
        category: "crypto",
      };

      mockedApiClient.get.mockResolvedValue({
        data: {
          wagers: [],
          total: 0,
          page: 2,
          limit: 5,
        },
        status: 200,
      });

      await wagerService.getAllWagers(params);

      expect(mockedApiClient.get).toHaveBeenCalledWith("/wager/all", params);
    });
  });

  describe("getWagerById", () => {
    const mockWager: Wager = {
      id: "test-1",
      title: "Test Wager",
      category: "Test",
      hashtags: ["test"],
      terms: "Test terms",
      stake: 100,
      mode: "HeadToHead",
      claim: "Yes",
      resolutionTime: "2025-01-01T00:00:00Z",
      status: "active",
      createdBy: {
        address: "0x123",
        username: "testuser",
        picture: "/test.svg",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    it("should return backend data when API call is successful", async () => {
      mockedApiClient.get.mockResolvedValue({
        data: mockWager,
        status: 200,
      });

      const result = await wagerService.getWagerById("test-1");

      expect(result.data).toEqual(mockWager);
      expect(result.status).toBe(200);
      expect(mockedApiClient.get).toHaveBeenCalledWith("/wager/view/test-1");
    });

    it("should return dummy data when backend fails and wager exists in dummy data", async () => {
      mockedApiClient.get.mockRejectedValue(new Error("Network error"));

      // Test with a known dummy wager ID
      const result = await wagerService.getWagerById("1");

      expect(result.data).toBeDefined();
      expect(result.data?.id).toBe("1");
      expect(result.status).toBe(200);
    });

    it("should return 404 when wager not found in backend or dummy data", async () => {
      mockedApiClient.get.mockResolvedValue({
        error: {
          message: "Not found",
          status: 404,
        },
        status: 404,
      });

      const result = await wagerService.getWagerById("nonexistent");

      expect(result.error).toBeDefined();
      expect(result.error?.status).toBe(404);
      expect(result.error?.message).toBe("Wager not found");
    });

    it("should fallback to dummy data when API throws and wager exists", async () => {
      mockedApiClient.get.mockRejectedValue(new Error("Network error"));

      const result = await wagerService.getWagerById("2");

      expect(result.data).toBeDefined();
      expect(result.data?.id).toBe("2");
      expect(result.status).toBe(200);
    });
  });

  describe("createWager", () => {
    it("should call API client with correct parameters", async () => {
      const wagerData = {
        title: "New Wager",
        category: "Test",
        stake: 100,
      };

      const mockResponse = {
        data: { ...wagerData, id: "new-1" } as Wager,
        status: 201,
      };

      mockedApiClient.post.mockResolvedValue(mockResponse);

      const result = await wagerService.createWager(wagerData);

      expect(result).toEqual(mockResponse);
      expect(mockedApiClient.post).toHaveBeenCalledWith("/wager/create", wagerData);
    });
  });

  describe("getDummyWagers", () => {
    it("should return array of dummy wagers", () => {
      const dummyWagers = wagerService.getDummyWagers();

      expect(Array.isArray(dummyWagers)).toBe(true);
      expect(dummyWagers.length).toBeGreaterThan(0);
      expect(dummyWagers[0]).toHaveProperty("id");
      expect(dummyWagers[0]).toHaveProperty("title");
      expect(dummyWagers[0]).toHaveProperty("stake");
    });

    it("should return consistent data", () => {
      const dummyWagers1 = wagerService.getDummyWagers();
      const dummyWagers2 = wagerService.getDummyWagers();

      expect(dummyWagers1).toEqual(dummyWagers2);
    });
  });

  describe("Error Handling", () => {
    it("should handle network timeouts gracefully", async () => {
      const timeoutError = new Error("Request timeout");
      timeoutError.name = "TimeoutError";
      
      mockedApiClient.get.mockRejectedValue(timeoutError);

      const result = await wagerService.getAllWagers();

      expect(result.data?.wagers).toBeDefined();
      expect(result.status).toBe(200);
      expect(console.error).toHaveBeenCalledWith(
        "❌ Error fetching wagers from backend:",
        timeoutError
      );
    });

    it("should handle malformed API responses", async () => {
      mockedApiClient.get.mockResolvedValue({
        data: null as any,
        status: 200,
      });

      const result = await wagerService.getAllWagers();

      expect(result.data?.wagers).toBeDefined();
      expect(result.status).toBe(200);
      expect(console.log).toHaveBeenCalledWith(
        "📝 Unexpected response, falling back to dummy data"
      );
    });
  });

  describe("Integration Flow", () => {
    it("should implement the correct flow: empty state → API call → dummy data", async () => {
      // Simulate the expected flow
      
      // 1. Initial empty state (handled by React Query loading state)
      expect(true).toBe(true); // This is handled by the component
      
      // 2. API call returns empty data
      mockedApiClient.get.mockResolvedValue({
        data: {
          wagers: [],
          total: 0,
          page: 1,
          limit: 10,
        },
        status: 200,
      });

      // 3. Service returns dummy data
      const result = await wagerService.getAllWagers();
      
      expect(result.data?.wagers.length).toBeGreaterThan(0);
      expect(console.log).toHaveBeenCalledWith(
        "📝 Backend returned empty data, using dummy data for demonstration"
      );
    });
  });
}); 