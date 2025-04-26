import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { toast } from "sonner";

interface FundWalletModalProps {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  walletBalance?: number;
  // Add callback for successful funding
  onSuccessfulFund?: (amount: number) => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ 
  onClose, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  walletBalance = 1000, // Default value for demo, passed to child components if needed
  onSuccessfulFund 
}) => {
  const [fundState, setFundState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fundAmountRef = useRef<number>(0);

  const handleFundWallet = () => {
    const amount = parseFloat(inputValue);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    // Store the amount being funded
    fundAmountRef.current = amount;

    // Simulate processing (in a real app, this would be a contract interaction)
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate successful funding
      setFundState(true);
      toast.success("Wallet funded successfully!");

      // Call the callback to update the wallet balance in the parent component
      if (onSuccessfulFund && amount > 0) {
        onSuccessfulFund(amount);
      }
    }, 2000);
  };

  useEffect(() => {
    if (!fundState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fundState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setInputValue(value);
    setInputWidth(Math.max(100, value.length * 30));
  };

  return (
    <div>
      {!fundState ? (
        <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
          Fund Your Wallet
        </h3>
      ) : (
        <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
          Successfully Funded
        </h3>
      )}
      <div className="flex flex-col w-full justify-center items-center">
        {!fundState ? (
          <>
            <p className="text-center max-w-[263px] md:max-w-full text-sm md:text-lg text-grey-1 dark:text-white tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              Enter the amount you want to fund your wallet and create wagers.
            </p>
            <div className="mt-6 mb-8">
              <div className="flex items-center justify-center">
                <span className="text-5xl text-grey-2 dark:text-white font-bold">
                  $
                </span>
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
            </div>
            <div className="mt-4 flex justify-center w-full md:pb-0 pb-5">
              <Button
                onClick={handleFundWallet}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium dark:bg-secondary"
                type="button"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Fund"}
              </Button>
            </div>
          </>
        ) : (
          <>
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
      </div>

      {/* Error Modal (Now inside return block) */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
          <div className="bg-white dark:bg-grey-9 px-4 py-10 rounded-lg text-center w-full max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-headingBlue dark:text-white">
              Failed, Insufficient Funds
            </h2>
            <p className="text-grey-1 dark:text-white text-sm mt-2">
              You couldn&apos;t fund your wallet due to <br /> insufficient funds.
            </p>
            <div className="flex justify-center my-4">
              <Image
                src="/images/warning.svg"
                alt="Error Icon"
                width={75}
                height={75}
              />
            </div>
            <button
              className="w-5/6 py-4 bg-[#F9F9FB] text-headingBlue rounded-md mt-2 hover:bg-[#e3e3e9]"
              onClick={() => setShowErrorModal(false)}
            >
              Back Home
            </button>
            <button
              className="w-5/6 py-4 bg-[#E0FE10] text-black font-semibold rounded-md mt-2 hover:bg-[#ddf738]"
              onClick={() => setShowErrorModal(false)}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundWalletModal;
