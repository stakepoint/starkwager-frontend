import { addressShortner } from "@/lib/utils";
import { useAccount, useDisconnect, useStarkName } from "@starknet-react/core";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Check, Copy, LogOut } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdownMenu";

export default function UserBar({
  variation = "app",
}: {
  variation?: "web" | "app";
}) {
  const isWeb = variation === "web";
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useStarkName({ address });
  const { isCopied, copy } = useCopyToClipboard();

  const handleCopyClick = () => {
    if (address) copy(address);
  };

  if (!address) return null;

  const UserContent = (
    <div
      className={`md:flex hidden items-center gap-2 ${
        !isWeb ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <Image
        width={14}
        height={14}
        className={`${isWeb ? "w-12 h-12" : "w-[64px] h-[64px]"}`}
        src="/images/avatar.svg"
        alt="Avatar"
      />

      <div
        className={`flex items-center gap-2 text-sm md:text-base font-medium ${
          !isWeb
            ? " bg-white dark:bg-grey-8 p-1 px-2 rounded-[8px]"
            : "bg-[#E0FE10] max-sm:w-[343px] text-[#102A56] hover:bg-[#a8d500] font-bold py-3 px-6 md:px-10 md:py-3 justify-center  rounded-md"
        }`}
      >
        <span>{data || addressShortner(address)}</span>
        {!isWeb && (
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
        )}
      </div>
    </div>
  );

  return isWeb ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{UserContent}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-[#1F2A37] text-white p-6 w-[240px] flex flex-col gap-y-2 font-medium"
      >
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleCopyClick();
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          {isCopied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>
        <div className="dashed-line w-full h-[1px] my-2"></div>
        <DropdownMenuItem onClick={() => disconnect()}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    UserContent
  );
}
