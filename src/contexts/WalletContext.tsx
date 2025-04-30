"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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

/**
 * @param uint256Value 
 * @returns 
 */
function formatUint256ToString(uint256Value: any): string {
  try {
    if (Array.isArray(uint256Value)) {
      const [low, high] = uint256Value;
      const fullValue = (BigInt(high) << BigInt(128)) + BigInt(low);
      return (Number(fullValue) / 1e18).toFixed(2);
    }
    return (Number(uint256Value) / 1e18).toFixed(2);
  } catch (error) {
    console.error('Error formatting uint256:', error);
    return '0.00';
  }
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [error, setError] = useState<Error | null>(null);

  // Get the user's in-app wallet balance
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
    address ? [address] : undefined 
  );

  // Update balance when data changes
  useEffect(() => {
    if (readData) {
      try {
        const balanceStr = formatUint256ToString(readData);
        setBalance(balanceStr);
        setError(null); 
      } catch (err) {
        setError(new Error('Failed to format balance'));
      }
    }
  }, [readData]);

  // Handle errors
  useEffect(() => {
    if (readIsError && readError) {
      setError(readError as Error);
    } else if (!readIsError) {
      setError(null); 
    }
  }, [readIsError, readError]);

  // Manual refresh function
  const refreshBalance = useCallback(() => {
    if (address) {
      dataRefetch();
    }
  }, [address, dataRefetch]);

  // Auto-refresh balance every 10 seconds if we have an address
  useEffect(() => {
    if (!address) return;

    const interval = setInterval(refreshBalance, 10000);
    return () => clearInterval(interval);
  }, [refreshBalance, address]);

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