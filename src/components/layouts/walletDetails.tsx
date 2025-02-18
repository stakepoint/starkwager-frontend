"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
import { WithdrawIcon } from "@/svgs/withdrawIcon";
//import { ModalView } from "@/components/ui/modals";
//import FundWalletModal from "@/components/wallets/fundWallet";
//import WithdrawFundsModal from "@/components/wallets/withdrawFunds";


interface WalletDetailsProps {
  setIsFundModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWithdrawModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WalletDetails({ setIsFundModalOpen, setIsWithdrawModalOpen }: WalletDetailsProps) {
      //const [isFundModalOpen, setIsFundModalOpen] = useState(false);
      //const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  return (
    <div>
    {/*<ModalView
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
    </ModalView>*/}
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
                className="ml-1 text-blue-950 h-4 w-4">
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
                  onClick={() => setIsFundModalOpen(true)}>
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
    </div>
  )
}
