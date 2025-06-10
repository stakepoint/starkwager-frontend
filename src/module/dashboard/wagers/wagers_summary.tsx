"use client";
import { WagerLayout } from "@/components/wagers/wager-layout";
import { BattleDisplay } from "@/components/wagers/battle-display";
import { WagerDetails } from "@/components/wagers/wager_details";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  username: string;
  picture: string;
}

const cleanSvgString = (svgString: string) => {
  // Remove outer quotes and unescape inner quotes
  return svgString.replace(/^"|"$/g, "").replace(/\\"/g, '"');
};

const wagerDetails = {
  title: "Will Bitcoin Hit $100k Before January 31, 2025?",
  potentialWinnings: "10 STRK",
  platformFee: "5.0%",
  description: [
    "Think Bitcoin is on track to skyrocket past $100k? Here's your chance to put your prediction to the test! This wager challenges participants to predict whether Bitcoin will reach or exceed the $100,000 mark by January 31, 2025. The official price will be determined using CoinMarketCap's data at 11:59 PM UTC on the deadline date.",
    "Participants must stake an equal amount of STRK tokens to join this head-to-head challenge. If Bitcoin hits or surpasses $100k by the specified date and time, those who wager 'Yes' win the wager. If it falls short, those who wager 'No' take the prize.",
    "No extensions, no exceptions—this is your chance to back your crypto knowledge with real stakes! Join now and see if your prediction skills can earn you the ultimate reward in STRK tokens. Let's see who's got what it takes to call the next big crypto move!",
  ],
  hashtags: [
    "Bitcoin",
    "STRKWager",
    "BTCto100k",
    "CryptoWagering",
    "BlockchainWager",
    "CryptoTrends",
    "Web3Challenge",
    "DeFiPrediction",
  ],
  category: "Crypto",
  claimStatus: {
    // ? change this to toggle between claimed and not claimed
    isClaimed: true,
    claimedBy: "@babykeem",
    dispute: {
      initiated: false,
      reason: "",
      proofRequested: false,
    },
  },
};

// ? change the type for wagerData to actual type later (and should not be optional too)
export default function WagerSummary({
  wagerData = wagerDetails,
}: {
  wagerData?: any;
}) {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "pending";
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("auth_user");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      if (profile.picture) {
        profile.picture = cleanSvgString(profile.picture);
      }
      setUserProfile(profile);
    }
  }, []);

  const shouldShowClaimButton =
    (state === "active" || state === "won") &&
    !wagerDetails.claimStatus?.isClaimed;
  const shouldShowCreateButton = state === "pending";

  const isClaimedByOpponent = wagerDetails.claimStatus?.isClaimed;
  // !This is to make sure that the claim is not by you and is truly done,
  // ! the opponent. This cannot be used yet until integration where we have users data
  // && wagerDetails.claimStatus?.claimedBy !== '@currentUser';

  const renderBattleDisplay = () => {
    switch (state) {
      case "pending":
        return (
          <BattleDisplay
            player1={{
              username: userProfile?.username
                ? `@${userProfile.username}`
                : "@noyi24_7",
              avatar: userProfile?.picture
                ? userProfile.picture
                : "/images/avatar.svg",
            }}
            isPending
            amount={`${wagerData.stake} STRK each`}
          />
        );
      case "won":
        return (
          <BattleDisplay
            player1={{
              username: "@noyi24_7",
              avatar: "/images/avatar.svg",
              isWinner: true,
            }}
            player2={{
              username: "@@babykeem",
              avatar: "/images/player2.svg",
              isWinner: false,
            }}
            amount="5 STRK each"
          />
        );
      case "lost":
        return (
          <BattleDisplay
            player1={{
              username: "@noyi24_7",
              avatar: "/images/avatar.svg",
              isWinner: false,
            }}
            player2={{
              username: "@@babykeem",
              avatar: "/images/player2.svg",
              isWinner: true,
            }}
            amount="5 STRK each"
          />
        );
      default:
        return (
          <BattleDisplay
            player1={{
              username: "@noyi24_7",
              avatar: "/images/avatar.svg",
            }}
            player2={{
              username: "@@babykeem",
              avatar: "/images/player2.svg",
            }}
            amount={`${wagerData.stake} STRK each`}
          />
        );
    }
  };

  return (
    <WagerLayout
      showCreateButton={shouldShowCreateButton}
      showClaimButton={shouldShowClaimButton}
      isClaimedByOpponent={isClaimedByOpponent}
    >
      {renderBattleDisplay()}
      <WagerDetails
        {...wagerData}
        potentialWinnings={
          wagerData.stake
            ? `${wagerData.stake * 2} STRK`
            : wagerDetails.potentialWinnings
        }
        platformFee={wagerDetails.platformFee}
        description={wagerData.terms || wagerDetails.description}
      />
    </WagerLayout>
  );
}
