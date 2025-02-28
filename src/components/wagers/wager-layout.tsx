"use client";

import { Info } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";

interface WagerLayoutProps {
  children: ReactNode;
  showCreateButton?: boolean;
}

export function WagerLayout({ children, showCreateButton = false }: WagerLayoutProps) {
  return (
    <div className="mx-auto pb-20 lg:pb-5 max-w-xl">
      <div className="gap-4 grid">
        {children}
      </div>

      <section className="py-6 mt-6 grid gap-8 border-t">
        <div className="flex items-center gap-3 rounded-sm border bg-white pl-3 p-3 text-blue-1">
          <Info className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm md:text-base font-medium">
            Always keep verifiable evidence of your wagers for dispute
            resolution purposes.
          </p>
        </div>

        {showCreateButton && (
          <Button size={"lg"} className="w-full max-w-[343px] mx-auto h-14 text-lg font-medium tracking-[-0.36px]">
            Create Wager
          </Button>
        )}
      </section>
    </div>
  );
}