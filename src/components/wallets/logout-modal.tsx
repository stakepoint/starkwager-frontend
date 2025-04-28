import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useDisconnect } from "@starknet-react/core";
import { useRouter } from "next/navigation";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  const { disconnectAsync } = useDisconnect();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-6 mb-9 md:p-0 md:mb-0 dark:bg-grey-8">
      <h3 className="text-[#102A56] dark:text-white text-2xl font-semibold text-center">
        Logout?
      </h3>

      <div className="my-2 px-2 text-center">
        <p className="text-[#475467] dark:text-white">
          Are you sure you want to logout and disconnect your wallet?
        </p>
      </div>

      <Image alt="warning" src="/images/warning.svg" width={104} height={74} />

      <div className="w-full flex gap-4 mt-6 font-medium">
        <Button
          onClick={onClose}
          className="w-full bg-[#F9F9FB] dark:bg-[#111322] text-[#102A56] dark:text-white rounded-2xl py-4 h-auto hover:bg-gray-50"
          type="button"
        >
          Cancel
        </Button>
        <Button
          className="w-full bg-[#102A56] text-white dark:text-[#102A56] rounded-2xl py-4 h-auto dark:bg-white hover:bg-[#102A56] dark:hover:bg-white"
          onClick={async () => {
            await disconnectAsync();
            router.push("/");
          }}
          type="button"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
