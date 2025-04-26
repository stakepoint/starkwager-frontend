import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WithdrawFundsModal from "./withdrawFunds";
import { toast } from "sonner";
import * as walletUtils from "@/lib/wallet-utils";
import * as blockchainUtils from "@/lib/blockchain-utils";

// Mock the imports
jest.mock("sonner");
jest.mock("@starknet-react/core", () => ({
  useAccount: () => ({ address: "0x1234567890" }),
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("WithdrawFundsModal", () => {
  // Mock implementation for useContractWriteUtility
  const mockWriteAsync = jest.fn();
  const mockContractWriteUtility = {
    writeAsync: mockWriteAsync,
    writeData: { transaction_hash: "0xmocktxhash" },
    writeIsPending: false,
    waitIsLoading: false,
    waitIsError: false,
    waitStatus: null,
    waitError: null,
    calls: [],
    waitData: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(blockchainUtils, "useContractWriteUtility").mockReturnValue(mockContractWriteUtility);
    jest.spyOn(walletUtils, "toU256").mockReturnValue({ low: "10", high: "0" });
    jest.spyOn(walletUtils, "validateWithdrawalAmount").mockImplementation(
      (amount, balance) => {
        if (!amount.trim() || isNaN(parseFloat(amount))) {
          return { isValid: false, errorMessage: "Please enter a valid amount" };
        }
        if (parseFloat(amount) <= 0) {
          return {
            isValid: false,
            errorMessage: "Amount must be greater than zero",
          };
        }
        if (parseFloat(amount) > balance) {
          return { isValid: false, errorMessage: "Insufficient balance" };
        }
        return { isValid: true, errorMessage: null };
      }
    );
    jest.spyOn(walletUtils, "handleContractError").mockImplementation(() => {});
  });

  test("renders withdraw form correctly", () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    expect(screen.getByText("Withdraw Your Funds")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    expect(screen.getByText("Withdraw")).toBeInTheDocument();
  });

  test("displays available balance", () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={500} />);
    
    expect(screen.getByText("Available balance: $500.00 (500.00 Strk)")).toBeInTheDocument();
  });

  test("handles valid input amount", async () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "100");
    
    expect(inputElement).toHaveValue("100");
    expect(screen.getByText("100.00 Strk")).toBeInTheDocument();
  });

  test("validates input - rejects amount greater than balance", async () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={100} />);
    
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "200");
    
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
    
    expect(screen.getByText("Insufficient balance")).toBeInTheDocument();
    expect(mockWriteAsync).not.toHaveBeenCalled();
  });

  test("validates input - rejects negative or zero amounts", async () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "0");
    
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
    
    expect(screen.getByText("Amount must be greater than zero")).toBeInTheDocument();
    expect(mockWriteAsync).not.toHaveBeenCalled();
  });

  test("shows confirmation dialog before withdrawal", async () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "100");
    
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
    
    expect(screen.getByText("Confirm Withdrawal")).toBeInTheDocument();
    expect(screen.getByText(/You are about to withdraw/)).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("processes withdrawal after confirmation", async () => {
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "100");
    
    // Click withdraw to show confirmation
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
    
    // Confirm the withdrawal
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    
    expect(mockWriteAsync).toHaveBeenCalled();
  });

  test("displays loading state during processing", async () => {
    // Mock pending state
    jest.spyOn(blockchainUtils, "useContractWriteUtility").mockReturnValue({
      ...mockContractWriteUtility,
      writeIsPending: true,
    });
    
    render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(screen.getByText("Processing...")).toBeDisabled();
  });

  test("displays success screen after successful withdrawal", async () => {
    const { rerender } = render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    // Enter amount and submit
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "100");
    
    // Click withdraw to show confirmation
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
    
    // Confirm the withdrawal
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    
    // Now mock the success state
    jest.spyOn(blockchainUtils, "useContractWriteUtility").mockReturnValue({
      ...mockContractWriteUtility,
      waitStatus: "success",
    });
    
    // Re-render to simulate state update
    rerender(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    expect(toast.success).toHaveBeenCalledWith("Withdrawal successful!");
    expect(screen.getByText("Successfully Transferred")).toBeInTheDocument();
    expect(screen.getByText(/You've successfully withdrawn/)).toBeInTheDocument();
    expect(screen.getByText("View transaction")).toBeInTheDocument();
  });

  test("handles errors during withdrawal", async () => {
    const { rerender } = render(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    // Enter amount and submit
    const inputElement = screen.getByPlaceholderText("0.00");
    await userEvent.type(inputElement, "100");
    
    // Click withdraw to show confirmation
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
    
    // Confirm the withdrawal
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    
    // Mock a contract error
    const mockError = new Error("Contract execution failed");
    jest.spyOn(blockchainUtils, "useContractWriteUtility").mockReturnValue({
      ...mockContractWriteUtility,
      waitIsError: true,
      waitError: mockError,
    });
    
    // Re-render to simulate state update
    rerender(<WithdrawFundsModal onClose={() => {}} walletBalance={1000} />);
    
    expect(walletUtils.handleContractError).toHaveBeenCalledWith(mockError);
  });
}); 