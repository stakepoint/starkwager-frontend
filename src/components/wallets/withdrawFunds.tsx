import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { useContractWriteUtility } from "@/lib/blockchain-utils";
import { toast } from "sonner";
import { 
  toU256, 
  validateWithdrawalAmount, 
  handleContractError 
} from "@/lib/wallet-utils";

// Simple ABI for the withdraw_from_wallet function
const withdrawAbi = [
  {
    name: "withdraw_from_wallet",
    type: "function",
    inputs: [
      {
        name: "amount",
        type: "core::integer::u256"
      }
    ],
    outputs: [],
    state_mutability: "external"
  }
];

// Contract address should come from environment variables in production
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WALLET_CONTRACT_ADDRESS as `0x${string}` || "0x1234567890123456789012345678901234567890";

interface WithdrawFundsModalProps {
  onClose: () => void;
  // In a real app, you would pass the user's balance as a prop or fetch it
  walletBalance?: number;
  // Optional callback to refresh the balance after withdrawal
  onSuccessfulWithdraw?: (amount: number) => void;
}

const WithdrawFundsModal: React.FC<WithdrawFundsModalProps> = ({ 
  onClose,
  walletBalance = 1000, // Default value for demo, in real app you'd pass this or fetch it
  onSuccessfulWithdraw
}) => {
  const [withdrawState, setWithdrawState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { address } = useAccount();
  const withdrawAmountRef = useRef<number>(0);

  // Convert amount to u256 format for contract interaction
  const getAmountInU256 = () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      return null;
    }
    return toU256(amount);
  };

  // Prepare the amount parameter for the contract
  const amountParam = getAmountInU256();

  // Contract interaction hook
  const {
    writeAsync,
    writeData,
    writeIsPending,
    waitIsLoading,
    waitIsError,
    waitError,
    waitStatus
  } = useContractWriteUtility(
    "withdraw_from_wallet",
    amountParam ? [amountParam] : [],
    withdrawAbi,
    CONTRACT_ADDRESS
  );

  // Show confirmation dialog before withdrawal
  const handleWithdraw = () => {
    setError(null);
    
    // Validate the input amount
    const validation = validateWithdrawalAmount(inputValue, walletBalance);
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    if (!address) {
      setError("Wallet not connected");
      return;
    }

    // Store the amount being withdrawn
    withdrawAmountRef.current = parseFloat(inputValue);

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  // Process withdrawal after confirmation
  const processWithdrawal = async () => {
    try {
      setIsProcessing(true);
      // Log the amount for debugging
      console.log("Processing withdrawal with amount:", amountParam);
      await writeAsync();
      
      // The transaction hash will be available in writeData.transaction_hash
      if (writeData?.transaction_hash) {
        setTransactionHash(writeData.transaction_hash);
      }
      // Success will be handled by the useEffect watching waitStatus
    } catch (err) {
      handleContractError(err);
      setIsProcessing(false);
    } finally {
      setShowConfirmation(false);
    }
  };

  // Watch transaction status
  useEffect(() => {
    if (waitStatus === "success") {
      setWithdrawState(true);
      setIsProcessing(false);
      toast.success("Withdrawal successful!");
      
      // Update the wallet balance in the parent component
      if (onSuccessfulWithdraw && withdrawAmountRef.current > 0) {
        // Call the callback with the withdrawal amount
        onSuccessfulWithdraw(withdrawAmountRef.current);
      }
    } else if (waitIsError && waitError) {
      handleContractError(waitError);
      setIsProcessing(false);
    }
  }, [waitStatus, waitIsError, waitError, onSuccessfulWithdraw]);

  useEffect(() => {
    if (!withdrawState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [withdrawState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setInputValue(value);
    setInputWidth(Math.max(100, value.length * 30));
    
    // Clear error when user starts typing again
    if (error) {
      setError(null);
    }
  };

  // Helper function to calculate max withdrawal amount
  const handleMaxClick = () => {
    if (walletBalance > 0) {
      setInputValue(walletBalance.toString());
      setInputWidth(Math.max(100, walletBalance.toString().length * 30));
    }
  };

  return (
    <div>
      {!withdrawState ? (
        <>
          <h3 className="text-center font-medium text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
            Withdraw Your Funds
          </h3>
          <div className="flex flex-col w-full justify-center items-center">
            <p className="text-center max-w-[263px] md:max-w-full text-sm md:text-lg text-grey-1 dark:text-white tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              Enter the amount you want to withdraw to your wallet and cash out
              wagers.
            </p>
            
            {/* Balance indicator */}
            <div className="text-sm text-grey-1 dark:text-white mt-1 flex items-center justify-between w-full max-w-[263px] md:max-w-[352px]">
              <span>Available balance: ${walletBalance.toFixed(2)}</span>
              <button 
                onClick={handleMaxClick}
                className="text-blue-500 text-xs font-medium"
                type="button"
              >
                MAX
              </button>
            </div>
            
            <div className="mt-6 mb-8">
              <div className="flex items-center justify-center">
                <span className="text-5xl text-grey-2 dark:text-white font-bold">$</span>
                <Input
                  ref={inputRef}
                  className="border-none md:text-5xl text-5xl font-bold p-0 text-grey-2 dark:text-white h-[58px]"
                  type="text"
                  placeholder="0.00"
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{ width: `${inputWidth}px` }}
                  disabled={isProcessing}
                />
              </div>
              <div className="flex gap-1 items-center justify-center">
                <div className="relative h-4 w-4 overflow-hidden rounded-xl">
                  <Image
                    src="/images/StrkLogo.svg"
                    alt="StrkLogo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="leading-[130%] tracking-[-0.32px] dark:text-white">
                  {inputValue ? `${(parseFloat(inputValue) || 0).toFixed(2)} Strk` : "0 Strk"}
                </span>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm mt-2 text-center">
                  {error}
                </div>
              )}
              
            </div>
            <div className="mt-4 flex justify-center w-full">
              <Button
                onClick={handleWithdraw}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium dark:bg-secondary"
                type="button"
                disabled={isProcessing || writeIsPending || waitIsLoading}
              >
                {isProcessing || writeIsPending || waitIsLoading ? "Processing..." : "Withdraw"}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center font-medium text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
            Successfully Transferred
          </h3>
          <div className="flex flex-col w-full justify-center items-center">
            <p className="text-center text-sm max-w-[263px] md:max-w-full md:text-lg text-grey-1 dark:text-white tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              You&apos;ve successfully withdrawn {parseFloat(inputValue).toFixed(2)} Strk from your wallet.
            </p>
            
            {transactionHash && (
              <a 
                href={`https://sepolia.voyager.online/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm underline mb-3"
              >
                View transaction
              </a>
            )}
            
            <div className="flex items-center justify-center mt-6 mb-8">
              <div className="relative h-[74px] w-[74px] overflow-hidden rounded-xl">
                <Image
                  src="/images/rocket.png"
                  alt="rocket"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 justify-center w-full md:px-0 px-5">
              <Button
                onClick={onClose}
                className="w-full bg-body-bg max-w-full text-lg/[130%] tracking-[-0.36px] font-medium"
                type="button"
              >
                Back Home
              </Button>
              <Link
                href="/dashboard/create-wager"
                className="w-full text-lg/[130%] tracking-[-0.36px] flex justify-center font-medium bg-secondary rounded-2xl p-4 dark:text-blue-1"
              >
                New Wager
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-grey-8 p-6 rounded-xl max-w-sm w-full">
            <h3 className="text-xl font-medium mb-4 text-center text-headingBlue dark:text-white">
              Confirm Withdrawal
            </h3>
            <p className="mb-4 text-center text-grey-1 dark:text-white">
              You are about to withdraw <strong>{parseFloat(inputValue).toFixed(2)} Strk</strong> from your wallet.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirmation(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={processWithdrawal}
                className="flex-1 bg-secondary"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawFundsModal;
