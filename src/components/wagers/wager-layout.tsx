"use client";

import { Info } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { ModalView } from "@/components/ui/modals";
import ClaimDisclaimerModal from "@/components/wagers/claim-disclaimer-modal";
import DisagreementModal from "./disagreement-modal";

interface WagerLayoutProps {
  children: ReactNode;
  showCreateButton?: boolean;
  showClaimButton?: boolean;
  isClaimedByOpponent?: boolean;
}

export function WagerLayout({
  children,
  showCreateButton = false,
  showClaimButton = false,
  isClaimedByOpponent = false,
}: WagerLayoutProps) {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isDisagreementOpen, setIsDisagreementOpen] = useState(false);

  const handleClaimClick = () => {
    setIsDisclaimerOpen(true);
  };

  const handleClaimProceed = () => {
    setIsDisclaimerOpen(false);
    setHasClaimed(true);
  };

  const handleCancelClaim = () => {
    setHasClaimed(false);
  };

  const handleDisagreement = () => {
    setIsDisagreementOpen(true);
  };

  const renderButton = () => {
    if (showClaimButton) {
      if (hasClaimed) {
        return (
          <Button
            onClick={handleCancelClaim}
            className="w-full max-w-[343px] mx-auto h-14 text-lg font-medium bg-white border border-[#E2E5EB] text-[#102A56] hover:bg-gray-50 transition-all duration-300"
          >
            Cancel Claim
          </Button>
        );
      }

      return (
        <Button
          onClick={handleClaimClick}
          className="w-full max-w-[343px] mx-auto h-14 text-lg font-medium transition-all duration-300"
        >
          Claim Win
        </Button>
      );
    }

    if (showCreateButton) {
      return (
        <Button
          size={"lg"}
          className="w-full max-w-[343px] mx-auto h-14 text-lg font-medium tracking-[-0.36px] dark:bg-secondary"
        >
          Create Wager
        </Button>
      );
    }

    if (isClaimedByOpponent) {
      return (
        <div className="flex gap-3 mt-5">
          <Button
            onClick={handleDisagreement}
            className="w-full bg-[#102A56] hover:bg-[#102A56]/90 flex items-center md:text-lg text-white font-medium"
          >
            Disagree
          </Button>
          <Button className="w-full hover:opacity-90 flex items-center md:text-lg font-medium">
            Agree
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ModalView
        open={isDisclaimerOpen}
        setOpen={setIsDisclaimerOpen}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <ClaimDisclaimerModal
          onClose={() => setIsDisclaimerOpen(false)}
          onProceed={handleClaimProceed}
        />
      </ModalView>

      <ModalView
        open={isDisagreementOpen}
        setOpen={() => setIsDisagreementOpen(false)}
        className="max-w-[400px] p-6 rounded-2xl"
      >
        <DisagreementModal
          onClose={() => setIsDisagreementOpen(false)}
          onProceed={() => setIsDisagreementOpen(false)}
        />
      </ModalView>

      <div className="mx-auto pb-20 lg:pb-5 max-w-xl">
        <div className="gap-4 grid">{children}</div>

        <section className="py-6 mt-6 grid gap-8 border-t">
          <div className="flex items-center gap-3 rounded-sm border bg-white dark:bg-grey-8 pl-3 p-3 text-blue-1 dark:text-white">
            <Info className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm md:text-base font-medium">
              Always keep verifiable evidence of your wagers for dispute
              resolution purposes.
            </p>
          </div>
          {renderButton()}
        </section>
      </div>
    </>
  );
}
