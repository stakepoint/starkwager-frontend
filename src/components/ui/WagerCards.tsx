import React from "react";
import Image from "next/image";

interface WagerCardProps {
  question?: string;
  progress: boolean;
  stakeAmount?: number;
  leftUser: {
    username: string;
    icon: string;
  };
  rightUser: {
    username: string;
    icon: string;
  };
  completed?: boolean;
}

const WagerCards: React.FC<WagerCardProps> = ({
  question,
  progress,
  stakeAmount,
  leftUser,
  rightUser,
  completed,
}) => {
  return (
    <div className="w-full p-4 bg-white mt-3 rounded-lg">
      {/* Status Indicator */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {/* Progress Indicator */}
        <div
          className={`w-2 h-2 rounded-full ${
            progress && !completed
              ? "bg-green-500"
              : !progress && !completed
              ? "bg-[#EAAA08]"
              : "bg-blue-1"
          }`}
        ></div>

        <span className="text-gray-600 text-[13px] md:text-sm">
          {progress && !completed
            ? "In Progress"
            : !progress && !completed
            ? "Pending"
            : "Completed"}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-center text-blue-1 text-base md:text-xl font-medium mb-3">
        {question}
      </h2>

      {/* Stake Amount */}
      <div className="flex justify-center mb-8">
        <div className="bg-body-bg rounded-full px-2 py-2 flex items-center gap-2">
          <Image
            src="/images/StrkLogo.svg"
            alt="STRK"
            className="w-4 h-4"
            width={20}
            height={20}
          />
          <span className="text-blue-1 font-medium text-sm">
            {stakeAmount} Strk each
          </span>
        </div>
      </div>

      {/* Users */}
      <div className="flex justify-between items-center gap-4 md:gap-8 px-6 md:px-10 lg:px-14">
        {/* Left User */}
        <div className="text-center">
          {leftUser.icon ? (
            <Image
              src={leftUser.icon}
              alt={leftUser.username}
              width={56}
              height={56}
              className="w-12 h-12 md:w-20 md:h-20 rounded-lg mb-1"
            />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg mb-1 bg-blue-1 flex">
              <p className="text-white text-3xl font-medium m-auto">
                {leftUser.username.charAt(1).toUpperCase()}
              </p>
            </div>
          )}
          <span className="text-blue-1 font-medium text-[12px] md:text-sm">
            {leftUser.username}
          </span>
        </div>

        {/* VS Text */}
        <div className="flex flex-col items-center">
          <span className="text-gray-600 text-[12px] lg:text-sm">
            One-on-One
          </span>
          <span className="text-blue-1 text-2xl md:text-3xl lg:text-4xl font-extrabold italic">
            VS
          </span>
        </div>

        {/* Right User */}
        <div className="text-center">
          {rightUser.icon ? (
            <Image
              src={rightUser.icon}
              alt={rightUser.username}
              width={56}
              height={56}
              className="w-12 h-12 md:w-20 md:h-20 rounded-lg mb-1"
            />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg mb-1 bg-blue-1 flex">
              <p className="text-white text-3xl font-medium m-auto">
                {rightUser.username.charAt(1).toUpperCase()}
              </p>
            </div>
          )}
          <span className="text-blue-1 font-medium text-[12px] md:text-sm">
            {rightUser.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WagerCards;
