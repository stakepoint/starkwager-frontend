"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WagerCards from "@/components/ui/WagerCards";
import WagerCardSkeleton from "@/components/ui/skeletons/wagerCardSkeleton";
import { RefreshCw } from "lucide-react";
import { useWagersByStatus, Wager } from "@/hooks/wager/useWager";

interface User {
  username: string;
  icon: string;
}

export default function Wagers() {
  const [useMockData, setUseMockData] = useState(false); // Toggle for testing

  const {
    activeWagers,
    pendingWagers,
    completeWagers,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useWagersByStatus({
    useMockData,
  });

  // Empty state component
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No wagers found
      </h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Error loading wagers
      </h3>
      <p className="text-gray-500 mb-4">
        {error?.message || "Something went wrong"}
      </p>
      <Button onClick={() => refetch()} disabled={isRefetching}>
        {isRefetching ? "Retrying..." : "Try Again"}
      </Button>
    </div>
  );

  // Loading skeleton for multiple cards
  const LoadingSkeleton = ({ count = 2 }: { count?: number }) => (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <WagerCardSkeleton key={index} />
      ))}
    </div>
  );

  // Render wager cards
  const renderWagerCards = (wagerList: Wager[], emptyMessage: string) => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return <ErrorState />;
    }

    if (wagerList.length === 0) {
      return <EmptyState message={emptyMessage} />;
    }

    return (
      <div className="space-y-3">
        {wagerList.map((wager) => {
          // Extract user data properly from the processed wager data
          const leftUser: User = (wager as any).leftUser || {
            username: wager.name || "@unknown",
            icon: "/images/leftWagercardUserOneIcon.svg",
          };

          const rightUser: User = (wager as any).rightUser || {
            username: "Awaiting Opponent",
            icon: "/images/opponent.svg",
          };

          return (
            <WagerCards
              key={wager.id}
              wagerId={wager.id}
              wagerStatus={wager.status}
              question={wager.description || wager.name}
              stakeAmount={wager.stakeAmount}
              leftUser={leftUser}
              rightUser={rightUser}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full pt-5 pb-20 md:py-20 flex justify-center items-center">
      <div className="w-[650px]">
        {/* Testing Controls - Remove in production */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <h4 className="text-sm font-medium mb-2">Testing Controls:</h4>
          <div className="flex gap-2 items-center">
            <Button
              variant={useMockData ? "default" : "outline"}
              size="sm"
              onClick={() => setUseMockData(true)}
            >
              Use Mock Data
            </Button>
            <Button
              variant={!useMockData ? "default" : "outline"}
              size="sm"
              onClick={() => setUseMockData(false)}
            >
              Use Real API
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCw
                className={`w-4 h-4 mr-1 ${isRefetching ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Current mode: {useMockData ? "Mock Data" : "Real API"} | Status:{" "}
            {isLoading ? "Loading..." : error ? "Error" : "Loaded"}
          </p>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="flex justify-center">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-yellow-400"
            >
              Active{" "}
              {!isLoading &&
                activeWagers.length > 0 &&
                `(${activeWagers.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-yellow-400"
            >
              Pending{" "}
              {!isLoading &&
                pendingWagers.length > 0 &&
                `(${pendingWagers.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className="data-[state=active]:bg-yellow-400"
            >
              Complete{" "}
              {!isLoading &&
                completeWagers.length > 0 &&
                `(${completeWagers.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {renderWagerCards(activeWagers, "No active wagers at the moment.")}
          </TabsContent>

          <TabsContent value="pending">
            {renderWagerCards(
              pendingWagers,
              "No pending wagers waiting for opponents."
            )}
          </TabsContent>

          <TabsContent value="complete">
            {renderWagerCards(
              completeWagers,
              "No completed wagers to display."
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
