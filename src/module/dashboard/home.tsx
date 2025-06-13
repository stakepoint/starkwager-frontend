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
import { useWager } from "@/hooks/wager/useWager";
import WagerCardSkeleton from "@/components/ui/skeletons/wagerCardSkeleton";

export default function DashboardHome() {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const { wagers, isLoadingWagers, wagersError } = useWager();

  const router = useRouter();

  const handleCreateWager = () => {
    router.push("/dashboard/create-wager");
  };

  const handleSuccessfulWithdraw = (newBalance: number) => {
    setWalletBalance(newBalance);
  };

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
        <WithdrawFundsModal 
          onClose={() => setIsWithdrawModalOpen(false)}
          walletBalance={walletBalance}
          onSuccessfulWithdraw={handleSuccessfulWithdraw}
        />
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
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
        />
        {isLoadingWagers ? (
          <div className="space-y-4">
            <WagerTabOptions />
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
                  Global Wagers
                </p>
              </div>
              <div className="space-y-3">
                <WagerCardSkeleton />
                <WagerCardSkeleton />
              </div>
            </div>
          </div>
        ) : wagersError ? (
          <div className="text-center text-red-500">
            Error loading wagers. Please try again later.
          </div>
        ) : wagers && wagers.length > 0 ? (
          <div className="space-y-4">
            <WagerTabOptions />
            <div
              onClick={() => setIsHashtagModalOpen(true)}
              className="flex items-center gap-3 border-none bg-white dark:bg-grey-8 rounded-sm p-2 cursor-pointer max-w-min"
            >
              <p className="text-sm text-blue-1 dark:text-white min-w-max font-medium">
                Filter by Hashtags
              </p>
              <SlidersHorizontal />
            </div>

            <div className="mt-10">
              <div className="flex justify-between items-center">
                <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
                  Global Wagers
                </p>
                <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm cursor-pointer">
                  View All
                </p>
              </div>
              {wagers.map((wager) => (
                <WagerCards
                  key={wager.id}
                  wagerId={wager.id}
                  question={wager.name}
                  wagerStatus={wager.status}
                  stakeAmount={wager.stakeAmount}
                  leftUser={{
                    username: wager.participants?.[0]?.username || "Awaiting Opponent",
                    icon: wager.participants?.[0]?.avatar || "/images/opponent.svg",
                  }}
                  rightUser={{
                    username: wager.participants?.[1]?.username || "Awaiting Opponent",
                    icon: wager.participants?.[1]?.avatar || "/images/opponent.svg",
                  }}
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
            className="w-fit mx-auto flex items-center text-base font-medium dark:bg-secondary"
          >
            {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-5" })}
            New Wager
          </Button>
        </div>
      </section>
    </>
  );
}
