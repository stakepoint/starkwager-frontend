import { WAGER_CONTRACT_ADDRESS } from "@/constants/contracts";
import { convertToU256 } from "@/lib/starknet-utils";
import { WAGER_ABI } from "@/constants/contracts";
import { useContractWriteUtility } from "@/lib/blockchain-utils";
import {
  convertToContractCategory,
  convertToByteArray,
  convertToContractMode,
  convertToContractClaim,
  convertToU64,
} from "@/lib/starknet-utils";
import React from "react";
import { useCreateWagerContext } from "@/contextApi/createWager.context";

export const useCreateWager = () => {
  const { writeAsync, writeIsPending } = useContractWriteUtility(
    "create_wager",
    WAGER_ABI,
    WAGER_CONTRACT_ADDRESS as `0x${string}`
  );

  const { wagerData } = useCreateWagerContext();

  // Function to convert args, set state, and immediately call writeAsync
  const createWager = React.useCallback(async () => {
    try {
      if (!wagerData) {
        throw new Error("Wager data is not available");
      }

      // Add console log to check the wagerData being used
      console.log("Wager data read from context in createWager:", wagerData);

      const convertedArgs = [
        convertToContractCategory(wagerData.category),
        convertToByteArray(wagerData.title),
        convertToByteArray(wagerData.terms),
        convertToU256(Number(wagerData.stake)),
        convertToContractMode(wagerData.mode),
        convertToContractClaim(wagerData.claim),
        convertToU64(wagerData.resolutionTime),
      ];

      console.log("Preparing to call create_wager with args:", convertedArgs);

      // Pass convertedArgs directly to writeAsync
      console.log("Calling writeAsync for create_wager");
      const result = await writeAsync(convertedArgs);

      console.log("Create Wager transaction submitted:", result);

      return result;
    } catch (error) {
      console.error("Error submitting create wager transaction:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to submit wager transaction: ${error.message}`);
      } else {
        throw new Error(
          `Failed to submit wager transaction: An unknown error occurred`
        );
      }
    }
  }, [writeAsync, wagerData]);

  return { createWager, writeIsPending };
};
