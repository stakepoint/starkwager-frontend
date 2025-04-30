import React from 'react';
import { act, waitFor } from '@testing-library/react';
import { WalletProvider, useWallet } from '../WalletContext';
import { useAccount } from '@starknet-react/core';
import { render } from '@/test/test-utils';

// Mock the hooks
jest.mock('@starknet-react/core', () => ({
  useAccount: jest.fn()
}));

// Create a mock for useContractFetch
const mockDataRefetch = jest.fn();
type MockContractFetchType = {
  readData: string | null;
  dataRefetch: jest.Mock;
  readIsError: boolean;
  readIsLoading: boolean;
  readError: Error | null;
};

let mockContractFetchImplementation: MockContractFetchType = {
  readData: null,
  dataRefetch: mockDataRefetch,
  readIsError: false,
  readIsLoading: false,
  readError: null
};

// Mock the blockchain-utils
jest.mock('@/lib/blockchain-utils', () => ({
  useContractFetch: () => mockContractFetchImplementation
}));

// Test component that uses the wallet context
const TestComponent = () => {
  const { balance, isLoading, error, refreshBalance } = useWallet();
  return (
    <div>
      <div data-testid="balance">{balance}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="error">{error?.message || 'no error'}</div>
      <button data-testid="refresh" onClick={refreshBalance}>
        Refresh
      </button>
    </div>
  );
};

describe('WalletContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // Reset the mock implementation
    mockContractFetchImplementation = {
      readData: null,
      dataRefetch: mockDataRefetch,
      readIsError: false,
      readIsLoading: false,
      readError: null
    };
    mockDataRefetch.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    (useAccount as jest.Mock).mockReturnValue({ address: null });

    const { getByTestId } = render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    expect(getByTestId('balance').textContent).toBe('0');
    expect(getByTestId('loading').textContent).toBe('false');
    expect(getByTestId('error').textContent).toBe('no error');
  });

  it('should update balance when data is received', async () => {
    (useAccount as jest.Mock).mockReturnValue({ 
      address: '0x123' 
    });
    
    mockContractFetchImplementation = {
      readData: '1000',
      dataRefetch: mockDataRefetch,
      readIsError: false,
      readIsLoading: false,
      readError: null
    };

    const { getByTestId } = render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => {
      expect(getByTestId('balance').textContent).toBe('1000');
    });
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch balance');
    (useAccount as jest.Mock).mockReturnValue({ 
      address: '0x123' 
    });
    
    mockContractFetchImplementation = {
      readData: null,
      dataRefetch: mockDataRefetch,
      readIsError: true,
      readIsLoading: false,
      readError: mockError
    };

    const { getByTestId } = render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => {
      expect(getByTestId('error').textContent).toBe('Failed to fetch balance');
    });
  });

  it('should show loading state', async () => {
    (useAccount as jest.Mock).mockReturnValue({ 
      address: '0x123' 
    });
    
    mockContractFetchImplementation = {
      readData: null,
      dataRefetch: mockDataRefetch,
      readIsError: false,
      readIsLoading: true,
      readError: null
    };

    const { getByTestId } = render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').textContent).toBe('true');
    });
  });

  it('should auto-refresh balance', () => {
    (useAccount as jest.Mock).mockReturnValue({ 
      address: '0x123' 
    });

    render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    // Fast-forward 30 seconds
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(mockDataRefetch).toHaveBeenCalled();
  });

  it('should manually refresh balance', async () => {
    (useAccount as jest.Mock).mockReturnValue({ 
      address: '0x123' 
    });

    const { getByTestId } = render(
      <WalletProvider>
        <TestComponent />
      </WalletProvider>
    );

    act(() => {
      getByTestId('refresh').click();
    });

    expect(mockDataRefetch).toHaveBeenCalled();
  });
}); 