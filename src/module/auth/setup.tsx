"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SetupPage() {
  const [username, setUsername] = useState("");

  return (
    <div className="flex flex-col w-full pt-[5rem] items-center justify-center px-4 md:px-0">
      <div className="text-primary w-full max-w-md flex flex-col gap-6">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-blue-950">
            SET UP YOUR PROFILE
          </h1>
          <p className="mt-2 text-blue-950 tracking-tighter">
            Choose your picture and a unique username other users can use to
            invite you to wagers
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>
        <div className="flex items-center justify-center bg-blue-950 rounded-3xl bg-primary w-20 h-20 relative">
          <p className="text-4xl text-white font-medium">N</p>
          <div className="absolute bottom-0 right-0 rounded-full p-2 bg-white">
            <Camera size="16" className="text-blue-950" />
          </div>
        </div>
        <div className="flex items-center bg-[#EFF1F5] rounded-lg px-[18px] py-6 h-[72px]">
          <div className="">
            <span className="text-[#B9C0D4] w-24 text-base tracking-tighter">
              wager.strk/{" "}
            </span>
            <span className="text-[#102A56] w-24 text-base tracking-tighter">
              @
            </span>
          </div>
          <div className="flex flex-grow">
            <Input
              type="text"
              value={username}
              placeholder="username"
              className="flex flex-grow text-[#102A56] py-8 bg-transparent transition-colors rounded-none text-base tracking-tighter outline-none border border-transparent px-0"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="default"
          disabled={!username}
          className="font-medium text-xl tracking-[-2%] h-14 rounded-2xl disabled:cursor-not-allowed disabled:opacity-[0.32]">
          Continue
        </Button>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          href="/dashboard">
          Demo Skip
        </Link>
      </div>
    </div>
  );
}
