'use client';
import { WagerLayout } from '@/components/wagers/wager-layout';
import { BattleDisplay } from '@/components/wagers/battle-display';
import { WagerDetails } from '@/components/wagers/wager_details';
import { useSearchParams } from 'next/navigation';

const wagerDetails = {
  title: 'Will Bitcoin Hit $100k Before January 31, 2025?',
  potentialWinnings: '10 STRK',
  platformFee: '5.0%',
  description: [
    "Think Bitcoin is on track to skyrocket past $100k? Here's your chance to put your prediction to the test! This wager challenges participants to predict whether Bitcoin will reach or exceed the $100,000 mark by January 31, 2025. The official price will be determined using CoinMarketCap's data at 11:59 PM UTC on the deadline date.",
    "Participants must stake an equal amount of STRK tokens to join this head-to-head challenge. If Bitcoin hits or surpasses $100k by the specified date and time, those who wager 'Yes' win the wager. If it falls short, those who wager 'No' take the prize.",
    "No extensions, no exceptions—this is your chance to back your crypto knowledge with real stakes! Join now and see if your prediction skills can earn you the ultimate reward in STRK tokens. Let's see who's got what it takes to call the next big crypto move!",
  ],
  hashtags: [
    'Bitcoin',
    'STRKWager',
    'BTCto100k',
    'CryptoWagering',
    'BlockchainWager',
    'CryptoTrends',
    'Web3Challenge',
    'DeFiPrediction',
  ],
};

export default function WagerSummary() {
  const searchParams = useSearchParams();
  const state = searchParams.get('state') || 'pending';

  const shouldShowClaimButton = state === 'active' || state === 'won';
  const shouldShowCreateButton = state === 'pending';

  console.log('shouldShowCreateButton', shouldShowCreateButton);

  const renderBattleDisplay = () => {
    switch (state) {
      case 'pending':
        return (
          <BattleDisplay
            player1={{
              username: '@noyi24_7',
              avatar: '/images/avatar.svg',
            }}
            isPending
            amount='5 STRK each'
          />
        );
      case 'won':
        return (
          <BattleDisplay
            player1={{
              username: '@noyi24_7',
              avatar: '/images/avatar.svg',
              isWinner: true,
            }}
            player2={{
              username: '@@babykeem',
              avatar: '/images/player2.svg',
              isWinner: false,
            }}
            amount='5 STRK each'
          />
        );
      case 'lost':
        return (
          <BattleDisplay
            player1={{
              username: '@noyi24_7',
              avatar: '/images/avatar.svg',
              isWinner: false,
            }}
            player2={{
              username: '@@babykeem',
              avatar: '/images/player2.svg',
              isWinner: true,
            }}
            amount='5 STRK each'
          />
        );
      default:
        return (
          <BattleDisplay
            player1={{
              username: '@noyi24_7',
              avatar: '/images/avatar.svg',
            }}
            player2={{
              username: '@@babykeem',
              avatar: '/images/player2.svg',
            }}
            amount='5 STRK each'
          />
        );
    }
  };

  return (
    <WagerLayout
      showCreateButton={false}
      showClaimButton={shouldShowClaimButton}
    >
      {renderBattleDisplay()}
      <WagerDetails {...wagerDetails} />
    </WagerLayout>
  );
}
