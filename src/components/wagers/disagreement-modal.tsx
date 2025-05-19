import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

interface DisclaimerModalProps {
  onClose: () => void;
  onProceed: (reason: string) => void;
}

const DisagreementModal: React.FC<DisclaimerModalProps> = ({
  onClose,
  onProceed,
}) => {
  const [reason, setReason] = useState("");
  const charCount = reason.length;

  const handleProceed = () => {
    onProceed(reason);
  };

  return (
    <div className="flex flex-col items-center p-6 mb-9 md:p-0 md:mb-0 dark:bg-grey-8">
      <h3 className="text-[#102A56] dark:text-white text-xl font-semibold text-center">
        Important Disclaimer
      </h3>

      <p className="text-[#475467] text-center dark:text-white">
        You’ve just disagreed with this claim.
      </p>

      <div className="w-full max-w-[320px] mt-4 mx-auto h-[1px] bg-[linear-gradient(to_right,_#e2e8f0_53%,_rgba(255,255,255,0)_0%)] bg-bottom bg-[length:20px_15px] bg-repeat-x"></div>

      <p className="text-[#475467] dark:text-white text-center mt-4">
        Please request proof from{" "}
        <span className="font-bold text-headingBlue dark:text-white">
          {" "}
          @noyi24_7.
        </span>
      </p>

      <div className="w-full flex flex-col gap-2.5 mt-6">
        <div className="text-headingBlue dark:text-white font-medium text-sm">
          Reason for Dispute (Optional)
        </div>

        <div className="flex flex-col gap-2.5">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full !text-lg placeholder:text-[#B9C0D4] placeholder:font-medium bg-[#EFF1F5] dark:bg-grey-7 text-[#102A56] dark:text-white border-none rounded-lg py-4 h-auto hover:bg-[#EFF1F5]"
            placeholder="Why do you disagree?"
          />
          <div className="flex justify-end">
            <p className="text-sm text-muted-foreground">{charCount}/500</p>
          </div>
        </div>

        <div className="w-full flex gap-4 mt-6">
          <Button
            onClick={onClose}
            className="w-fit bg-[#F9F9FB] text-headingBlue rounded-2xl py-4 h-auto hover:bg-[#F9F9FB]"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            className="w-full bg-[#E0FE10] text-headingBlue rounded-2xl py-4 h-auto hover:bg-[#E0FE10]/90 dark:bg-secondary"
            type="button"
          >
            Request Proof
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisagreementModal;
