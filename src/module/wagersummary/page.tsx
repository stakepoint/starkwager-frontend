"use client";

import Image from "next/image";
import { ArrowLeft, Bell, Hash, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WagerSummary() {
  // List of hashtags for the wager
  const hashtags = [
    "Bitcoin",
    "STRKWager",
    "BTCto100k",
    "CryptoWagerting",
    "BlockchainWager",
    "CryptoTrends",
    "Web3Challenge",
    "DeFiPrediction",
  ];

  return (
    // Main container with light gray background
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24">
        {/* Sticky header with navigation and profile */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-gray-50 py-4">
          {/* Left side: Back button and title */}
          <div className="flex items-center gap-4">
            <button
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-[#1a1f36]">WAGER SUMMARY</h1>
          </div>

          {/* Right side: Profile and notifications */}
          <div className=" hidden md:flex items-center gap-4">
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

        {/* Battle card section */}
        <div className="mt-6 rounded-2xl bg-white py-6 shadow-sm">

          {/* Stake amount badge */}
          <div className="flex items-center justify-center">
            <span className=" rounded-full bg-gray-100  p-2 text-base font-medium text-blue-950 flex items-center gap-1">
              <div className="relative h-4 w-4 overflow-hidden rounded-xl">
                <Image
                  src="/images/StrkLogo.svg"
                  alt="StrkLogo"
                  fill
                  className="object-cover"
                />
              </div>
              5 Strk each
            </span>
          </div>

          {/* VS battle display */}
          <div className="mt-4 flex items-center justify-evenly">
            {/* Player 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                  <Image
                    src="/images/avatar.svg"
                    alt="Player avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-medium">@noyi24_7</span>
            </div>

            {/* VS indicator */}
            <div className="text-center ml-5 text-blue-950">
              <div className="text-xs md:text-sm  mb-1 ">One-on-One</div>
              <div className="text-2xl md:text-5xl font-bold italic">VS</div>
            </div>

            {/* Awaiting opponent */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                  <Image
                    src="/images/opponent.svg"
                    alt="Player avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-xs md:text-sm font-medium">Awaiting Opponent</span>
            </div>
          </div>
        </div>

        {/* Wager details section */}
        <div className="mt-6 space-y-6">
          {/* Wager title */}
          <div>
            <h3 className="text-sm font-medium text-gray-400">
              Title of your Wager
            </h3>
            <p className="mt-1 text-xs md:text-base font-semibold text-blue-950">
              Will Bitcoin Hit $100k Before January 31, 2025?
            </p>
          </div>

          {/* Potential winnings */}
          <div>
            <h3 className="text-sm font-medium text-gray-400">
              Potential Winnings
            </h3>
            <div className="flex mt-2">
              <span className=" rounded-full bg-white  px-3 py-1 text-lg font-medium text-blue-950 flex items-center gap-1">
                <div className="relative h-4 w-4 overflow-hidden rounded-xl">
                  <Image
                    src="/images/StrkLogo.svg"
                    alt="StrkLogo"
                    fill
                    className="object-cover"
                  />
                </div>
                10 Strk
              </span>
            </div>
          </div>

          {/* Platform fee */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-400">
                Platform Fee
              </h3>
            </div>
            <span className="mt-1 text-xs md:text-base  font-medium flex items-center gap-1">
              5.0% <Info className="h-4 w-4 text-blue-950" />
            </span>
          </div>

          {/* Terms and description */}
          <div>
            <h3 className="text-sm font-medium text-gray-400">
              Terms or Wager Description
            </h3>
            <div className="mt-2 space-y-4 text-sm font-medium text-blue-950">
              <p>
                Think Bitcoin is on track to skyrocket past $100k? Here&apos;s your
                chance to put your prediction to the test! This wager challenges
                participants to predict whether Bitcoin will reach or exceed the
                $100,000 mark by January 31, 2025. The official price will be
                determined using CoinMarketCap&apos;s data at 11:59 PM UTC on the
                deadline date.
              </p>
              <p>
                Participants must stake an equal amount of STRK tokens to join
                this head-to-head challenge. If Bitcoin hits or surpasses $100k
                by the specified date and time, those who wager &apos;Yes&apos; win the
                wager. If it falls short, those who wager &apos;No&apos; take the prize.
              </p>
              <p>
                No extensions, no exceptions—this is your chance to back your
                crypto knowledge with real stakes! Join now and see if your
                prediction skills can earn you the ultimate reward in STRK
                tokens. Let&apos;s see who&apos;s got what it takes to call the next big
                crypto move!
              </p>
            </div>
          </div>

          {/* Hashtags section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Hashtags</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <button
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white space-x-2 p-[6px] text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors"
                >
                  <span className="pr-1">
                    {" "}
                    <Hash className="" />
                  </span>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Warning message */}
        <div className="flex justify-center items-center mt-6  ">
          <div className="flex justify-center items-center gap-1 rounded-lg bg-white p-4 text-blue-950">
            <Info className="h-5 w-5 flex-shrink-0" />
            <p className="text-xs md:text-base font-medium ">
              Always keep verifiable evidence of your wagers for dispute
              resolution purposes.
            </p>
          </div>
        </div>
      </div>
       {/* Create wager button */}
       <div className="bg-white flex justify-center p-4"> 
        <Button size={"lg"} className="px-20"> Create Wager</Button>
        </div>
    </div>
  );
}
