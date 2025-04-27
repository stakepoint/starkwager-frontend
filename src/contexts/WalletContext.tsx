"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from '@starknet-react/core';
import { useContractFetch } from '@/lib/blockchain-utils';
import { CONTRACT_ABI } from '@/constants/contract';

interface WalletContextType {
  balance: string;
  isLoading: boolean;
  error: Error | null;
  refreshBalance: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [error, setError] = useState<Error | null>(null);

  const {
    readData,
    dataRefetch,
    readIsError,
    readIsLoading,
    readError
  } = useContractFetch(
    CONTRACT_ABI,
    'get_balance',
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    address ? [address] : []
  );

  useEffect(() => {
    if (readData) {
      // Convert u256 to string with proper formatting
      const balanceStr = readData.toString();
      setBalance(balanceStr);
    }
  }, [readData]);

  useEffect(() => {
    if (readIsError && readError) {
      setError(readError as Error);
    }
  }, [readIsError, readError]);

  const refreshBalance = () => {
    dataRefetch();
  };

  // Auto-refresh balance every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (address) {
        refreshBalance();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        balance,
        isLoading: readIsLoading,
        error,
        refreshBalance
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 