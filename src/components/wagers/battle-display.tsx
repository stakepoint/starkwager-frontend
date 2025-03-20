"use client";

import Image from "next/image";

interface PlayerProps {
  username: string;
  avatar: string;
  isWinner?: boolean;
}

interface BattleDisplayProps {
  player1: PlayerProps;
  player2?: PlayerProps;
  isPending?: boolean;
  amount: string;
}

export function BattleDisplay({
  player1,
  player2,
  isPending = false,
  amount,
}: BattleDisplayProps) {
  return (
    <div className="mt-6 rounded-2xl bg-white py-6 shadow-sm">
      {/* Stake amount badge */}
      <div className="flex items-center justify-center">
        <span className="rounded-full bg-input-bg p-2 text-base font-medium text-blue-1 flex items-center gap-1">
          <div className="relative h-4 w-4 overflow-hidden rounded-xl">
            <Image
              src="/images/StrkLogo.svg"
              alt="StrkLogo"
              fill
              className="object-cover"
            />
          </div>
          {amount}
        </span>
      </div>

      {/* VS battle display */}
      <div className="mt-4 flex items-center justify-evenly">
        {/* Player 1 */}
        <div className="flex flex-col items-center gap-2 w-[128px] relative">
          {player1.isWinner && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/medal.svg"
                alt="Winner"
                width={24}
                height={24}
              />
            </div>
          )}
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image
                src={player1.avatar}
                alt="Player avatar"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <span className="text-sm font-medium">{player1.username}</span>
        </div>

        {/* VS indicator */}
        <div className="text-center text-blue-950">
          <div className="text-xs md:text-sm mb-1">One-on-One</div>
          <div className="text-2xl md:text-5xl font-bold italic">VS</div>
        </div>

        {/* Player 2 or Awaiting */}
        <div className="flex flex-col items-center gap-2 w-[128px] relative">
          {!isPending && player2?.isWinner && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/medal.svg"
                alt="Winner"
                width={24}
                height={24}
              />
            </div>
          )}
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image
                src={
                  isPending
                    ? "/images/opponent.svg"
                    : player2?.avatar || "/images/player2.svg"
                }
                alt="Player avatar"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <span className="text-xs md:text-sm font-medium">
            {isPending ? "Awaiting Opponent" : player2?.username}
          </span>
        </div>
      </div>
    </div>
  );
}
