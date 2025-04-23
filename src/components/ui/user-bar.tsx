"use client";
import { addressShortner } from "@/lib/utils";
import { useAccount, useDisconnect, useStarkName } from "@starknet-react/core";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./button";
import { Check, ChevronRight, Copy, LogOut } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdownMenu";

export default function UserBar({
  variation = "app",
  className,
}: {
  variation?: "web" | "app";
  className?: string;
}) {
  const isWeb = variation === "web";
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useStarkName({ address });
  const { isCopied, copy } = useCopyToClipboard();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCopyClick = () => {
    if (address) copy(address);
  };

  if (!address) return null;

  const UserContent = (
    <div
      className={`flex items-center gap-3 ${
        isWeb && "p-3 border border-[#384250] rounded-3xl"
      } ${className}`}
    >
      <Image
        width={14}
        height={14}
        className="w-12 h-12"
        src="/images/avatar.svg"
        alt="Avatar"
      />

      <div
        className={`flex items-center gap-2 text-sm md:text-base font-medium ${
          isWeb ? "bg-grey-8" : "bg-white dark:bg-grey-8"
        } p-1 px-2 rounded-[8px]`}
      >
        <span>{data || addressShortner(address)}</span>
        {!isWeb && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyClick}
            className={`ml-1 ${
              isWeb ? "text-white" : "text-blue-950 dark:text-white"
            } h-4 w-4`}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {isWeb && (
        <ChevronRight
          className={`transition-transform duration-300 ${
            menuOpen ? "rotate-90" : ""
          }`}
        />
      )}
    </div>
  );

  return isWeb ? (
    <DropdownMenu onOpenChange={(open) => setMenuOpen(open)}>
      <DropdownMenuTrigger asChild>{UserContent}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-[#1F2A37] text-white p-6 w-[240px] flex flex-col gap-y-2 font-medium border-none"
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
