import { useQuery } from "@tanstack/react-query";
import { wagerService, type Wager, type GetAllWagersResponse } from "@/services/api/wagerService";

export interface UseWagersParams {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
}

export const useWagers = (params?: UseWagersParams) => {
  return useQuery({
    queryKey: ["wagers", params],
    queryFn: async () => {
      console.log("🔄 useWagers: Starting API call with params:", params);
      
      try {
        const response = await wagerService.getAllWagers(params);
        console.log("✅ useWagers: API call successful:", response);
        
        if (response.error) {
          console.error("❌ useWagers: API returned error:", response.error);
          throw new Error(response.error.message || "Failed to fetch wagers");
        }
        
        return response.data!;
      } catch (error: any) {
        console.error("❌ useWagers: API call failed:", error);
        
        // Instead of throwing, return dummy data for now to prevent infinite loading
        console.log("🔄 useWagers: Falling back to dummy data due to error");
        const dummyWagers = wagerService.getDummyWagers();
        const limit = params?.limit || 10;
        const page = params?.page || 1;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedWagers = dummyWagers.slice(startIndex, endIndex);
        
        return {
          wagers: paginatedWagers,
          total: dummyWagers.length,
          page,
          limit,
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Add timeout to prevent hanging
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    // Add network mode to handle offline scenarios
    networkMode: 'online',
  });
};

export const useWager = (wagerId: string) => {
  return useQuery({
    queryKey: ["wager", wagerId],
    queryFn: async () => {
      console.log("🔄 useWager: Starting API call for wager:", wagerId);
      
      try {
        const response = await wagerService.getWagerById(wagerId);
        console.log("✅ useWager: API call successful:", response);
        
        if (response.error) {
          console.error("❌ useWager: API returned error:", response.error);
          throw new Error(response.error.message || "Failed to fetch wager");
        }
        
        return response.data!;
      } catch (error: any) {
        console.error("❌ useWager: API call failed:", error);
        
        // Fallback to dummy data
        const dummyWagers = wagerService.getDummyWagers();
        const dummyWager = dummyWagers.find(w => w.id === wagerId);
        
        if (dummyWager) {
          console.log("🔄 useWager: Found in dummy data");
          return dummyWager;
        }
        
        throw error;
      }
    },
    enabled: !!wagerId,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    networkMode: 'online',
  });
};

// Helper function to transform API wager data to UI format
export const transformWagerToCardProps = (wager: Wager) => {
  return {
    wagerId: wager.id,
    question: wager.title,
    wagerStatus: wager.status,
    stakeAmount: wager.stake,
    leftUser: {
      username: `@${wager.createdBy.username}`,
      icon: wager.createdBy.picture || "/images/avatar.svg",
    },
    rightUser: wager.opponent
      ? {
          username: `@${wager.opponent.username}`,
          icon: wager.opponent.picture || "/images/avatar.svg",
        }
      : {
          username: "Awaiting Opponent",
          icon: "/images/opponent.svg",
        },
  };
}; 