import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalWagers from "@/components/wagers/global-wagers";
import * as useWagersHook from "@/hooks/wager/useWagers";
import { useRouter } from "next/navigation";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the WagerCards component
jest.mock("@/components/ui/WagerCards", () => {
  return function MockWagerCards({ wagerId, question }: any) {
    return (
      <div data-testid={`wager-card-${wagerId}`}>
        <h3>{question}</h3>
      </div>
    );
  };
});

// Mock the WagerCardSkeleton component
jest.mock("@/components/ui/skeletons/wagerCardSkeleton", () => {
  return function MockWagerCardSkeleton() {
    return <div data-testid="wager-card-skeleton">Loading...</div>;
  };
});

const mockPush = jest.fn();

// Helper function to create complete mock query result
const createMockQueryResult = (overrides: any = {}) => ({
  data: undefined,
  isLoading: false,
  isError: false,
  isPending: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  isStale: false,
  isFetched: true,
  isFetching: false,
  isPlaceholderData: false,
  status: "success" as const,
  fetchStatus: "idle" as const,
  error: null,
  refetch: jest.fn(),
  isRefetching: false,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isInitialLoading: false,
  isPaused: false,
  ...overrides,
});

// Mock wager data
const mockWagers = [
  {
    id: "1",
    title: "Will Bitcoin Hit $100k Before January 31, 2025?",
    category: "Crypto",
    hashtags: ["bitcoin", "crypto"],
    terms: "Bitcoin must reach $100,000 USD by January 31, 2025",
    stake: 100,
    mode: "HeadToHead",
    claim: "Yes",
    resolutionTime: "2025-01-31T00:00:00Z",
    status: "active" as const,
    createdBy: {
      address: "0x123",
      username: "cryptobull",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: {
      address: "0x456",
      username: "bitcoinbear",
      picture: "/images/RightWagercardUserOneIcon.svg",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

describe("GlobalWagers Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    
    mockPush.mockClear();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  describe("Loading State", () => {
    it("shows skeleton loaders while loading", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: true,
          data: undefined,
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Global Wagers")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByText("Fetching wagers from backend...")).toBeInTheDocument();
      
      // Should show 3 skeleton loaders
      const skeletons = screen.getAllByTestId("wager-card-skeleton");
      expect(skeletons).toHaveLength(3);
    });

    it("shows loading state with proper header", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: true,
          data: undefined,
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Global Wagers")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("hides header when showHeader is false during loading", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: true,
          data: undefined,
        })
      );

      renderWithQueryClient(<GlobalWagers showHeader={false} />);

      expect(screen.queryByText("Global Wagers")).not.toBeInTheDocument();
      expect(screen.getByText("Fetching wagers from backend...")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("shows error message when API fails", () => {
      const mockError = new Error("Failed to fetch wagers");
      const mockRefetch = jest.fn();

      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: mockError,
          refetch: mockRefetch,
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Failed to load wagers")).toBeInTheDocument();
      expect(screen.getByText("Failed to fetch wagers")).toBeInTheDocument();
      expect(screen.getByText("Backend: https://starkwager-backend.onrender.com")).toBeInTheDocument();
    });

    it("allows retry when error occurs", () => {
      const mockError = new Error("Network error");
      const mockRefetch = jest.fn();

      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: mockError,
          refetch: mockRefetch,
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      const retryButton = screen.getByText("Try Again");
      fireEvent.click(retryButton);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    it("shows loading state during retry", () => {
      const mockError = new Error("Network error");
      const mockRefetch = jest.fn();

      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: mockError,
          refetch: mockRefetch,
          isRefetching: true,
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      // Should show spinning icon during refetch
      const refreshIcon = screen.getByTestId("refresh-icon");
      expect(refreshIcon).toBeInTheDocument();
      expect(refreshIcon).toHaveClass("animate-spin");
    });

    it("shows retry button in header during error", () => {
      const mockError = new Error("Network error");
      const mockRefetch = jest.fn();

      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: mockError,
          refetch: mockRefetch,
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Retry")).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("shows empty state when no wagers exist", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: [],
            total: 0,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("No Active Wagers")).toBeInTheDocument();
      expect(screen.getByText(/The community hasn't created any wagers yet/)).toBeInTheDocument();
      expect(screen.getByText("Create Your First Wager")).toBeInTheDocument();
    });

    it("shows backend status indicator in empty state", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: [],
            total: 0,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText(/Backend Status:/)).toBeInTheDocument();
      expect(screen.getByText(/No wagers found on backend/)).toBeInTheDocument();
    });

    it("navigates to create wager page when create button is clicked", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: [],
            total: 0,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      const createButton = screen.getByText("Create Your First Wager");
      fireEvent.click(createButton);

      expect(mockPush).toHaveBeenCalledWith("/dashboard/create-wager");
    });
  });

  describe("Populated State", () => {
    it("displays wagers when data is available", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Global Wagers")).toBeInTheDocument();
      expect(screen.getByText("1 total")).toBeInTheDocument();
      expect(screen.getByText("View All")).toBeInTheDocument();
    });

    it("shows backend connection status", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("🔗 Connected to:")).toBeInTheDocument();
      expect(screen.getByText("starkwager-backend.onrender.com")).toBeInTheDocument();
    });

    it("shows load more button when there are more wagers", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 20, // More than limit
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Load More Wagers")).toBeInTheDocument();
    });

    it("does not show load more button when all wagers are displayed", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1, // Same as wagers length
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.queryByText("Load More Wagers")).not.toBeInTheDocument();
    });

    it("renders wager cards correctly", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByTestId("wager-card-1")).toBeInTheDocument();
      expect(screen.getByText("Will Bitcoin Hit $100k Before January 31, 2025?")).toBeInTheDocument();
    });
  });

  describe("Component Props", () => {
    it("respects limit prop", () => {
      const mockUseWagers = jest.spyOn(useWagersHook, "useWagers");
      mockUseWagers.mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 5,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers limit={5} />);

      expect(mockUseWagers).toHaveBeenCalledWith({ limit: 5 });
    });

    it("hides header when showHeader is false", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers showHeader={false} />);

      expect(screen.queryByText("Global Wagers")).not.toBeInTheDocument();
    });

    it("hides view all when showViewAll is false", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers showViewAll={false} />);

      expect(screen.queryByText("View All")).not.toBeInTheDocument();
      expect(screen.queryByText("1 total")).not.toBeInTheDocument();
    });
  });

  describe("Integration Flow", () => {
    it("handles the complete flow: loading → populated", async () => {
      const mockRefetch = jest.fn();
      const mockUseWagers = jest.spyOn(useWagersHook, "useWagers");

      // Start with loading
      mockUseWagers.mockReturnValue(
        createMockQueryResult({
          isLoading: true,
          data: undefined,
          refetch: mockRefetch,
        })
      );

      const { rerender } = renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByText("Fetching wagers from backend...")).toBeInTheDocument();

      // Then populated state (simulating backend fallback to dummy data)
      mockUseWagers.mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
          refetch: mockRefetch,
        })
      );

      rerender(<GlobalWagers />);

      expect(screen.getByText("1 total")).toBeInTheDocument();
      expect(screen.getByText("🔗 Connected to:")).toBeInTheDocument();
      expect(screen.getByText("starkwager-backend.onrender.com")).toBeInTheDocument();
    });

    it("handles backend fallback scenario correctly", () => {
      // This simulates the scenario where backend is empty but service returns dummy data
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers, // Dummy data from service
            total: 5,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      // Should show the wagers (dummy data)
      expect(screen.getByText("5 total")).toBeInTheDocument();
      expect(screen.getByText("🔗 Connected to:")).toBeInTheDocument();
      expect(screen.getByText("starkwager-backend.onrender.com")).toBeInTheDocument();
    });

    it("handles error to recovery flow", () => {
      const mockRefetch = jest.fn();
      const mockUseWagers = jest.spyOn(useWagersHook, "useWagers");

      // Start with error
      mockUseWagers.mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: new Error("Network error"),
          refetch: mockRefetch,
        })
      );

      const { rerender } = renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Failed to load wagers")).toBeInTheDocument();

      // Then recovery with data
      mockUseWagers.mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
          refetch: mockRefetch,
        })
      );

      rerender(<GlobalWagers />);

      expect(screen.getByText("1 total")).toBeInTheDocument();
    });
  });

  describe("Backend Integration", () => {
    it("displays correct backend URL in error state", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: new Error("Connection failed"),
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Backend: https://starkwager-backend.onrender.com")).toBeInTheDocument();
    });

    it("shows backend connection status in populated state", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: mockWagers,
            total: 1,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("🔗 Connected to:")).toBeInTheDocument();
      expect(screen.getByText("starkwager-backend.onrender.com")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper button roles and interactions", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          data: {
            wagers: [],
            total: 0,
            page: 1,
            limit: 10,
          },
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      const createButton = screen.getByRole("button", { name: /Create Your First Wager/i });
      expect(createButton).toBeInTheDocument();
      
      // Should be focusable
      createButton.focus();
      expect(document.activeElement).toBe(createButton);
    });

    it("provides proper error messaging", () => {
      jest.spyOn(useWagersHook, "useWagers").mockReturnValue(
        createMockQueryResult({
          isLoading: false,
          error: new Error("Custom error message"),
        })
      );

      renderWithQueryClient(<GlobalWagers />);

      expect(screen.getByText("Failed to load wagers")).toBeInTheDocument();
      expect(screen.getByText("Custom error message")).toBeInTheDocument();
    });
  });
}); 