"use client";

import Image from "next/image";
import {Bell, Copy} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WagerCreated() {
  return (
    // Main container with light gray background
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24">
        {/* Sticky header with navigation and profile */}
        <header className="sticky top-0 z-10 flex items-end justify-between bg-gray-50 py-4">
          {/* Left side: Back button */}
          <div className="flex items-center gap-4">
          </div>

          {/* Right side: Profile and notifications */}
          <div className="hidden md:flex items-center gap-4">
            {/* Profile section */}
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-xl">
                <Image
                  src="/images/avatar.svg"
                  alt="Profile avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">@noyi24_7</span>
            </div>
            {/* Notification button */}
            <button
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="mt-12 text-center h-16 w-[592px]">

          <div className="mx-3 sm:m-0 gap-6">
          {/* Title */}
          <h1 className="text-blue-950 text-3xl/10 font-semibold text-start w-[592px] h-10 font-sans">WAGER CREATED</h1>
          <p className="mt-2 text-[#4A5578] font-normal text-start tracking-tighter text-lg w-[592px] h-6">
            Your wager has been created, send wager invite 🚀
          </p>
          <div className="w-full h-[1px] bg-gray-100 my-2"></div>

          {/* Invite through username */}
          <div className="mt-8 gap-5 ">
            <div className="gap-3">
              <p className="text-sm font-medium text-gray-700 text-start font-sans">Invite through username</p>
              <div className="mt-1 flex items-center bg-gray-100 rounded-lg px-4 py-6 h-20">
                <div className="gap-1 h-5">
                <span className="text-[#B9C0D4] w-24 text-base tracking-tighter">wager.strk/</span>
                <input
                  type="text"
                  placeholder="@username"
                  className="ml-2 flex-1 bg-transparent text-[#B9C0D4] outline-none text-base tracking-tighter"
                />
                </div>
              </div>
            </div>
        </div>

            {/* Invite publicly */}
            <div className="mt-8 gap-5">
            <div className="gap-3">
              <p className="text-sm font-medium text-gray-700 text-start font-sans">Invite publicly (Anyone with this link can join it)</p>
              <div className="mt-1 flex items-center bg-gray-100 rounded-lg px-4 py-6 h-[72px] relative">
              <div className="gap-1 h-5 flex">
                <input
                  type="text"
                  readOnly
                  value="https://link.wager.strk/WEpl"
                  className="flex-1 bg-transparent text-gray-800 outline-none w-[490px]"
                />
                <div
                  className=" absolute right-0 top-0 rounded-r-lg bg-[#E0FE10] p-6 text-lime-800 hover:bg-[#E0FE10] transition-colors h-[72px] w-[72px]"
                  aria-label="Copy link"
                >
                  <Copy className="h-5 w-5" />
                </div>
                </div>
              </div>
            </div>
          </div>

          </div>

          {/* Action buttons */}
          <div className="flex justify-center">
          <div className="mt-40 sm:mt-8 flex flex-col gap-2 w-[592px] sm:w-96 sm:h-32">
            <Button className="bg-lime-200 text-lime-800 hover:bg-lime-300 text-center h-[56px] py-3 px-4 opacity-[5]">
              Send Wager
            </Button>
            <Button variant="outline" className="text-gray-800 bg-[#FFFFFF] text-center border-0">
              Back Home
            </Button>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
