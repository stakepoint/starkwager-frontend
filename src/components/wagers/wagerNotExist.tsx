import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface WagerDoesntExistModalProps {
  onClose: () => void;
}

const WagerDoesntExistModal: React.FC<WagerDoesntExistModalProps> = ({ onClose }) => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/dashboard");
    onClose();
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-[#102A56] text-xl font-semibold leading-normal">
        Wager Doesn't Exist
      </h3>
      
      <p className="text-[#4A5578] text-sm mt-2 text-center max-w-[280px]">
        The link to this wager does not exist or has already been joined by someone else
      </p>

      <div className="my-8">
        <Image
          src="/images/Warning.png"
          alt="Wager not found"
          width={103}
          height={74}
          className="object-contain"
        />
      </div>

      <Button
        onClick={handleBackHome}
        className="w-full bg-[#F9F9FB] text-[#102A56] hover:bg-[#E0FE10] hover:opacity-90 h-[52px] font-medium"
        type="button"
      >
        Back Home
      </Button>
    </div>
  );
};

export default WagerDoesntExistModal;