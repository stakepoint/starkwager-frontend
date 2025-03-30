import { buttonVariants } from "@/components/ui/button";
import ConnectWallet from "@/components/wallets/connectWallet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function AuthWelcome() {
  return (
    <section className="  max-w-sm grid gap-5  mx-auto pt-[5rem] ">
      <div className="grid border-b border-gray-100 pb-7 gap-1.5">
        <h1 className=" text-2xl leading-7 text-blue-950  dark:text-white font-semibold tracking-tight uppercase">
          Welcome to <br /> STARKWAGER webapp
        </h1>
        <p className="text-blue-950 text-sm tracking-tight dark:text-white">
          Connect to your wallet to use{" "}
          <span className="font-semibold">STARKWAGER.</span>
        </p>
      </div>
      <div className="pt-3">
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
