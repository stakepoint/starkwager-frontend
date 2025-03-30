"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface WagerCardProps {
  wagerId: string;
  question?: string;
  wagerStatus: "active" | "pending" | "completed";
  stakeAmount?: number;
  leftUser: {
    username: string;
    icon: string;
  };
  rightUser: {
    username: string;
    icon: string;
  };
}

const WagerCards: React.FC<WagerCardProps> = ({
  wagerId,
  question,
  wagerStatus,
  stakeAmount,
  leftUser,
  rightUser,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/wagers/wagers_summary?wagerId=${wagerId}`);
  };

  const getStatusColor = () => {
    switch (wagerStatus) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-[#EAAA08]";
      case "completed":
        return "bg-[#102A56]";
    }
  };

  const getStatusText = () => {
    switch (wagerStatus) {
      case "active":
        return "In Progress";
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
    }
  };

  return (
    <div
      className="w-full p-4 bg-white dark:bg-grey-8 border border-grey-7 mt-3 rounded-lg cursor-pointer hover:shadow-sm transition"
      onClick={handleCardClick}
    >
      {/* Status Indicator */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        <span className="text-gray-600 dark:text-white text-[13px] md:text-sm">
          {getStatusText()}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-center text-blue-1 dark:text-white text-sm sm:text-base md:text-xl font-medium mb-3">
        {question}
      </h2>

      {/* Stake Amount */}
      <div className="flex justify-center mb-8">
        <div className="bg-body-bg dark:bg-grey-9 rounded-full px-2 py-2 flex items-center gap-2">
          <Image
            src="/images/StrkLogo.svg"
            alt="STRK"
            className="w-4 h-4"
            width={20}
            height={20}
          />
          <span className="text-blue-1 dark:text-white font-medium text-sm">
            {stakeAmount} Strk each
          </span>
        </div>
      </div>

      {/* Users */}
      <div className="flex justify-between items-center gap-4 md:gap-8 px-6 md:px-10 lg:px-14">
        {/* Left User */}
        <div className="text-center">
          <Image
            src={leftUser.icon}
            alt={leftUser.username}
            width={56}
            height={56}
            className="w-8 h-8 md:w-20 md:h-20 rounded-lg mb-1 mx-auto"
          />
          <span className="text-blue-1 dark:text-white font-medium text-[12px] md:text-sm">
            {leftUser.username}
          </span>
        </div>

        {/* VS Text */}
        <div className="flex flex-col items-center">
          <span className="text-gray-600 dark:text-white text-[12px] lg:text-sm">
            One-on-One
          </span>
          <span className="text-blue-1 dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold italic">
            VS
          </span>
        </div>

        {/* Right User */}
        <div className="text-center">
          <Image
            src={rightUser.icon}
            alt={rightUser.username}
            width={56}
            height={56}
            className="w-8 h-8 md:w-20 md:h-20 rounded-lg mb-1 mx-auto"
          />
          <span className="text-blue-1 dark:text-white font-medium text-[12px] md:text-sm">
            {rightUser.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WagerCards;
