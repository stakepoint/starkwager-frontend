import React from "react";
import { Button } from "@/components/ui/button";

interface ClaimDisclaimerModalProps {
  onClose: () => void;
  onProceed: () => void;
}

const ClaimDisclaimerModal: React.FC<ClaimDisclaimerModalProps> = ({
  onClose,
  onProceed,
}) => {
  return (
    <div className="flex flex-col items-center p-6 mb-9 md:p-0 md:mb-0 dark:bg-grey-8">
      <h3 className="text-[#102A56] dark:text-white text-xl font-semibold text-center">
        Important Disclaimer
      </h3>

      <div className="my-6 px-2 text-center">
        <p className="text-[#475467] dark:text-white mb-6">
          Remember, your winnings are credited only after your opponent confirms
          your claim.
        </p>
        <p className="text-[#475467] dark:text-white">
          Avoid claiming victory without solid proof, as this can complicate
          issue resolution.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mt-6">
        <Button
          onClick={onClose}
          className="w-full bg-white text-[#102A56] border border-[#E2E5EB] rounded-full py-4 h-auto hover:bg-gray-50"
          type="button"
        >
          Cancel
        </Button>
        <Button
          onClick={onProceed}
          className="w-full bg-[#E0FE10] text-[#102A56] rounded-full py-4 h-auto hover:bg-[#E0FE10]/90 dark:bg-secondary"
          type="button"
        >
          Proceed with Claim
        </Button>
      </div>
    </div>
  );
};

export default ClaimDisclaimerModal;
