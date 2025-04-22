import { useAccount } from "@starknet-react/core";
import { Button } from "./button";
import { useState } from "react";
import { ConnectWallet } from "./modals/ConnectWallet";
import Image from "next/image";
import UserBar from "./user-bar";

const WalletBar: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { address } = useAccount();

  return (
    <>
      <ConnectWallet
        open={isConnecting}
        onOpenChange={() => setIsConnecting((prev) => !prev)}
      />
      <div className="flex flex-col items-center space-y-4">
        {!address ? (
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => setIsConnecting(true)}
              className="bg-[#E0FE10] max-sm:w-[343px] text-[#102A56] hover:bg-[#a8d500] font-bold py-3 px-6 md:px-8 md:py-3 flex items-center justify-center text-sm md:text-base rounded-md"
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
          </div>
        ) : (
          <UserBar />
        )}
      </div>
    </>
  );
};

export default WalletBar;
