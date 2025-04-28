"use client";
import Chevron from "@/svgs/Chevron";
import HandCoins from "@/svgs/HandCoins";
import ShieldCheck from "@/svgs/ShieldCheck";
import Wallet from "@/svgs/Wallet";
import Image from "next/image";
import React, { useState } from "react";

type StepProps = {
  stepNumber: number;
  title: string;
  buttonText?: string;
  reverse?: boolean;
  children?: React.ReactNode;
};

const Step: React.FC<StepProps> = ({
  stepNumber,
  title,
  buttonText,
  reverse,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full">
      <div className="dashed-line w-full h-[2px] mb-[64px]"></div>
      <div className="flex gap-x-8 justify-between lg:justify-start items-center relative">
        <h5
          className="font-comedik text-[24px] lg:text-[32px] text-secondary -rotate-2 absolute -top-5 -left-5"
          style={{ textShadow: "-2px 2px 0px #0F101D" }}
        >
          step #{stepNumber}
        </h5>
        <h2 className="font-schabo text-[40px] lg:text-[80px] text-[#EFF8FF] leading-[96%] tracking-[0%] align-middle font-normal w-[166px] lg:w-[520px]">
          {title}
        </h2>
        {buttonText && (
          <button
            className="p-3 lg:p-4 bg-secondary text-blue-1 font-medium text-base lg:text-lg flex items-center gpa-x-2 lg:gap-x-3 rounded-2xl cursor-pointer shrink-0"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {buttonText}{" "}
            <span
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <Chevron />
            </span>
          </button>
        )}
      </div>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 py-8 lg:py-10"
            : "grid-rows-[0fr] opacity-0 p-0"
        }`}
      >
        <div
          className={`overflow-hidden flex gap-10 lg:gap-[57px] lg:items-center lg:flex-row ${
            reverse ? "flex-col-reverse" : "flex-col"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  return (
    <div className="lg:pl-[176px] px-4 pr-0 uppercase w-full flex flex-col gap-y-[60px]">
      {/* Step 1 */}
      <Step stepNumber={1} title="Connect Your Wallet" buttonText="More info">
        <div>
          <div className="flex lg:flex-row flex-col-reverse gap-6 lg:gap-[61px] mb-10 lg:mb-[53px]">
            <p className="max-w-[200px] lg:max-w-[353px] -rotate-2 text-secondary text-2xl lg:text-[32px] font-comedik">
              How to start? We help you set up 3 things:
            </p>
            <div className="flex gap-x-1 items-center font-comedik text-[40px] text-secondary">
              <Wallet className="lg:w-16 lg:h-16  w-12 h-12" />
              <span className="rotate-[8deg] text-white">+</span>
              <HandCoins className="lg:w-16 lg:h-16  w-12 h-12" />
              <span className="rotate-[8deg] text-white">+</span>
              <ShieldCheck className="lg:w-16 lg:h-16  w-12 h-12" />
            </div>
          </div>
          <div className="flex flex-col gap-y-8 lg:gap-y-[57px]">
            {/* Setup Steps */}
            {[
              {
                num: 1,
                text: "Choose",
                sub: "a Wallet",
                desc: "CONNECT ARGENT OR BRAAVOS",
              },
              {
                num: 2,
                text: "Fund",
                sub: "your account",
                desc: "DEPOSIT STRK TOKENS FOR WAGERS",
              },
              {
                num: 3,
                text: "Set",
                sub: "up security",
                desc: "USING YOUR PERSONAL WALLET FOR TRANSFERS",
              },
            ].map(({ num, text, sub, desc }) => (
              <div
                key={num}
                className="flex lg:flex-row flex-col lg:items-center gap-6 lg:gap-10"
              >
                <div className="flex items-end gap-x-[2px] text-secondary font-comedik">
                  <span className="text-[40px] leading-[100%] tracking-[0%] align-middle">
                    {num}.
                  </span>
                  <h3 className="text-2xl -rotate-2 leading-[100%] tracking-[0%] align-middle">
                    {text} <br />
                    <span className="text-[32px]">{sub}</span>
                  </h3>
                </div>
                <p className="text-base font-bold text-[#EFF8FF] leading-[130%] -tracking-[2%]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Step>

      {/* Step 2 */}
      <Step stepNumber={2} title="Placing a Wager" buttonText="More info">
        <div className="max-w-[520px] text-[#EFF8FF]">
          <h4 className="mb-4 text-xl leading-[130%] font-bold">
            HOW TO MAKE A BET FAIR?
          </h4>
          <p className="text-base lg:text-lg leading-[130%] font-medium -tracking-[2%] capitalize">
            StrkWgr uses smart contracts to hold wagered funds securely. No
            intermediaries. No delays. Just instant, trustless transactions.
          </p>
        </div>
        <Image
          src="/images/padlock.png"
          className="w-[76px] lg:w-[90px] h-auto"
          alt=""
          width={20}
          height={20}
        />
      </Step>

      {/* Step 3 */}
      <Step
        stepNumber={3}
        title="Claim Winnings & Cash Out"
        buttonText="More info"
        reverse={true}
      >
        <Image
          src="/images/excitment.png"
          className="w-[180px] lg:w-[240px] h-auto"
          alt=""
          width={20}
          height={20}
        />
        <div className="max-w-[520px] text-[#EFF8FF]">
          <p className="text-base lg:text-lg leading-[130%] font-medium -tracking-[2%] capitalize">
            Once the wager ends, the funds are automatically transferred to the
            winner—no disputes, no waiting periods, just instant payouts via
            StarkNet smart contracts.
          </p>
        </div>
      </Step>
    </div>
  );
}
