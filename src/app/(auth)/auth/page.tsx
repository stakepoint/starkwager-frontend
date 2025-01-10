import { buttonVariants } from "@/components/ui/button";
import ConnectWallet from "@/components/wallets/connectWallet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <section className="  max-w-sm grid gap-5 divide-y mx-auto pt-[5rem] ">
      <div className="grid gap-1">
        <h1 className=" text-2xl leading-7 text-blue-950 font-semibold tracking-[-0.04em] uppercase">
          Welcome to your <br /> STARKWAGER webapp
        </h1>
        <p className="text-blue-950 text-sm tracking-tight">
          Connect to your wallet to use{" "}
          <span className="font-semibold">STARKWAGER.</span>
        </p>
      </div>
      <div className="pt-5">
        <ConnectWallet />
      </div>
      <Link
        className={cn(buttonVariants({ variant: "default" }))}
        href="/setup"
      >
        Demo Skip
      </Link>
    </section>
  );
}
