import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import WalletDetails from '../walletDetails';
import { useWallet } from '@/contexts/WalletContext';
import { useAccount } from '@starknet-react/core';
import { render } from '@/test/test-utils';

// Mock the hooks
jest.mock('@/contexts/WalletContext');
jest.mock('@starknet-react/core');

describe('WalletDetails', () => {
  const mockSetIsFundModalOpen = jest.fn();
  const mockSetIsWithdrawModalOpen = jest.fn();
  const mockRefreshBalance = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state', () => {
    (useWallet as jest.Mock).mockReturnValue({
      balance: '0',
      isLoading: true,
      error: null,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({ address: null });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('should display error state', () => {
    const mockError = new Error('Failed to load balance');
    (useWallet as jest.Mock).mockReturnValue({
      balance: '0',
      isLoading: false,
      error: mockError,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({ address: null });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    expect(screen.getByText('Error loading balance')).toBeInTheDocument();
  });

  it('should display formatted balance', () => {
    (useWallet as jest.Mock).mockReturnValue({
      balance: '1000',
      isLoading: false,
      error: null,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({
      address: '0x1234567890abcdef'
    });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    expect(screen.getByText('1000.00 STRK')).toBeInTheDocument();
  });

  it('should handle refresh button click', () => {
    (useWallet as jest.Mock).mockReturnValue({
      balance: '1000',
      isLoading: false,
      error: null,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({
      address: '0x1234567890abcdef'
    });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    fireEvent.click(screen.getByTestId('refresh-button'));
    expect(mockRefreshBalance).toHaveBeenCalled();
  });

  it('should handle fund wallet button click', () => {
    (useWallet as jest.Mock).mockReturnValue({
      balance: '1000',
      isLoading: false,
      error: null,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({
      address: '0x1234567890abcdef'
    });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    const addMoneyButton = screen.getByTestId('add-money-button');
    fireEvent.click(addMoneyButton);
    expect(mockSetIsFundModalOpen).toHaveBeenCalledWith(true);
  });

  it('should handle withdraw button click', () => {
    (useWallet as jest.Mock).mockReturnValue({
      balance: '1000',
      isLoading: false,
      error: null,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({
      address: '0x1234567890abcdef'
    });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    const withdrawButton = screen.getByTestId('withdraw-button');
    fireEvent.click(withdrawButton);
    expect(mockSetIsWithdrawModalOpen).toHaveBeenCalledWith(true);
  });

  it('should display shortened wallet address', () => {
    (useWallet as jest.Mock).mockReturnValue({
      balance: '1000',
      isLoading: false,
      error: null,
      refreshBalance: mockRefreshBalance
    });
    (useAccount as jest.Mock).mockReturnValue({
      address: '0x1234567890abcdef'
    });

    render(
      <WalletDetails
        setIsFundModalOpen={mockSetIsFundModalOpen}
        setIsWithdrawModalOpen={mockSetIsWithdrawModalOpen}
      />
    );

    expect(screen.getByText('0x1234...cdef')).toBeInTheDocument();
  });
}); 