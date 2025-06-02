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
      const response = await wagerService.getAllWagers(params);
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to fetch wagers");
      }
      
      return response.data!;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useWager = (wagerId: string) => {
  return useQuery({
    queryKey: ["wager", wagerId],
    queryFn: async () => {
      const response = await wagerService.getWagerById(wagerId);
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to fetch wager");
      }
      
      return response.data!;
    },
    enabled: !!wagerId,
    staleTime: 5 * 60 * 1000,
    retry: 3,
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