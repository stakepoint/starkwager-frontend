"use client";
import { useCreateWagerContext } from "@/contexts/createWager.context";
import WagerSummary from "@/module/dashboard/wagers/wagers_summary";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

function CreateWagerSummaryPage() {
  const router = useRouter();
  const params = useParams();
  const wagerId = params.wagerId as string;

  const { wagerData, clearWagerData } = useCreateWagerContext();

  if (
    !wagerData ||
    !wagerId ||
    wagerId !== wagerData?.title.replace(/\s+/g, "-")
  ) {
    clearWagerData();
    router.push("/dashboard/create-wager");

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-blue-1 dark:text-white">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <WagerSummary wagerData={wagerData} />;
}

export default CreateWagerSummaryPage;
