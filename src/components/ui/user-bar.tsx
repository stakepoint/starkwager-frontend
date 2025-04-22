import { addressShortner } from "@/lib/utils";
import { useAccount, useStarkName } from "@starknet-react/core";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

export default function UserBar() {
  const { address } = useAccount();
  const { data, isLoading } = useStarkName({
    address,
  });
  const { isCopied, copy } = useCopyToClipboard();

  const handleCopyClick = () => {
    if (address) copy(address);
  };

  if (!address) return null;

  return (
    <div className="flex items-center space-2">
      <div className="md:flex hidden items-center gap-2">
        <Image width={64} height={64} src="/images/avatar.svg" alt="Avatar" />

        <div className="flex items-center gap-2 bg-white dark:bg-grey-8 p-1 px-2 rounded-[8px]">
          <span className="text-sm text-blue-950 dark:text-white font-medium">
            {data || addressShortner(address)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyClick}
            className="ml-1 text-blue-950 dark:text-white h-4 w-4"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {/* <button
        onClick={() => disconnect()}
        className="bg-[#E0FE10] max-sm:w-[343px] text-[#102A56] hover:bg-[#a8d500] font-bold py-3 px-6 md:px-8 md:py-3 flex items-center justify-center text-sm md:text-base rounded-md"
      >
        Disconnect
      </button> */}
    </div>
  );
}
