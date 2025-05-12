import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { useContractWriteUtility } from "@/lib/blockchain-utils";
import { toast } from "sonner";
import { toU256, handleContractError } from "@/lib/wallet-utils";
import { WALLET_CONTRACT_ABI, WALLET_CONTRACT_ADDRESS } from "@/constants/contract";

interface FundWalletModalProps {
  onClose: () => void;
  walletBalance?: number;
  onSuccessfulFund?: (amount: number) => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ 
  onClose, 
  walletBalance = 1000,
  onSuccessfulFund 
}) => {
  const [fundState, setFundState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { address } = useAccount();
  const fundAmountRef = useRef<number>(0);

  // Convert amount to u256 format for contract interaction
  const getAmountInU256 = () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      return null;
    }
    return toU256(amount);
  };

  // Prepare the amount parameter for the contract
  // const amountParam = getAmountInU256();
  const amountParam = 1;

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
    "fund_wallet",
    WALLET_CONTRACT_ABI,
    WALLET_CONTRACT_ADDRESS,
    amountParam ? [amountParam] : []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Only allow digits and a single decimal point
    if (value.match(/^-?\d*\.?\d*$/)) {
      setInputValue(value);
      setInputWidth(Math.max(100, value.length * 30));
    }
    
    if (error) {
      setError(null);
    }
  };

  const handleFundWallet = () => {
    setError(null);
    const amount = parseFloat(inputValue);

    // Check for invalid input
    if (inputValue.includes('..') || inputValue.match(/[^0-9.-]/) || inputValue.startsWith('-')) {
      setError("Please enter a valid amount");
      return;
    }

    // Check for negative or zero amount
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // Check for very large numbers
    if (amount > 1e20) {
      setError("Please enter a valid amount");
      return;
    }

    if (!address) {
      setError("Wallet not connected");
      return;
    }

    // Store the amount being funded
    fundAmountRef.current = amount;

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const processFunding = async () => {
    try {
      if (!amountParam) {
        throw new Error("Invalid amount provided");
      }

      setIsProcessing(true);
      const result = await writeAsync([amountParam]);
      
      if (result?.transaction_hash) {
        toast.success("Transaction submitted successfully!");
      }
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      switch (errorMessage) {
        case "No connector connected":
          errorMessage = "Please connect your wallet";
          break;
        case "Invalid amount provided":
          errorMessage = "Please enter a valid amount";
          break;
        default:
          errorMessage = "Transaction failed. Please try again.";
      }

      toast.error(errorMessage, {
        className: "bg-red-500 text-white border-none",
      });
      setIsProcessing(false);
    } finally {
      setShowConfirmation(false);
    }
  };

  // Watch transaction status
  useEffect(() => {
    if (waitStatus === "success") {
      setFundState(true);
      setIsProcessing(false);
      toast.success("Wallet funded successfully!");
      
      if (onSuccessfulFund && fundAmountRef.current > 0) {
        onSuccessfulFund(fundAmountRef.current);
      }
    } else if (waitIsError && waitError) {
      let errorMessage = "Transaction failed";
      
      if (typeof waitError === 'string') {
        errorMessage = waitError;
      } else if (waitError instanceof Error) {
        errorMessage = waitError.message;
      } else if (typeof waitError === 'object' && waitError !== null) {
        // Handle custom error object structure
        const customError = waitError as { message?: string; error?: { message?: string } };
        if (customError.message) {
          errorMessage = customError.message;
        } else if (customError.error?.message) {
          errorMessage = customError.error.message;
        }
      }

      // Clean up the message and make it user-friendly
      if (errorMessage.includes("execution reverted")) {
        errorMessage = "Transaction was rejected by the contract";
      } else if (errorMessage.includes("insufficient funds")) {
        errorMessage = "Insufficient funds to complete this transaction";
      } else if (errorMessage.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user";
      }

      toast.error(errorMessage, {
        className: "bg-red-500 text-white border-none",
      });
      setIsProcessing(false);
    }
  }, [waitStatus, waitIsError, waitError, onSuccessfulFund]);

  useEffect(() => {
    if (!fundState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fundState]);

  return (
    <div>
      {!fundState ? (
        <>
          <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
            Fund Your Wallet
          </h3>
          <div className="flex flex-col w-full justify-center items-center">
            <p className="text-center max-w-[263px] md:max-w-full text-sm md:text-lg text-grey-1 dark:text-white tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              Enter the amount you want to fund your wallet and create wagers.
            </p>
            
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
          <div className="mt-4 flex justify-center w-full md:pb-0 pb-5">
            <Button
              onClick={handleFundWallet}
              className="w-full max-w-[352px] sm:max-w-full text-lg font-medium dark:bg-secondary"
              type="button"
              disabled={isProcessing || writeIsPending || waitIsLoading}
            >
              {isProcessing || writeIsPending || waitIsLoading ? "Processing..." : "Fund"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
            Successfully Funded
          </h3>
          <p className="text-center text-sm max-w-[263px] md:max-w-full md:text-lg text-grey-1 dark:text-white tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
            You&apos;ve successfully funded your wallet with {parseFloat(inputValue).toFixed(2)} Strk.
          </p>
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
            <Button
              onClick={onClose}
              className="w-full text-lg/[130%] tracking-[-0.36px] flex justify-center font-medium bg-secondary rounded-2xl p-4 dark:text-blue-1"
            >
              New Wager
            </Button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-grey-9 px-4 py-10 rounded-lg text-center w-full max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-headingBlue dark:text-white">
              Confirm Funding
            </h2>
            <p className="text-grey-1 dark:text-white text-sm mt-2">
              Are you sure you want to fund your wallet with {parseFloat(inputValue).toFixed(2)} Strk?
            </p>
            <div className="flex justify-center my-4">
              <Image
                src="/images/warning.svg"
                alt="Warning Icon"
                width={75}
                height={75}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-4 bg-[#F9F9FB] text-headingBlue rounded-md hover:bg-[#e3e3e9]"
              >
                Cancel
              </Button>
              <Button
                onClick={processFunding}
                className="w-full py-4 bg-[#E0FE10] text-black font-semibold rounded-md hover:bg-[#ddf738]"
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

export default FundWalletModal;
