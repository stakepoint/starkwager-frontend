"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PinPage() {
  const [pin, setPin] = useState("");

  const handleSubmit = () => {
    const payload = {
      pin,
    };
    console.log("Submitting payload:", payload);
  };

  return (
    <div className="flex flex-col w-full pt-[5rem] items-center justify-center px-4 md:px-0">
      <div className="text-primary w-full max-w-md flex flex-col gap-6">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-blue-950">
            CREATE PIN
          </h1>
          <p className="mt-2 text-blue-1 tracking-tighter">
            Create a unique pin for claiming prizes and accessing authorization
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center bg-[#EFF1F5] rounded-lg px-[18px] py-6 h-[72px]">
            <div className="flex flex-grow">
              <Input
                type="text"
                value={pin}
                placeholder="Enter pin"
                className="flex flex-grow text-[#102A56] py-8 bg-transparent transition-colors rounded-none text-base tracking-tighter outline-none border border-transparent px-0"
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <Button
          variant="default"
          disabled={!pin}
          onClick={handleSubmit}
          className="font-medium text-xl tracking-[-2%] h-14 rounded-2xl disabled:cursor-not-allowed disabled:opacity-[0.32]"
        >
          Continue
        </Button>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard"
        >
          Demo Skip
        </Link>
      </div>
    </div>
  );
}
