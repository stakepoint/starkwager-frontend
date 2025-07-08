import { convertToByteArray, convertToU256 } from "@/lib/starknet-utils";
import { useContractWriteUtility } from "@/lib/blockchain-utils";
import {
  convertToContractCategory,
  convertToContractMode,
  convertToContractClaim,
  convertToU64,
} from "@/lib/starknet-utils";
import React, { useState } from "react";
import { useCreateWagerContext } from "@/contexts/createWager.context";
import { toast } from "sonner";
import { WAGER_ABI, WALLET_CONTRACT_ADDRESS } from "@/constants/contract";
import { CallData } from "starknet";
import { useRouter } from "next/navigation";
import { wagerService } from "@/services/api/wagerService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "@starknet-react/core";
import { useWalletStore } from "@/store/persistStore";
import { userService } from "@/services/api/userService";
import { useAuth } from "../auth/useAuth";

export interface Wager {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  stakeAmount: number;
  status: "active" | "pending" | "completed";
  createdById: string;
  txHash: string;
  txStatus: string;
  hashtags: string[];
  participants?: {
    id: string;
    username: string;
    avatar: string;
  }[];
  createdBy: {
    username: string;
    avatar: string;
  };
}

interface UseWagersOptions {
  useMockData?: boolean;
}

export const useWager = () => {
  const router = useRouter();
  const address = useWalletStore((state) => state.address);
  const { wagerData } = useCreateWagerContext();

  const { writeAsync, writeIsPending } = useContractWriteUtility(
    "create_wager",
    WAGER_ABI,
    WALLET_CONTRACT_ADDRESS
  );

  const {
    mutateAsync: createWagerServerRequest,
    isPending: createWagerServerRequestPending,
  } = useMutation({
    mutationFn: wagerService.createWager,
  });

  const {
    data: wagers,
    isLoading: isLoadingWagers,
    error: wagersError,
    refetch: refetchWagers,
  } = useQuery({
    queryKey: ["wagers"],
    queryFn: async () => {
      try {
        const response = await wagerService.getAllWagers();
        const wagersData = (response.data as Wager[]).filter(
          (wager) => wager.status === "active"
        );
        // Collect unique creator IDs
        const creatorIds = Array.from(
          new Set(wagersData.map((w) => w.createdById))
        );
        // Fetch and cache creator info
        const creatorCache: Record<
          string,
          { username: string; picture: string | null }
        > = {};
        await Promise.all(
          creatorIds.map(async (id) => {
            try {
              const user = await userService.getUserById(id);
              creatorCache[id] = {
                username: user.username,
                picture: user.picture,
              };
            } catch {
              creatorCache[id] = { username: "Unknown Creator", picture: null };
            }
          })
        );
        // Attach creator info to each wager
        return wagersData.map((wager) => ({
          ...wager,
          creatorUsername:
            creatorCache[wager.createdById]?.username || "Unknown Creator",
        }));
      } catch (error) {
        console.error("Error fetching wagers:", error);
        throw error;
      }
    },
  });

  const createWager = React.useCallback(async () => {
    try {
      if (!wagerData) {
        throw new Error("Wager data is not available");
      }

      if (!address) {
        throw new Error("Wallet not connected");
      }

      const { id: categoryId, name: categoryName } = wagerData.category;

      const convertedArgs = [
        convertToContractCategory(categoryName),
        convertToByteArray(wagerData.title),
        convertToByteArray(wagerData.terms),
        convertToU256(Number(wagerData.stake)),
        convertToContractMode(wagerData.mode),
        convertToContractClaim(wagerData.claim),
        convertToU64(wagerData.resolutionTime),
      ];

      const calldata = CallData.compile(convertedArgs);

      const result = await writeAsync(calldata);

      if (result.transaction_hash) {
        const storedProfile = localStorage.getItem("auth_user");

        if (!storedProfile) {
          throw new Error("User profile not found");
        }

        const profile = JSON.parse(storedProfile) as { id: string };

        await createWagerServerRequest({
          name: wagerData.title,
          description: wagerData.terms,
          categoryId: categoryId,
          stakeAmount: Number(wagerData.stake),
          status: "active",
          createdById: profile.id,
          txHash: result.transaction_hash,
          txStatus: "pending",
          hashtags: wagerData.hashtags.map((hashtag) => hashtag.name),
        }).then((_res) => {
          toast.success("Wager created successfully!", {
            className: "bg-green-500 text-white border-none",
          });

          router.push(
            `/dashboard/create-wager/${result.transaction_hash}/invite`
          );
        });
      }

      return result;
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Handle specific contract errors
      if (errorMessage.includes("u256_sub Overflow")) {
        errorMessage = "Insufficient balance for the stake amount";
      } else if (errorMessage.includes("argent/multicall-failed")) {
        errorMessage =
          "Transaction failed. Please check your balance and try again.";
      } else if (errorMessage.includes("No connector connected")) {
        errorMessage = "Please connect your wallet";
      }

      toast.error(errorMessage, {
        className: "bg-red-500 text-white border-none",
      });
    }
  }, [writeAsync, wagerData, router, address]);

  return {
    createWager,
    createWagerLoadingState: writeIsPending || createWagerServerRequestPending,
    wagers,
    isLoadingWagers,
    wagersError,
    refetchWagers,
  };
};

export function useWagers(options: UseWagersOptions = {}) {
  const { tokens, isAuthenticated } = useAuth();
  const { useMockData = false } = options;

  return useQuery<Wager[]>({
    queryKey: ["wagers", { useMockData }],
    queryFn: async () => {
      if (useMockData) {
        const mockData = await wagerService.getMockWagers();
        return processWagersData(mockData);
      }

      if (!tokens?.accessToken) {
        throw new Error("No access token available");
      }

      const response = await wagerService.getAllWagers(tokens.accessToken);
      return processWagersData(response);
    },
    enabled: useMockData || (isAuthenticated && !!tokens?.accessToken),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Helper function to process wagers data
function processWagersData(wagers: any[]): Wager[] {
  return wagers.map((wager: any) => {
    // Create proper user objects for the left and right sides
    const leftUser = {
      username:
        wager.createdBy?.username || `@${wager.creatorUsername || "creator"}`,
      icon: wager.createdBy?.avatar || "/images/leftWagercardUserOneIcon.svg",
    };

    // Check if there's an opponent/second participant
    const opponent =
      wager.participants && wager.participants.length > 1
        ? wager.participants[1]
        : null;

    const rightUser = opponent
      ? {
          id: "123" + wager.createdById,
          username: opponent.username || "@opponent",
          icon: opponent.avatar || "/images/rightWagercardUserOneIcon.svg",
        }
      : {
          id: "123" + wager.createdById,
          username: "Awaiting Opponent",
          icon: "/images/opponent.svg",
        };

    return {
      ...wager,
      createdBy: leftUser,
      rightUser,
      // Keep the original creatorUsername for fallback
      creatorUsername:
        wager.createdBy?.username || wager.creatorUsername || "Unknown Creator",
    };
  });
}

// Helper hook to get filtered wagers by status
export function useWagersByStatus(options: UseWagersOptions = {}) {
  const { data: wagers = [], ...queryResult } = useWagers(options);

  const activeWagers = wagers.filter(
    (wager) => wager.status.toLowerCase() === "active"
  );

  const pendingWagers = wagers.filter(
    (wager) => wager.status.toLowerCase() === "pending"
  );

  const completeWagers = wagers.filter(
    (wager) => wager.status.toLowerCase() === "completed"
  );

  return {
    activeWagers,
    pendingWagers,
    completeWagers,
    allWagers: wagers,
    ...queryResult,
  };
}
