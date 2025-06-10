"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Plus, RefreshCw } from "lucide-react";
import { WithdrawIcon } from "@/svgs/withdrawIcon";
import { WithdrawIconLight } from "@/svgs/withdrawIconLight";
import { useWallet } from "@/contexts/WalletContext";
import { useAccount } from "@starknet-react/core";
import { formatBalance, addressShortner } from "@/lib/utils";
import { useContractFetch } from "@/lib/blockchain-utils";
import { fromU256 } from "@/lib/wallet-utils";
import { WALLET_CONTRACT_ABI } from "@/constants/contract";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WALLET_CONTRACT_ADDRESS as `0x${string}` || "0x1234567890123456789012345678901234567890";

interface WalletDetailsProps {
  setIsFundModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWithdrawModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  walletBalance: number;
}

export default function WalletDetails({
  setIsFundModalOpen,
  setIsWithdrawModalOpen,
  setWalletBalance,
  walletBalance = 1000 // Default value for demo
}: WalletDetailsProps) {
  const { address } = useAccount();
  const { balance, isLoading, error, refreshBalance: contextRefreshBalance } = useWallet();
  const [displayedBalance, setDisplayedBalance] = useState(walletBalance);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const previousBalanceRef = useRef(walletBalance);

  // Fetch wallet balance from contract
  const {
    readData: balanceData,
    dataRefetch: refetchBalance,
  } = useContractFetch(
    WALLET_CONTRACT_ABI,
    "get_balance",
    CONTRACT_ADDRESS,
    address ? [address] : []
  );

  // Update the wallet balance when data is fetched, but maintain the previous displayed value until new data is available
  useEffect(() => {
    if (balanceData && Array.isArray(balanceData) && balanceData.length > 0) {
      // Assuming the balance is returned as the first element in the array
      // and is a u256 object with low and high properties
      const u256Balance = balanceData[0];
      if (u256Balance && typeof u256Balance === 'object') {
        const decimalBalance = fromU256(u256Balance);

        // Update the parent component's state
        setWalletBalance(decimalBalance);

        // Only update the displayed balance if this isn't the initial load or if there's a change
        if (!isFirstLoad || Math.abs(decimalBalance - previousBalanceRef.current) > 0.001) {
          setDisplayedBalance(decimalBalance);
          previousBalanceRef.current = decimalBalance;
        }

        if (isFirstLoad) {
          setIsFirstLoad(false);
        }
      }
    }
  }, [balanceData, setWalletBalance, isFirstLoad]);

  // Combine refresh functions from both implementations
  const refreshBalance = useCallback(() => {
    if (address) {
      if (contextRefreshBalance) {
        contextRefreshBalance();
      } else {
        refetchBalance();
      }
    }
  }, [address, refetchBalance, contextRefreshBalance]);

  // Refresh balance every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (address) {
        refreshBalance();
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [address, refetchBalance, refreshBalance]);


  // Refresh balance when walletBalance prop changes (e.g., after withdraw/deposit)
  useEffect(() => {
    if (!isFirstLoad && Math.abs(walletBalance - displayedBalance) > 0.001) {
      setDisplayedBalance(walletBalance);
      previousBalanceRef.current = walletBalance;
      refreshBalance();
    }
  }, [walletBalance, displayedBalance, isFirstLoad, refreshBalance]);

  // For display purposes, prioritize context values if available, otherwise use contract values
  const displayAddress = address ? addressShortner(address) : "Not Connected";
  const displayBalance = isLoading ? displayedBalance : (balance !== undefined ? balance : displayedBalance);
  const formattedBalance = formatBalance(displayBalance);

  return (
    <div>
      <div className="grid pb-10 lg:gap-6 pt-5 lg:pt-[4rem]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-grey-3 dark:text-grey-5 tracking-tight">
              Wallet balance
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshBalance}
              className="text-blue-950 dark:text-white"
              data-testid="refresh-button"
              disabled={!address || isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-grey-8 p-1 px-2 rounded-[8px]">
            <span className="text-sm text-blue-950 dark:text-white font-medium">
              {displayAddress}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 text-blue-950 dark:text-white h-4 w-4"
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                }
              }}
              disabled={!address}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-2 lg:pt-0 lg:gap-3 items-center">
          {!address ? (
            <div className="text-grey-3 dark:text-grey-5">
              Connect wallet to view balance
            </div>
          ) : isLoading ? (
            <div className="animate-pulse" data-testid="loading-skeleton">
              <div className="h-8 w-32 bg-gray-200 dark:bg-grey-8 rounded"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 flex items-center gap-2">
              Error loading balance
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshBalance}
                className="text-red-500"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <h1 className="lg:text-[3.5rem] text-2xl tracking-tight lg:leading-10 text-blue-950 dark:text-white font-semibold">
                {formattedBalance} STRK
              </h1>
              <p className="text-grey-3 dark:text-grey-5 text-sm">
                Available Balance
              </p>
            </div>
          )}
        </div>

        <div className="flex h-fit gap-2">
          <div className="bg-white dark:bg-grey-8 w-full text-blue-950 dark:text-white flex items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
            <Button
              className="rounded-sm bg-body-bg dark:bg-grey-7 text-blue-950 dark:text-white h-12 w-12"
              size="icon"
              onClick={() => {
                setIsFundModalOpen(true);
                refreshBalance();
              }}
              data-testid="add-money-button"
              disabled={!address}
            >
              <Plus />
            </Button>
            <span className="text-sm">Add Money</span>
          </div>

          <div className="bg-white dark:bg-grey-8 w-full flex text-blue-950 dark:text-white items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
            <Button
              className="rounded-sm bg-body-bg dark:bg-grey-7 text-blue-950 dark:text-white h-12 w-12"
              size="icon"
              onClick={() => {
                setIsWithdrawModalOpen(true);
                refreshBalance();
              }}
              data-testid="withdraw-button"
              disabled={typeof displayBalance === 'number' && displayBalance <= 0}
            >
              <span className="dark:hidden">
                <WithdrawIcon />
              </span>
              <span className="dark:block hidden">
                <WithdrawIconLight />
              </span>
            </Button>
            <span className="text-sm">Withdraw</span>
          </div>
        </div>
      </div>
    </div>
  );
}