import React from "react";
import { FundIcon } from "../../svgs/fundIcon";

interface FundWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 flex sm:justify-center sm:items-center 
             justify-end items-end px-4 py-12 sm:px-6 lg:px-8 bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-[400px] sm:max-w-[359px] min-h-[346px] sm:min-h-[330px] rounded-2xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="flex justify-end">
              <button onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h3 className="text-center font-semibold text-2xl sm:text-xl leading-[2.1] sm:leading-[1.75]">
              Fund Your Wallet
            </h3>
            <p className="text-center text-base sm:text-sm text-[rgba(74,85,120,1)] tracking-tighter leading-[1.3] sm:leading-[1.3] mb-3">
              To be able to create wagers you need to fund your wallet with
              Strk.
            </p>
            <div className="flex items-center justify-center mb-6">
              <FundIcon />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="w-full max-w-[352px] sm:max-w-[311px] h-14 px-4 py-3 rounded-[16px] inline-flex items-center justify-center bg-[#E0FE10] text-black hover:bg-[#D8EA0F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0FE10] focus-visible:ring-offset-2"
              >
                Fund
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FundWalletModal;
