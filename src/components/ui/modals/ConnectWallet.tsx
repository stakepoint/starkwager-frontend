"use client";

import { useConnect } from "@starknet-react/core";
// import { ARGENT_X_INSTALL_URL, BRAAVOS_INSTALL_URL } from "@/constants";
import { getSvgById } from "@/svgs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";

interface HashtagSelectorProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ConnectWallet({ open, onOpenChange }: HashtagSelectorProps) {
  const { connect, connectors, isSuccess, isError } = useConnect();

  useEffect(() => {
    if (isSuccess || isError) {
      onOpenChange();
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6 dark:bg-grey-10">
        <DialogHeader className="">
          <DialogTitle className="text-2xl leading-[140%] font-semibold flex items-center justify-center text-[#1E2875] dark:text-white">
            Connect to
          </DialogTitle>
        </DialogHeader>
        <section className="grid gap-3">
          {connectors.map((connector) => {
            return (
              <button
                type="button"
                className="bg-white shadow-xl shadow-slate-50 dark:shadow-none border border-gray-50 dark:border-grey-8 rounded-xl p-4 dark:bg-grey-8 "
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                <div className="flex text-blue-950 dark:text-white font-medium items-center gap-2 text-sm tracking-tight sm:text-lg">
                  {/* @ts-expect-error lib not inferring types  */}
                  {getSvgById(connector.id, { className: "w-8 h-8" })}
                  <p>{connector.name}</p>
                </div>
              </button>
            );
          })}
        </section>
      </DialogContent>
    </Dialog>
  );
}
