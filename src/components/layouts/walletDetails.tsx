"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Plus, RefreshCw } from "lucide-react";
import { WithdrawIcon } from "@/svgs/withdrawIcon";
import { WithdrawIconLight } from "@/svgs/withdrawIconLight";
import { useWallet } from "@/contexts/WalletContext";
import { useAccount } from "@starknet-react/core";
import { formatBalance } from "@/lib/utils";

interface WalletDetailsProps {
  setIsFundModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWithdrawModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WalletDetails({
  setIsFundModalOpen,
  setIsWithdrawModalOpen,
}: WalletDetailsProps) {
  const { address } = useAccount();
  const { balance, isLoading, error, refreshBalance } = useWallet();

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected';
  const formattedBalance = formatBalance(balance);

  return (
    <div>
      <div className="grid pb-10 lg:gap-6 pt-5 lg:pt-[4rem]">
        <div className="flex justify-between items-center">
          <h2 className="text-grey-3 dark:text-gey-5 tracking-tight">
            Wallet balance
          </h2>
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
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pt-2 lg:pt-0 lg:gap-3 items-center flex justify-between lg:grid">
          {isLoading ? (
            <div className="animate-pulse" data-testid="loading-skeleton">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">Error loading balance</div>
          ) : (
            <>
              <h1 className="lg:text-[3.5rem] text-2xl tracking-tight lg:leading-10 text-blue-950 dark:text-white font-semibold">
                {formattedBalance} STRK
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={refreshBalance}
                className="text-blue-950 dark:text-white"
                data-testid="refresh-button"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <div className="flex h-fit gap-2">
          <div className="bg-white dark:bg-grey-8 w-full text-blue-950 dark:text-white flex items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
            <Button
              className="rounded-sm bg-body-bg dark:bg-grey-7 text-blue-950 dark:text-white h-12 w-12"
              size="icon"
              onClick={() => setIsFundModalOpen(true)}
              data-testid="add-money-button"
            >
              <Plus />
            </Button>
            <span className="text-sm">Add Money</span>
          </div>

          <div className="bg-white dark:bg-grey-8 w-full flex text-blue-950 dark:text-white items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
            <Button
              className="rounded-sm bg-body-bg dark:bg-grey-7 text-blue-950 dark:text-white h-12 w-12"
              size="icon"
              onClick={() => setIsWithdrawModalOpen(true)}
              data-testid="withdraw-button"
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
