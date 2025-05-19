"use client";
import React, { useState } from "react";
import { ConnectWallet } from "./modals/ConnectWallet";
import Image from "next/image";
import { Button } from "./button";

export default function ConnectWalletBtn() {
  const [isConnecting, setIsConnecting] = useState(false);
  return (
    <>
      <ConnectWallet
        open={isConnecting}
        onOpenChange={() => setIsConnecting((prev) => !prev)}
      />
      <Button
        onClick={() => setIsConnecting(true)}
        className="bg-[#E0FE10] max-sm:w-[343px] text-[#102A56] hover:bg-[#a8d500] font-medium px-6 md:px-8 flex items-center justify-center text-sm md:text-base rounded-md"
      >
        Connect Wallet
        <Image
          src="/images/hero/Frame.png"
          alt="wallet"
          width={20}
          height={20}
          className="ml-2"
        />
      </Button>
    </>
  );
}
