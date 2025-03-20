"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyStateView from "@/components/ui/emptystate";
import { getSvgById } from "@/svgs";
import { ModalView } from "@/components/ui/modals";
import FundWalletModal from "@/components/wallets/fundWallet";
import WithdrawFundsModal from "@/components/wallets/withdrawFunds";
import WalletDetail from "@/components/layouts/walletDetails";
import { SlidersHorizontal } from "lucide-react";
import WagerCards from "@/components/ui/WagerCards";
import HashtagsModal from "@/components/ui/hashtags";
import WagerTabOptions from "@/components/ui/wager-tab-options";
import ClaimWager from "@/components/ui/claimWager";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false);

  const router = useRouter();

  const handleCreateWager = () => {
    router.push("/dashboard/create-wager");
  };

  const wagerCards = [
    {
      wagerId: "1",
      question: "Will Bitcoin Hit $100k Before January 31, 2025?",
      wagerStatus: "active" as const,
      leftUser: {
        username: "@noyi24_7",
        icon: "/images/leftWagercardUserOneIcon.svg",
      },
      rightUser: {
        username: "@jane_doe",
        icon: "/images/RightWagercardUserOneIcon.svg",
      },
      stakeAmount: 10,
    },
  ];

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
      <ModalView
        open={isHashtagModalOpen}
        setOpen={setIsHashtagModalOpen}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <HashtagsModal />
      </ModalView>

      <section className="w-full pb-[10rem] mx-auto space-y-4">
        <WalletDetail
          setIsFundModalOpen={setIsFundModalOpen}
          setIsWithdrawModalOpen={setIsWithdrawModalOpen}
        />
        {wagerCards.length > 0 ? (
          <div className="space-y-4">
            <WagerTabOptions />
            <div
              onClick={() => setIsHashtagModalOpen(true)}
              className="flex items-center gap-3 border-none bg-white rounded-sm p-2 cursor-pointer max-w-min"
            >
              <p className="text-sm text-blue-1 min-w-max font-medium">
                Filter by Hashtags
              </p>
              <SlidersHorizontal />
            </div>

            <div className="mt-10">
              <div className="flex justify-between items-center">
                <p className="text-center text-blue-1 text-base md:text-xl font-medium">
                  Global Wagers
                </p>
                <p className="text-gray-600 text-[12px] lg:text-sm cursor-pointer">
                  View All
                </p>
              </div>
              {wagerCards.map((card, idx) => (
                <WagerCards
                  key={idx}
                  wagerId={card.wagerId}
                  question={card.question}
                  wagerStatus={
                    card.wagerStatus as "active" | "pending" | "completed"
                  }
                  leftUser={card.leftUser}
                  rightUser={card.rightUser}
                  stakeAmount={card.stakeAmount}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyStateView />
        )}

        <ClaimWager />
        <div className="pt-5 lg:hidden">
          <Button
            onClick={handleCreateWager}
            className="w-fit mx-auto flex items-center text-base font-medium"
          >
            {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-5" })}
            New Wager
          </Button>
        </div>
      </section>
    </>
  );
}
