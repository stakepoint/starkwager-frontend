import React from "react";
import { FundIcon } from "../../svgs/fundIcon";
import { Button } from "../ui/button";
interface FundWalletModalProps {
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ onClose }) => {
  return (
    <div>
      <h3 className="text-center font-semibold text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue mt-2">
        Fund Your Wallet
      </h3>
      <p className="text-center text-sm md:text-lg text-grey-1 tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
        To be able to create wagers you need to fund your wallet with Strk.
      </p>
      <div className="flex items-center justify-center mt-6 mb-8">
        <FundIcon />
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          onClick={onClose}
          className="w-full max-w-[352px] sm:max-w-full text-lg font-medium"
          type="button"
        >
          Fund
        </Button>
      </div>
    </div>
  );
};

export default FundWalletModal;
