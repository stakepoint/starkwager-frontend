"use client";

import React from "react";
import { useWagers, transformWagerToCardProps } from "@/hooks/wager/useWagers";
import WagerCards from "@/components/ui/WagerCards";
import EmptyStateView from "@/components/ui/emptystate";
import WagerCardSkeleton from "@/components/ui/skeletons/wagerCardSkeleton";
import { AlertCircle, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * 🔧 TESTING CONFIGURATION
 * 
 * To test different states, modify these flags:
 * 
 * 1. Empty State Testing:
 *    - Set: useDummyData = true, testEmptyState = true
 * 
 * 2. Dummy Data Testing:
 *    - Set: useDummyData = true, testEmptyState = false
 * 
 * 3. Real API Testing:
 *    - Set: useDummyData = false
 * 
 * 4. Loading State Testing:
 *    - Set: useDummyData = false (and slow down network in dev tools)
 */

interface GlobalWagersProps {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
}

// Temporary dummy data for testing while auth issue is resolved
const dummyWagers = [
  {
    id: "1",
    title: "Will Bitcoin Hit $100k Before January 31, 2025?",
    category: "Crypto",
    hashtags: ["bitcoin", "crypto"],
    terms: "Bitcoin must reach $100,000 USD by January 31, 2025",
    stake: 100,
    mode: "HeadToHead",
    claim: "Yes",
    resolutionTime: "2025-01-31T00:00:00Z",
    status: "active" as const,
    createdBy: {
      address: "0x123",
      username: "alice",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: {
      address: "0x456",
      username: "bob",
      picture: "/images/RightWagercardUserOneIcon.svg",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Will Ethereum Reach $5000 by March 2025?",
    category: "Crypto",
    hashtags: ["ethereum", "crypto"],
    terms: "Ethereum must reach $5,000 USD by March 2025",
    stake: 50,
    mode: "HeadToHead",
    claim: "Yes",
    resolutionTime: "2025-03-31T00:00:00Z",
    status: "pending" as const,
    createdBy: {
      address: "0x789",
      username: "charlie",
      picture: "/images/leftWagercardUserOneIcon.svg",
    },
    opponent: undefined,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
];

// Enhanced Empty State Component
function WagersEmptyState({ 
  showCreateButton = true,
  title = "No Active Wagers Found",
  description = "Be the first to create an exciting wager and challenge others!",
  isDummyData = false
}: {
  showCreateButton?: boolean;
  title?: string;
  description?: string;
  isDummyData?: boolean;
}) {
  const router = useRouter();

  const handleCreateWager = () => {
    router.push("/dashboard/create-wager");
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md text-center">
        {/* Empty Icon */}
        <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-gray-100 dark:bg-grey-8 flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-gray-400 dark:text-grey-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-blue-1 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-grey-5 mb-6 text-sm">
          {description}
        </p>

        {/* Development Notice */}
        {isDummyData && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              📝 <strong>Dev Mode:</strong> Empty dummy data for testing empty state
            </p>
          </div>
        )}

        {/* Create Wager Button */}
        {showCreateButton && (
          <Button
            onClick={handleCreateWager}
            className="bg-blue-1 hover:bg-blue-1/90 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Create Your First Wager
          </Button>
        )}
      </div>
    </div>
  );
}

export default function GlobalWagers({
  limit = 10,
  showHeader = true,
  showViewAll = true,
}: GlobalWagersProps) {
  // 🔧 Configuration flags for easy testing
  const useDummyData = true;
  const testEmptyState = false; // 👈 Set to TRUE to test empty state!
  
  const { data, isLoading, error, refetch, isRefetching } = useWagers({
    limit,
  });

  // Use dummy data if enabled
  if (useDummyData) {
    // Test empty state or show wagers
    const wagersToShow = testEmptyState ? [] : dummyWagers.slice(0, limit);
    const dummyData = {
      wagers: wagersToShow,
      total: wagersToShow.length,
      page: 1,
      limit,
    };

    // Empty state for dummy data
    if (dummyData.wagers.length === 0) {
      return (
        <div className="space-y-4">
          {showHeader && (
            <div className="flex justify-between items-center">
              <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
                Global Wagers
              </p>
              {showViewAll && (
                <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm cursor-pointer">
                  View All
                </p>
              )}
            </div>
          )}
          <WagersEmptyState 
            isDummyData={true}
            title="No Wagers Available"
            description="Currently testing empty state. Create your first wager to get started!"
          />
        </div>
      );
    }

    // Show dummy wagers
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex justify-between items-center">
            <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
              Global Wagers
            </p>
            {showViewAll && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm">
                  {dummyData.total} total
                </span>
                <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm cursor-pointer hover:text-blue-1 transition-colors">
                  View All
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-3">
          {dummyData.wagers.map((wager) => {
            const cardProps = transformWagerToCardProps(wager);
            return (
              <WagerCards
                key={wager.id}
                wagerId={cardProps.wagerId}
                question={cardProps.question}
                wagerStatus={cardProps.wagerStatus}
                leftUser={cardProps.leftUser}
                rightUser={cardProps.rightUser}
                stakeAmount={cardProps.stakeAmount}
              />
            );
          })}
        </div>

      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex justify-between items-center">
            <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
              Global Wagers
            </p>
            {showViewAll && (
              <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm">
                Loading...
              </p>
            )}
          </div>
        )}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <WagerCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex justify-between items-center">
            <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
              Global Wagers
            </p>
            {showViewAll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
                disabled={isRefetching}
                className="text-[12px] lg:text-sm text-gray-600 dark:text-grey-5 hover:text-blue-1"
              >
                {isRefetching ? (
                  <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  "Retry"
                )}
              </Button>
            )}
          </div>
        )}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Failed to load wagers
              </h3>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {error.message || "Something went wrong while fetching wagers"}
              </p>
              {error.message === "Failed to fetch wagers" && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                  API may require authentication. Please check with the backend team.
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/30"
            >
              {isRefetching ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                "Try Again"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state for API data
  if (!data?.wagers || data.wagers.length === 0) {
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex justify-between items-center">
            <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
              Global Wagers
            </p>
            {showViewAll && (
              <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm cursor-pointer">
                View All
              </p>
            )}
          </div>
        )}
        <WagersEmptyState 
          title="No Active Wagers"
          description="The community hasn't created any wagers yet. Be the first to start a challenge!"
        />
      </div>
    );
  }

  // Populated state with real API data
  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex justify-between items-center">
          <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
            Global Wagers
          </p>
          {showViewAll && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm">
                {data.total} total
              </span>
              <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm cursor-pointer hover:text-blue-1 transition-colors">
                View All
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-3">
        {data.wagers.map((wager) => {
          const cardProps = transformWagerToCardProps(wager);
          return (
            <WagerCards
              key={wager.id}
              wagerId={cardProps.wagerId}
              question={cardProps.question}
              wagerStatus={cardProps.wagerStatus}
              leftUser={cardProps.leftUser}
              rightUser={cardProps.rightUser}
              stakeAmount={cardProps.stakeAmount}
            />
          );
        })}
      </div>

      {data.total > limit && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="text-blue-1 border-blue-1 hover:bg-blue-1 hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-blue-1"
          >
            {isRefetching ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Load More Wagers"
            )}
          </Button>
        </div>
      )}
    </div>
  );
} 