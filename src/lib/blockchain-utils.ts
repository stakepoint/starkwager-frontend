import {
  useBlockNumber,
  useContract,
  useReadContract,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RpcProvider } from "starknet";

// Utility function to perform contract read operations
export function useContractFetch(
  abi: any,
  functionName: string,
  contract_address: `0x${string}`,
  args: any[] = []
) {
  const {
    data: readData,
    refetch: dataRefetch,
    isError: readIsError,
    isLoading: readIsLoading,
    error: readError,
  } = useReadContract({
    abi: abi,
    functionName: functionName,
    address: contract_address,
    args: args,
    refetchInterval: 1000,
  });

  return { readData, dataRefetch, readIsError, readIsLoading, readError };
}

// Utility function to perform contract write operations
export function useContractWriteUtility(
  functionName: string,
  args: any[],
  abi: any,
  contract_address: `0x${string}`
) {
  const { contract } = useContract({ abi, address: contract_address });

  const calls = useMemo(() => {
    if (
      !contract ||
      !args ||
      args.some((arg) => arg === undefined || arg === null)
    ) {
      return undefined;
    }

    try {
      // For debugging purposes
      console.log("Contract call args:", JSON.stringify(args));
      
      // For u256 parameters (which are objects with low and high), we need to pass them directly
      return [contract.populate(functionName, args)];
    } catch (error) {
      console.error("Error creating contract call:", error);
      return undefined;
    }
  }, [contract, functionName, args]);

  const {
    send: writeAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({ calls });

  const {
    isLoading: waitIsLoading,
    data: waitData,
    status: waitStatus,
    isError: waitIsError,
    error: waitError,
  } = useTransactionReceipt({
    hash: writeData?.transaction_hash,
    watch: true,
  });

  return {
    writeAsync,
    writeData,
    writeIsPending,
    waitIsLoading,
    waitData,
    waitStatus,
    waitIsError,
    waitError,
    calls,
  };
}

// Utility function to get contract events
type ContractEvent = {
  from_address: string;
  keys: string[];
  data: string[];
};

export function useContractEvents(
  contract_address: `0x${string}`,
  enabled: boolean = true,
  interval: number = 3000,
  limit: number = 5
) {
  const provider = useMemo(
    () => new RpcProvider({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL! }),
    []
  );
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const lastCheckedBlockRef = useRef(0);
  const { data: blockNumber } = useBlockNumber({ refetchInterval: interval });

  const checkForEvents = useCallback(
    async (currentBlockNumber: number) => {
      if (
        !contract_address ||
        currentBlockNumber <= lastCheckedBlockRef.current
      ) {
        return;
      }

      try {
        const fromBlock = lastCheckedBlockRef.current + 1;
        const fetchedEvents = await provider.getEvents({
          address: contract_address,
          from_block: { block_number: fromBlock },
          to_block: { block_number: currentBlockNumber },
          chunk_size: 500,
        });

        if (fetchedEvents?.events?.length) {
          setEvents((prev) => [...prev, ...fetchedEvents.events]);
        }

        lastCheckedBlockRef.current = currentBlockNumber;
      } catch (error) {
        console.error("Error checking for events:", error);
      }
    },
    [contract_address, provider]
  );

  useEffect(() => {
    if (enabled && contract_address && blockNumber) {
      checkForEvents(blockNumber);
    }
  }, [contract_address, blockNumber, checkForEvents, enabled]);

  const lastEvents = useMemo(() => {
    return [...events].reverse().slice(0, limit);
  }, [events, limit]);

  return {
    events,
    lastEvents,
    total: events.length,
  };
}
