"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowUpRight, Copy, Plus } from "lucide-react";

import { ModalView } from "@/components/ui/modals";
import FundWalletModal from "@/components/wallets/fundWallet";
import { WithdrawIcon } from "@/svgs/withdrawIcon";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getSvgById } from "@/svgs";

const TRANSACTION_DATA = [
  {
    id: 1,
    title: "Created Wager: Will Bitcoin Hit $100k Before January 31, 2025?",
    amount: "5 Strk",
    date: "November 24,2024",
    incoming: true,
  },
  {
    id: 2,
    title: "Created Wager: Will Bitcoin Hit $100k Before January 31, 2025?",
    amount: "5 Strk",
    date: "November 24,2024",
    incoming: true,
  },
  {
    id: 3,
    title: "Created Wager: Will Bitcoin Hit $100k Before January 31, 2025?",
    amount: "5 Strk",
    date: "November 24,2024",
    incoming: false,
  },
];

export default function Wallet() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ModalView
        open={isOpen}
        setOpen={setIsOpen}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <FundWalletModal onClose={() => setIsOpen(false)} />
      </ModalView>
      <section className="w-full pb-[7rem] md:pb-[10rem] mx-auto">
        <div className="grid  pb-10 lg:gap-6 pt-5 lg:pt-[4rem] ">
          <div className="flex justify-between items-center">
            <h2 className="text-grey-3 tracking-tight">Wallet balance</h2>
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
                  className="rounded-sm bg-body-bg text-blue-950 h-12 w-12"
                  size="icon"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus />
                </Button>
                <span className="text-sm">Add Money</span>
              </div>

              <div className="bg-white w-full flex text-blue-950  items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
                <Button
                  className="rounded-sm bg-body-bg text-blue-950 h-12 w-12"
                  size="icon"
                >
                  <WithdrawIcon />
                </Button>
                <span className="text-sm">Withdraw</span>
              </div>
            </div>
          </section>
        </div>
        <section className="flex flex-col gap-4 md:p-6 w-full">
          <h2 className="font-medium text-[#102A56] text-lg md:text-xl">
            Recent Transactions
          </h2>
          <div className="flex flex-col gap-4 w-full">
            {TRANSACTION_DATA.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 bg-white rounded-2xl w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-[#EFF1F5]">
                    {item.incoming ? (
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <ArrowDownLeft className="text-[#17B26A] w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base text-[#102A56] max-w-36 md:max-w-full w-full truncate">
                      {item.title}
                    </p>
                    <p className="text-[#102A56] text-sm">{item.date}</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p
                    className={cn(
                      "font-medium text-[#102A56] flex items-center gap-1",
                      { "text-[#17B26A]": !item.incoming }
                    )}
                  >
                    <Image
                      width="16"
                      height="16"
                      src="/images/StrkLogo.svg"
                      alt=""
                    />
                    {item.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Link
          href="/dashboard/create-wager"
          className="w-full max-w-[160px] mx-auto flex items-center justify-center gap-3 text-base font-medium bg-secondary rounded-2xl p-4 mt-10 shadow-xl md:hidden"
        >
          {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-5" })}
          New Wager
        </Link>
      </section>
    </>
  );
}
