"use client";

import React from "react";
import { useWagers, transformWagerToCardProps } from "@/hooks/wager/useWagers";
import WagerCards from "@/components/ui/WagerCards";
import EmptyStateView from "@/components/ui/emptystate";
import WagerCardSkeleton from "@/components/ui/skeletons/wagerCardSkeleton";
import { AlertCircle, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { wagerService } from "@/services/api/wagerService";

/**
 * 🔧 DEBUGGING CONFIGURATION
 * 
 * Set this to true to bypass API and use dummy data directly
 */
const BYPASS_API_FOR_TESTING = false;

interface GlobalWagersProps {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
}

// Enhanced Empty State Component
function WagersEmptyState({ 
  showCreateButton = true,
  title = "No Active Wagers Found",
  description = "Be the first to create an exciting wager and challenge others!",
  isBackendEmpty = false
}: {
  showCreateButton?: boolean;
  title?: string;
  description?: string;
  isBackendEmpty?: boolean;
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
        {isBackendEmpty && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              📝 <strong>Backend Status:</strong> No wagers found on backend. Showing demo data for testing.
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
  console.log("🔄 GlobalWagers rendering with BYPASS_API_FOR_TESTING:", BYPASS_API_FOR_TESTING);
  
  // Temporary bypass for testing
  if (BYPASS_API_FOR_TESTING) {
    console.log("🔄 Using direct dummy data (API bypassed)");
    
    const dummyWagers = wagerService.getDummyWagers().slice(0, limit);
    const mockData = {
      wagers: dummyWagers,
      total: dummyWagers.length,
      page: 1,
      limit,
    };

    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex justify-between items-center">
            <p className="text-center text-blue-1 dark:text-white text-base md:text-xl font-medium">
              Global Wagers (Debug Mode)
            </p>
            {showViewAll && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm">
                  {mockData.total} total
                </span>
                <p className="text-gray-600 dark:text-grey-5 text-[12px] lg:text-sm cursor-pointer hover:text-blue-1 transition-colors">
                  View All
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-3">
          {mockData.wagers.map((wager) => {
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

        {/* Debug Status Indicator */}
        <div className="text-center pt-2">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              🐛 <strong>Debug Mode:</strong> API bypassed, showing dummy data directly
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Normal API flow
  const { data, isLoading, error, refetch, isRefetching } = useWagers({
    limit,
  });

  console.log("🔄 useWagers state:", { data, isLoading, error, isRefetching });

  // Loading state
  if (isLoading) {
    console.log("⏳ Showing loading state");
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
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-grey-5">
            Attempting to connect to backend...
          </p>
          <p className="text-xs text-gray-400 dark:text-grey-6 mt-1">
            Will show demo data if backend is unavailable
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    console.log("❌ Showing error state:", error);
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
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                Backend: https://starkwager-backend.onrender.com
              </p>
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

  // Empty state - this should rarely happen now due to fallback dummy data
  if (!data?.wagers || data.wagers.length === 0) {
    console.log("🚫 Showing empty state");
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
          isBackendEmpty={true}
        />
      </div>
    );
  }

  // Populated state with data (either from backend or dummy fallback)
  console.log("✅ Showing populated state with data:", data);
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

      {/* Backend Status Indicator */}

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