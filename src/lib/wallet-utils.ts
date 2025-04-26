import { toast } from "sonner";
import { uint256 } from "starknet";

/**
 * Converts a decimal number to u256 format required by the Starknet contract
 * @param amount - The amount to convert
 * @returns A u256 object formatted correctly for Starknet contracts
 */
export const toU256 = (amount: number): { low: string; high: string } => {
  try {
    // Convert the amount to the smallest unit (assuming 18 decimals for tokens like ETH)
    // In a real app, you would handle this conversion based on the token's decimals
    const amountBigInt = BigInt(Math.floor(amount * 10**18));
    
    // Use the starknet.js uint256 utility to ensure proper formatting
    const u256Value = uint256.bnToUint256(amountBigInt);
    
    return {
      low: u256Value.low,
      high: u256Value.high
    };
  } catch (error) {
    console.error("Error converting to u256:", error);
    return { low: "0", high: "0" };
  }
};

/**
 * Converts a u256 value from the contract back to a decimal number
 * @param u256 - The u256 value from the contract
 * @returns The decimal representation
 */
export const fromU256 = (u256: { low: string; high: string }): number => {
  try {
    // Use the starknet.js uint256 utility to convert back from u256
    const valueBigInt = uint256.uint256ToBN({
      low: u256.low,
      high: u256.high
    });
    
    // Convert from smallest unit (18 decimals) back to a regular number
    return Number(valueBigInt) / 10**18;
  } catch (error) {
    console.error("Error converting from u256:", error);
    return 0;
  }
};

/**
 * Validates if an amount is valid for withdrawal
 * @param amount - The amount to validate
 * @param balance - The user's current balance
 * @returns An object with validation result and error message if applicable
 */
export const validateWithdrawalAmount = (
  amount: string, 
  balance: number
): { isValid: boolean; errorMessage: string | null } => {
  const numAmount = parseFloat(amount);

  if (!amount.trim() || isNaN(numAmount)) {
    return { isValid: false, errorMessage: "Please enter a valid amount" };
  }

  if (numAmount <= 0) {
    return { isValid: false, errorMessage: "Amount must be greater than zero" };
  }

  if (numAmount > balance) {
    return { isValid: false, errorMessage: "Insufficient balance" };
  }

  return { isValid: true, errorMessage: null };
};

/**
 * Formats a transaction result for display
 * @param txHash - The transaction hash
 * @param explorerUrl - The base URL for the block explorer
 * @returns Formatted transaction information
 */
export const formatTransactionResult = (
  txHash: string, 
  explorerUrl: string = "https://sepolia.voyager.online"
): { hash: string; url: string; shortHash: string } => {
  const shortHash = `${txHash.slice(0, 8)}...${txHash.slice(-6)}`;
  const url = `${explorerUrl}/tx/${txHash}`;
  
  return {
    hash: txHash,
    url,
    shortHash
  };
};

/**
 * Handles contract errors and displays appropriate messages
 * @param error - The error from the contract interaction
 */
export const handleContractError = (error: any): void => {
  console.error("Contract error:", error);
  
  // Extract the message from different possible error formats
  let message = "Transaction failed";
  
  if (typeof error === 'string') {
    message = error;
  } else if (error?.message) {
    message = error.message;
  } else if (error?.error?.message) {
    message = error.error.message;
  }
  
  // Clean up the message and make it user-friendly
  if (message.includes("execution reverted")) {
    message = "Transaction was rejected by the contract";
  } else if (message.includes("insufficient funds")) {
    message = "Insufficient funds to complete this transaction";
  } else if (message.includes("user rejected")) {
    message = "Transaction was rejected by user";
  }
  
  toast.error(message);
}; 