"use client";
import React from "react";
import WalletDetail from '@/components/layouts/walletDetails';
import { ModalView } from "@/components/ui/modals";
import FundWalletModal from "@/components/wallets/fundWallet";
import WithdrawFundsModal from "@/components/wallets/withdrawFunds";

export default function Wallets() {
    const [isFundModalOpen, setIsFundModalOpen] = React.useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = React.useState(false);

    return (
        <div className="w-full">
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

            <WalletDetail
                setIsFundModalOpen={setIsFundModalOpen}
                setIsWithdrawModalOpen={setIsWithdrawModalOpen}
            />
        </div>
    )
}