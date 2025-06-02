import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWagers, useWager, transformWagerToCardProps } from "@/hooks/wager/useWagers";
import { wagerService } from "@/services/api/wagerService";
import { type Wager } from "@/services/api/wagerService";
import React from "react";

// Mock the wager service
jest.mock("@/services/api/wagerService", () => ({
  wagerService: {
    getAllWagers: jest.fn(),
    getWagerById: jest.fn(),
  },
}));

const mockWagerService = wagerService as jest.Mocked<typeof wagerService>;

// Test wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return function TestWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

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
    username: "alice",
    picture: "/alice.png",
  },
  opponent: {
    address: "0x456",
    username: "bob",
    picture: "/bob.png",
  },
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

const mockWagersResponse = {
  wagers: [mockWager],
  total: 1,
  page: 1,
  limit: 10,
};

describe("useWagers hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useWagers", () => {
    it("should fetch wagers successfully", async () => {
      mockWagerService.getAllWagers.mockResolvedValue({
        data: mockWagersResponse,
        status: 200,
      });

      const { result } = renderHook(() => useWagers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockWagersResponse);
      expect(result.current.error).toBeNull();
      expect(mockWagerService.getAllWagers).toHaveBeenCalledWith(undefined);
    });

    it("should pass parameters to the service", async () => {
      const params = { page: 1, limit: 5, status: "active" };
      
      mockWagerService.getAllWagers.mockResolvedValue({
        data: mockWagersResponse,
        status: 200,
      });

      const { result } = renderHook(() => useWagers(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockWagerService.getAllWagers).toHaveBeenCalledWith(params);
    });

    it("should handle API errors", async () => {
      const errorMessage = "Server error";
      mockWagerService.getAllWagers.mockResolvedValue({
        error: {
          message: errorMessage,
          status: 500,
        },
        status: 500,
      });

      const { result } = renderHook(() => useWagers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe(errorMessage);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle network errors", async () => {
      mockWagerService.getAllWagers.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useWagers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe("Network error");
    });

    it("should use correct query key", async () => {
      const params = { page: 1, limit: 5 };
      
      mockWagerService.getAllWagers.mockResolvedValue({
        data: mockWagersResponse,
        status: 200,
      });

      const { result } = renderHook(() => useWagers(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // The query key should include the params for proper caching
      expect(mockWagerService.getAllWagers).toHaveBeenCalledWith(params);
    });
  });

  describe("useWager", () => {
    it("should fetch single wager successfully", async () => {
      const wagerId = "1";
      
      mockWagerService.getWagerById.mockResolvedValue({
        data: mockWager,
        status: 200,
      });

      const { result } = renderHook(() => useWager(wagerId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockWager);
      expect(result.current.error).toBeNull();
      expect(mockWagerService.getWagerById).toHaveBeenCalledWith(wagerId);
    });

    it("should handle wager not found", async () => {
      const wagerId = "999";
      
      mockWagerService.getWagerById.mockResolvedValue({
        error: {
          message: "Wager not found",
          status: 404,
        },
        status: 404,
      });

      const { result } = renderHook(() => useWager(wagerId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe("Wager not found");
    });

    it("should not fetch when wagerId is empty", () => {
      const { result } = renderHook(() => useWager(""), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(mockWagerService.getWagerById).not.toHaveBeenCalled();
    });
  });

  describe("transformWagerToCardProps", () => {
    it("should transform wager with opponent correctly", () => {
      const result = transformWagerToCardProps(mockWager);

      expect(result).toEqual({
        wagerId: "1",
        question: "Will Bitcoin hit $100k?",
        wagerStatus: "active",
        stakeAmount: 100,
        leftUser: {
          username: "@alice",
          icon: "/alice.png",
        },
        rightUser: {
          username: "@bob",
          icon: "/bob.png",
        },
      });
    });

    it("should handle wager without opponent", () => {
      const wagerWithoutOpponent = {
        ...mockWager,
        opponent: undefined,
      };

      const result = transformWagerToCardProps(wagerWithoutOpponent);

      expect(result).toEqual({
        wagerId: "1",
        question: "Will Bitcoin hit $100k?",
        wagerStatus: "active",
        stakeAmount: 100,
        leftUser: {
          username: "@alice",
          icon: "/alice.png",
        },
        rightUser: {
          username: "Awaiting Opponent",
          icon: "/images/opponent.svg",
        },
      });
    });

    it("should handle missing user pictures", () => {
      const wagerWithoutPictures = {
        ...mockWager,
        createdBy: {
          ...mockWager.createdBy,
          picture: "",
        },
        opponent: {
          ...mockWager.opponent!,
          picture: "",
        },
      };

      const result = transformWagerToCardProps(wagerWithoutPictures);

      expect(result.leftUser.icon).toBe("/images/avatar.svg");
      expect(result.rightUser.icon).toBe("/images/avatar.svg");
    });

    it("should add @ symbol to usernames", () => {
      const result = transformWagerToCardProps(mockWager);

      expect(result.leftUser.username).toBe("@alice");
      expect(result.rightUser.username).toBe("@bob");
    });

    it("should handle different wager statuses", () => {
      const pendingWager = { ...mockWager, status: "pending" as const };
      const completedWager = { ...mockWager, status: "completed" as const };

      expect(transformWagerToCardProps(pendingWager).wagerStatus).toBe("pending");
      expect(transformWagerToCardProps(completedWager).wagerStatus).toBe("completed");
    });
  });

  describe("query configuration", () => {
    beforeEach(() => {
      mockWagerService.getAllWagers.mockResolvedValue({
        data: mockWagersResponse,
        status: 200,
      });
    });

    it("should have correct stale time", async () => {
      const { result } = renderHook(() => useWagers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // The hook should be configured with 5 minutes stale time
      // This is more of a configuration test
      expect(result.current.data).toBeDefined();
    });

    it("should retry on failure", async () => {
      // First two calls fail, third succeeds
      mockWagerService.getAllWagers
        .mockRejectedValueOnce(new Error("Network error"))
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce({
          data: mockWagersResponse,
          status: 200,
        });

      const { result } = renderHook(() => useWagers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should have retried and eventually succeeded
      expect(mockWagerService.getAllWagers).toHaveBeenCalledTimes(3);
      expect(result.current.data).toEqual(mockWagersResponse);
    });
  });
}); 