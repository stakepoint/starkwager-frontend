import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
interface WithdrawFundsModalProps {
  onClose: () => void;
}

const WithdrawFundsModal: React.FC<WithdrawFundsModalProps> = ({ onClose }) => {
  const [withdrawState, setWithdrawState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuccess = () => {
    setWithdrawState(true);
  };

  useEffect(() => {
    if (!withdrawState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [withdrawState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInputWidth(Math.max(100, event.target.value.length * 30));
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
            <div className="mt-6 mb-8">
              <div className="flex items-center justify-center">
                <span className="text-5xl text-grey-2 font-bold">$</span>
                <Input
                  ref={inputRef}
                  className="border-none md:text-5xl text-5xl font-bold p-0 text-grey-2 h-[58px]"
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
            <div className="mt-4 flex justify-center w-full">
              <Button
                onClick={showSuccess}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium dark:bg-secondary"
                type="button"
              >
                Withdraw
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
              You&apos;ve successfully withdrawn from your wallet.
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
    </div>
  );
};

export default WithdrawFundsModal;
