import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAccount } from '@starknet-react/core';
import { useContractWriteUtility } from '@/lib/blockchain-utils';
import { toast } from 'sonner';
import FundWalletModal from '../fundWallet';

// Mock the dependencies
jest.mock('@starknet-react/core', () => ({
  useAccount: jest.fn(),
}));

jest.mock('@/lib/blockchain-utils', () => ({
  useContractWriteUtility: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('FundWalletModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccessfulFund = jest.fn();
  const mockWriteAsync = jest.fn();
  const mockAddress = '0x1234567890abcdef';

  beforeEach(() => {
    jest.clearAllMocks();
    (useAccount as jest.Mock).mockReturnValue({ address: mockAddress });
    (useContractWriteUtility as jest.Mock).mockReturnValue({
      writeAsync: mockWriteAsync,
      writeIsPending: false,
      waitIsLoading: false,
      waitIsError: false,
      waitError: null,
      waitStatus: 'idle',
    });
  });

  it('renders the initial funding form correctly', () => {
    render(
      <FundWalletModal
        onClose={mockOnClose}
        walletBalance={1000}
        onSuccessfulFund={mockOnSuccessfulFund}
      />
    );

    expect(screen.getByText('Fund Your Wallet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fund' })).toBeInTheDocument();
  });

  describe('Input Validation', () => {
    it('handles basic input validation correctly', async () => {
      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      const fundButton = screen.getByRole('button', { name: 'Fund' });

      // Test invalid input (negative number)
      fireEvent.change(input, { target: { value: '-10' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid amount', { exact: true })).toBeInTheDocument();
      });

      // Test invalid input (non-numeric)
      fireEvent.change(input, { target: { value: 'abc' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid amount', { exact: true })).toBeInTheDocument();
      });

      // Test valid input
      fireEvent.change(input, { target: { value: '100' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Confirm Funding')).toBeInTheDocument();
      });
    });

    it('handles decimal precision correctly', async () => {
      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      const fundButton = screen.getByRole('button', { name: 'Fund' });

      // Test multiple decimal points
      fireEvent.change(input, { target: { value: '100.50.25' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid amount', { exact: true })).toBeInTheDocument();
      });

      // Test valid decimal input
      fireEvent.change(input, { target: { value: '100.50' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Confirm Funding')).toBeInTheDocument();
        expect(screen.getByText('100.50 Strk', { exact: true })).toBeInTheDocument();
      });
    });

    it('handles maximum value and overflow', async () => {
      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      const fundButton = screen.getByRole('button', { name: 'Fund' });

      // Test very large number
      fireEvent.change(input, { target: { value: '999999999999999999999999' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid amount', { exact: true })).toBeInTheDocument();
      });

      // Test reasonable maximum
      fireEvent.change(input, { target: { value: '1000000' } });
      fireEvent.click(fundButton);
      await waitFor(() => {
        expect(screen.getByText('Confirm Funding')).toBeInTheDocument();
      });
    });
  });

  describe('Balance Updates', () => {
    it('updates balance correctly after successful funding', async () => {
      const mockTransactionHash = '0xabcdef1234567890';
      mockWriteAsync.mockResolvedValueOnce({ transaction_hash: mockTransactionHash });

      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      fireEvent.change(input, { target: { value: '100.50' } });
      fireEvent.click(screen.getByRole('button', { name: 'Fund' }));
      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

      // Update the mock to simulate success state
      (useContractWriteUtility as jest.Mock).mockReturnValue({
        writeAsync: mockWriteAsync,
        writeIsPending: false,
        waitIsLoading: false,
        waitIsError: false,
        waitError: null,
        waitStatus: 'success',
      });

      await waitFor(() => {
        expect(mockWriteAsync).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('Wallet funded successfully!');
        expect(mockOnSuccessfulFund).toHaveBeenCalledWith(100.50);
      });
    });

    it('displays correct balance format in confirmation dialog', async () => {
      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      fireEvent.change(input, { target: { value: '1234.56' } });
      fireEvent.click(screen.getByRole('button', { name: 'Fund' }));

      await waitFor(() => {
        expect(screen.getByText('1234.56 Strk', { exact: true })).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('handles wallet not connected error', async () => {
      (useAccount as jest.Mock).mockReturnValue({ address: null });

      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      fireEvent.change(input, { target: { value: '100' } });
      fireEvent.click(screen.getByRole('button', { name: 'Fund' }));

      await waitFor(() => {
        expect(screen.getByText('Wallet not connected', { exact: true })).toBeInTheDocument();
      });
    });

    it('handles contract interaction errors', async () => {
      const mockError = new Error('Transaction failed');
      mockWriteAsync.mockRejectedValueOnce(mockError);

      (useContractWriteUtility as jest.Mock).mockReturnValue({
        writeAsync: mockWriteAsync,
        writeIsPending: false,
        waitIsLoading: false,
        waitIsError: true,
        waitError: mockError,
        waitStatus: 'error',
      });

      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      fireEvent.change(input, { target: { value: '100' } });
      fireEvent.click(screen.getByRole('button', { name: 'Fund' }));
      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

      await waitFor(() => {
        expect(mockWriteAsync).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalled();
      });
    });

    it('handles network errors gracefully', async () => {
      const mockError = new Error('Network error');
      mockWriteAsync.mockRejectedValueOnce(mockError);

      (useContractWriteUtility as jest.Mock).mockReturnValue({
        writeAsync: mockWriteAsync,
        writeIsPending: false,
        waitIsLoading: false,
        waitIsError: true,
        waitError: mockError,
        waitStatus: 'error',
      });

      render(
        <FundWalletModal
          onClose={mockOnClose}
          walletBalance={1000}
          onSuccessfulFund={mockOnSuccessfulFund}
        />
      );

      const input = screen.getByPlaceholderText('0.00');
      fireEvent.change(input, { target: { value: '100' } });
      fireEvent.click(screen.getByRole('button', { name: 'Fund' }));
      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

      await waitFor(() => {
        expect(mockWriteAsync).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalled();
      });
    });
  });

  it('handles confirmation dialog correctly', async () => {
    render(
      <FundWalletModal
        onClose={mockOnClose}
        walletBalance={1000}
        onSuccessfulFund={mockOnSuccessfulFund}
      />
    );

    const input = screen.getByPlaceholderText('0.00');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: 'Fund' }));

    await waitFor(() => {
      expect(screen.getByText('Confirm Funding')).toBeInTheDocument();
      expect(screen.getByText('100.00 Strk', { exact: true })).toBeInTheDocument();
    });

    // Test cancel button
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(screen.queryByText('Confirm Funding')).not.toBeInTheDocument();
    });
  });

  it('disables input and buttons during processing', async () => {
    (useContractWriteUtility as jest.Mock).mockReturnValue({
      writeAsync: mockWriteAsync,
      writeIsPending: true,
      waitIsLoading: true,
      waitIsError: false,
      waitError: null,
      waitStatus: 'loading',
    });

    render(
      <FundWalletModal
        onClose={mockOnClose}
        walletBalance={1000}
        onSuccessfulFund={mockOnSuccessfulFund}
      />
    );

    const input = screen.getByPlaceholderText('0.00');
    const fundButton = screen.getByRole('button', { name: 'Processing...' });

    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(fundButton).toHaveClass('disabled:pointer-events-none');
  });

  it('handles successful funding state correctly', async () => {
    render(
      <FundWalletModal
        onClose={mockOnClose}
        walletBalance={1000}
        onSuccessfulFund={mockOnSuccessfulFund}
      />
    );

    const input = screen.getByPlaceholderText('0.00');
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(screen.getByRole('button', { name: 'Fund' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    // Update the mock to simulate success state
    (useContractWriteUtility as jest.Mock).mockReturnValue({
      writeAsync: mockWriteAsync,
      writeIsPending: false,
      waitIsLoading: false,
      waitIsError: false,
      waitError: null,
      waitStatus: 'success',
    });

    await waitFor(() => {
      expect(screen.getByText('Successfully Funded')).toBeInTheDocument();
      expect(screen.getByText(/100.00 Strk/)).toBeInTheDocument();
    });
  });
}); 