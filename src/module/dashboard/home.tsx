"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyStateView from "@/components/ui/emptystate";
import { getSvgById } from "@/svgs";
import { ModalView } from "@/components/ui/modals";
import FundWalletModal from "@/components/wallets/fundWallet";
import WithdrawFundsModal from "@/components/wallets/withdrawFunds";
import WalletDetail from "@/components/layouts/walletDetails";




export default function DashboardHome() {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <>
      <ModalView
        open={isFundModalOpen}
        setOpen={setIsFundModalOpen}
        className="max-w-[400px] p-6 rounded-2xl">
        <FundWalletModal onClose={() => setIsFundModalOpen(false)} />
      </ModalView>
      <ModalView
        open={isWithdrawModalOpen}
        setOpen={setIsWithdrawModalOpen}
        className="max-w-[400px] p-6 rounded-2xl">
        <WithdrawFundsModal onClose={() => setIsWithdrawModalOpen(false)} />
      </ModalView>
      
      <section className="w-full pb-[10rem]  mx-auto ">
      <WalletDetail 
              setIsFundModalOpen={setIsFundModalOpen}
              setIsWithdrawModalOpen={setIsWithdrawModalOpen}
      />

        <EmptyStateView />
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
