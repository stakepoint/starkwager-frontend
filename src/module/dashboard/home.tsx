
'use client';

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Copy, Plus } from "lucide-react";
import EmptyStateView from "@/components/ui/emptystate";
import { getSvgById } from "@/svgs";
import FundWalletModal from "@/components/fundWallet/FundWalletModal";

export default function DashboardHome() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full pb-[10rem]  mx-auto ">
      <div className="grid  pb-10 lg:gap-6 pt-5 lg:pt-[4rem] ">
        <div className="flex justify-between items-center">
          <h2 className="text-[#7D89B0] tracking-tight">Wallet balance</h2>
          <div className="flex items-center gap-2 bg-white p-1 px-2 rounded-[8px]">
            <span className="text-sm text-blue-950 font-medium">
              0x336674474...
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 text-blue-950 h-4 w-4"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <section className="flex flex-col gap-5 lg:gap-0 lg:flex-row  justify-between">
          <div className=" pt-2 lg:pt-0 lg:gap-3 items-center flex justify-between lg:grid ">
            <h1 className="lg:text-[3.5rem] text-2xl tracking-tight lg:leading-10 text-blue-950 font-semibold">
              $1000.00
            </h1>
            <p className="text-blue-950">50 Strk</p>
          </div>

          <div className="flex h-fit gap-2">
            <div className="bg-white w-full text-blue-950 flex  items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
              <Button
                className="rounded-sm text-blue-950 h-12 w-12"
                variant="secondary"
                size="icon"
                onClick={() => setIsOpen(true)}
              >
                <Plus />
              </Button>
              <span className="text-sm">Add Money</span>
            </div>
            <FundWalletModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

            <div className="bg-white w-full flex text-blue-950  items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
              <Button
                className="rounded-sm text-blue-950 h-12 w-12"
                variant="secondary"
                size="icon"
              >
                <Plus />
              </Button>
              <span className="text-sm">Withdraw</span>
            </div>
          </div>
        </section>
      </div>
      <EmptyStateView />
      <div className="pt-5 lg:hidden">
        <Button className="w-fit mx-auto flex items-center text-base font-medium">
          {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-5" })}
          New Wager
        </Button>
      </div>
    </section>
  );
}
