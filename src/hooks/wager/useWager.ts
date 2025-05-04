import { WAGER_CONTRACT_ADDRESS } from "@/constants/contracts";
import { convertToByteArray, convertToU256 } from "@/lib/starknet-utils";
import { WAGER_ABI } from "@/constants/contracts";
import { useContractWriteUtility } from "@/lib/blockchain-utils";
import {
  convertToContractCategory,
  convertToContractMode,
  convertToContractClaim,
  convertToU64,
} from "@/lib/starknet-utils";
import React from "react";
import { useCreateWagerContext } from "@/contextApi/createWager.context";
import { toast } from "sonner";

export const useCreateWager = () => {
  const { writeAsync, writeIsPending } = useContractWriteUtility(
    "create_wager",
    WAGER_ABI,
    WAGER_CONTRACT_ADDRESS
  );

  const { wagerData } = useCreateWagerContext();

  const createWager = React.useCallback(async () => {
    try {
      if (!wagerData) {
        throw new Error("Wager data is not available");
      }

      //   console.log("Wager data read from context in createWager:", wagerData);

      const convertedArgs = [
        convertToContractCategory(wagerData.category),
        convertToByteArray(wagerData.title),
        convertToByteArray(wagerData.terms),
        convertToU256(Number(wagerData.stake)),
        convertToContractMode(wagerData.mode),
        convertToContractClaim(wagerData.claim),
        convertToU64(wagerData.resolutionTime),
      ];

      //   console.log("Final convertedArgs:", convertedArgs);

      // Pass convertedArgs directly to writeAsync
      //   console.log("Calling writeAsync for create_wager");
      const result = await writeAsync(convertedArgs);

      //   console.log("Create Wager transaction submitted:", result);

      return result;
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      //   console.error("Error submitting create wager transaction:", error);

      switch (errorMessage) {
        case "No connector connected":
          errorMessage = "Please connect your wallet";
          break;
        default:
          errorMessage = "An unknown error occurred";
      }

      toast.error(errorMessage, {
        className: "bg-red-500 text-white border-none",
      });
    }
  }, [writeAsync, wagerData]);

  return { createWager, writeIsPending };
};
