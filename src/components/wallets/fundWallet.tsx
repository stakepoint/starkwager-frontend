import React, { useEffect, useRef, useState } from "react";
import { FundIcon } from "../../svgs/fundIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

interface FundWalletModalProps {
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = () => {
  const [walletBalance, setWalletBalance] = useState(1000); // Set to a test balance
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleFundWallet = () => {
    const amount = parseFloat(inputValue);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amount > walletBalance) {
      setShowErrorModal(true);
    } else {
      console.log("Wallet funded successfully!");
    }
  };

  const showFundForm = () => {
    setWalletBalance(1);
  };

  useEffect(() => {
    if (walletBalance > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [walletBalance]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInputWidth(Math.max(100, event.target.value.length * 30));
  };

  return (
    <div>
      <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue dark:text-white mt-2">
        Fund Your Wallet
      </h3>
      <div className="flex flex-col w-full justify-center items-center">
        {walletBalance > 0 ? (
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
                <span className="leading-[130%] tracking-[-0.32px]">
                  0 Strk
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-center w-full md:pb-0 pb-5">
              <Button
                onClick={handleFundWallet}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium dark:bg-secondary"
                type="button"
              >
                Fund
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-sm max-w-[263px] md:max-w-full  md:text-lg text-grey-1 dark:text-white tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              To be able to create wagers you need to fund your wallet with
              Strk.
            </p>
            <div className="flex items-center justify-center mt-6 mb-8">
              <FundIcon />
            </div>
            <div className="mt-4 flex justify-center w-full">
              <Button
                onClick={showFundForm}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium dark:bg-secondary"
                type="button"
              >
                Fund
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Error Modal (Now inside return block) */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white dark:bg-grey-9 px-4 py-10 rounded-lg text-center w-full h-full">
            <h2 className="text-xl font-semibold text-headingBlue dark:text-white">
              Failed, Insufficient Funds
            </h2>
            <p className="text-grey-1 dark:text-white text-sm mt-2">
              You couldn’t fund your wallet due to <br /> insufficient funds.
            </p>
            <div className="flex justify-center my-4">
              <Image
                src="/images/Warning.png"
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
