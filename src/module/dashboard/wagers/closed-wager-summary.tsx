"use client";

import { WagerLayout } from "../../../components/wagers/wager-layout";
import { BattleDisplay } from "../../../components/wagers/battle-display";
import { WagerDetails } from "../../../components/wagers/wager_details";

interface ClosedWagerSummaryProps {
  winner: 'player1' | 'player2';
  player1: {
    username: string;
    avatar: string;
  };
  player2: {
    username: string;
    avatar: string;
  };
  wagerDetails: {
    title: string;
    amount: string;
    potentialWinnings: string;
    platformFee: string;
    description: string[];
    hashtags: string[];
  };
}

export default function ClosedWagerSummary({
  winner,
  player1,
  player2,
  wagerDetails
}: ClosedWagerSummaryProps) {
  return (
    <WagerLayout>
      <div className="mt-6 rounded-2xl bg-white py-6 shadow-sm">
        <BattleDisplay
          player1={{
            ...player1,
            isWinner: winner === 'player1'
          }}
          player2={{
            ...player2,
            isWinner: winner === 'player2'
          }}
          amount={wagerDetails.amount}
        />
      </div>
      <WagerDetails {...wagerDetails} />
    </WagerLayout>
  );
}