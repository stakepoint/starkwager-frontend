"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Copy, Plus } from "lucide-react";
import EmptyStateView from "@/components/ui/emptystate";
import { getSvgById } from "@/svgs";

import { ModalView } from "@/components/ui/modals";
import FundWalletModal from "@/components/wallets/fundWallet";
import { WithdrawIcon } from "@/svgs/withdrawIcon";
import WithdrawFundsModal from "@/components/wallets/withdrawFunds";

import WagerCards from "@/components/ui/WagerCards";

const dummyWagers = [
  {
    question: "Will Bitcoin Hit $100k Before January 31, 2025?",
    progress: true,
    stakeAmount: 5,
    leftUser: {
      username: "@noyi24_7",
      icon: "/images/leftWagercardUserOneIcon.svg",
    },
    rightUser: {
      username: "@babykeem",
      icon: "/images/RightWagercardUserOneIcon.svg",
    },
  },
  {
    question: "Will Ethereum surpass $10k by 2026?",
    progress: true,
    stakeAmount: 3,
    leftUser: {
      username: "@noyi24_7",
      icon: "/images/leftWagercardUserOneIcon.svg",
    },
    rightUser: {
      username: "@babykeem",
      icon: "/images/RightWagercardUserOneIcon.svg",
    },
  },
  {
    question: "Will Dogecoin reach $1 before 2027?",
    progress: false,
    stakeAmount: 2,
    leftUser: {
      username: "@noyi24_7",
      icon: "/images/leftWagercardUserOneIcon.svg",
    },
    rightUser: {
      username: "@babykeem",
      icon: "/images/RightWagercardUserOneIcon.svg",
    },
  },
  {
    question: "Will Solana flip Ethereum in market cap by 2030?",
    progress: false,
    stakeAmount: 4,
    leftUser: {
      username: "@noyi24_7",
      icon: "/images/leftWagercardUserOneIcon.svg",
    },
    rightUser: {
      username: "@babykeem",
      icon: "/images/RightWagercardUserOneIcon.svg",
    },
  },
];

export default function DashboardHome() {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [dashboardPopulated] = useState(true);

  return (
    <>
      <ModalView
        open={isFundModalOpen}
        setOpen={setIsFundModalOpen}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <FundWalletModal onClose={() => setIsFundModalOpen(false)} />
      </ModalView>
      <ModalView
        open={isWithdrawModalOpen}
        setOpen={setIsWithdrawModalOpen}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <WithdrawFundsModal onClose={() => setIsWithdrawModalOpen(false)} />
      </ModalView>
      <section className="w-full pb-[10rem]  mx-auto ">
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
                  onClick={() => setIsFundModalOpen(true)}
                >
                  <Plus />
                </Button>
                <span className="text-sm">Add Money</span>
              </div>

              <div className="bg-white w-full flex text-blue-950  items-center lg:px-1.5 lg:pr-6 gap-2 lg:w-fit p-1.5 rounded-sm">
                <Button
                  className="rounded-sm bg-body-bg text-blue-950 h-12 w-12"
                  size="icon"
                  onClick={() => setIsWithdrawModalOpen(true)}
                >
                  <WithdrawIcon />
                </Button>
                <span className="text-sm">Withdraw</span>
              </div>
            </div>
          </section>
        </div>

        {/* DASHBOARD POPULATED AREA */}
        {dashboardPopulated ? (
          <section className="flex flex-col gap-6">
            {/* In Progress Section */}
            <section className="bg-input-bg rounded-lg p-4 md:p-6">
              <h2 className="text-sm lg:text-base font-medium text-blue-1">
                Active Wagers
              </h2>

              {dummyWagers
                .filter((wager) => wager.progress)
                .map((wager, index) => (
                  <WagerCards key={index} {...wager} />
                ))}
            </section>

            {/* Pending Section */}
            <section className="bg-input-bg rounded-lg p-4 md:p-6">
              <h2 className="text-sm lg:text-base font-medium text-blue-1">
                Pending Wagers
              </h2>

              {dummyWagers
                .filter((wager) => !wager.progress)
                .map((wager, index) => (
                  <WagerCards key={index} {...wager} />
                ))}
            </section>
          </section>
        ) : (
          <EmptyStateView />
        )}

        <div className="pt-5 lg:hidden">
          <Button className="w-fit mx-auto flex items-center text-base font-medium">
            {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-5" })}
            New Wager
          </Button>
        </div>
      </section>
    </>
  );
}
