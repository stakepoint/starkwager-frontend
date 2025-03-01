import React, { useEffect, useRef, useState } from "react";
import { FundIcon } from "../../svgs/fundIcon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
interface FundWalletModalProps {
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ onClose }) => {
    const [walletBalance, setWalletBalance] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [inputWidth, setInputWidth] = useState(100);
    const inputRef = useRef<HTMLInputElement>(null);

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
      <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue mt-2">
        Fund Your Wallet
      </h3>
      <div className="flex flex-col w-full justify-center items-center">
        {walletBalance > 0 ? (
          <>
            <p className="text-center max-w-[263px] md:max-w-full text-sm md:text-lg text-grey-1 tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              Enter the amount you want to fund your wallet and create wagers.
            </p>
            <div className="mt-6 mb-8">
              <div className="flex items-center justify-center">
                <span className="text-5xl text-grey-2 font-medium">$</span>
                <Input
                  ref={inputRef}
                  className="border-none md:text-5xl text-5xl font-medium p-0 text-grey-2 h-[58px]"
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
                onClick={onClose}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium"
                type="button">
                Fund
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-sm max-w-[263px] md:max-w-full  md:text-lg text-grey-1 tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
              To be able to create wagers you need to fund your wallet with
              Strk.
            </p>
            <div className="flex items-center justify-center mt-6 mb-8">
              <FundIcon />
            </div>
            <div className="mt-4 flex justify-center w-full">
              <Button
                onClick={showFundForm}
                className="w-full max-w-[352px] sm:max-w-full text-lg font-medium"
                type="button">
                Fund
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FundWalletModal;
