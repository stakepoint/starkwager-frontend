"use client";
import React, { useState, useCallback } from "react";
import WalletDetail from '@/components/layouts/walletDetails';
import { ModalView } from "@/components/ui/modals";
import FundWalletModal from "@/components/wallets/fundWallet";
import WithdrawFundsModal from "@/components/wallets/withdrawFunds";

export default function Wallets() {
    const [isFundModalOpen, setIsFundModalOpen] = React.useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = React.useState(false);
    const [walletBalance, setWalletBalance] = useState(1000); // Default value, will be updated by WalletDetails

    // Handle successful withdrawal by updating the balance immediately
    const handleSuccessfulWithdraw = useCallback((amount: number) => {
        // Update the balance immediately for a better UX
        setWalletBalance(prevBalance => {
            const newBalance = Math.max(0, prevBalance - amount);
            return Number(newBalance.toFixed(2)); // Ensure we have 2 decimal places
        });
        
        // Close the modal after a short delay to allow the user to see the success message
        setTimeout(() => {
            setIsWithdrawModalOpen(false);
        }, 3000);
    }, []);

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
                <WithdrawFundsModal 
                    onClose={() => setIsWithdrawModalOpen(false)} 
                    walletBalance={walletBalance}
                    onSuccessfulWithdraw={handleSuccessfulWithdraw}
                />
            </ModalView>

            <WalletDetail
                setIsFundModalOpen={setIsFundModalOpen}
                setIsWithdrawModalOpen={setIsWithdrawModalOpen}
                walletBalance={walletBalance}
                setWalletBalance={setWalletBalance}
            />
        </div>
    )
}