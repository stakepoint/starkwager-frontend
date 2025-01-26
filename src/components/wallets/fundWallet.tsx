import React from "react";
import { FundIcon } from "../../svgs/fundIcon";
import { Button } from "../ui/button";
interface FundWalletModalProps {
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ onClose }) => {
  return (
    <div>
      <h3 className="text-center font-semibold text-2xl sm:text-xl leading-[2.1] sm:leading-[1.75] text-headingBlue">
        Fund Your Wallet
      </h3>
      <p className="text-center text-base sm:text-sm text-[rgba(74,85,120,1)] tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3">
        To be able to create wagers you need to fund your wallet with Strk.
      </p>
      <div className="flex items-center justify-center mb-6">
        <FundIcon />
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          onClick={onClose}
          className="w-full max-w-[352px] sm:max-w-[311px] "
          type="button"
        >
          Fund
        </Button>
      </div>
    </div>
  );
};

export default FundWalletModal;
