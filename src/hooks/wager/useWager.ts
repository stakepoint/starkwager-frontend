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

export const useCreateWager = () => {
  const router = useRouter();

  const { writeAsync, writeIsPending } = useContractWriteUtility(
    "create_wager",
    WAGER_ABI,
    WALLET_CONTRACT_ADDRESS
  );

  const { wagerData } = useCreateWagerContext();

  const createWager = React.useCallback(async () => {
    try {
      if (!wagerData) {
        throw new Error("Wager data is not available");
      }

      const convertedArgs = [
        convertToContractCategory(wagerData.category),
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
        toast.success("Wager created successfully!", {
          className: "bg-green-500 text-white border-none",
        });

        router.push(
          `/dashboard/create-wager/${result.transaction_hash}/invite`
        );
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
  }, [writeAsync, wagerData, router]);

  return { createWager, writeIsPending };
};
