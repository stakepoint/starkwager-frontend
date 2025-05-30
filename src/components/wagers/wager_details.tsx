"use client";

import Image from "next/image";
import { Hash, Info } from "lucide-react";

interface WagerDetailsProps {
  title: string;
  potentialWinnings: string;
  platformFee: string;
  description: string[];
  hashtags: string[];
  category: string;
  stake?: number; // probably would
}

export function WagerDetails({
  title,
  potentialWinnings,
  platformFee,
  description,
  hashtags,
  category,
}: WagerDetailsProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm md:text-base font-medium text-grey-3 dark:text-[#6C737F]">
          Title of your Wager
        </h3>
        <p className="mt-2 text-sm md:text-base font-medium text-blue-1 dark:text-white">
          {title}
        </p>
      </div>

      <div>
        <h3 className="text-sm md:text-base font-medium text-grey-3 dark:text-[#6C737F]">
          Potential Winnings
        </h3>
        <div className="flex mt-2">
          <span className="rounded-full bg-white dark:bg-grey-7 px-3 py-1 text-lg font-medium text-blue-950 dark:text-white flex items-center gap-1">
            <div className="relative h-4 w-4 overflow-hidden rounded-xl">
              <Image
                src="/images/StrkLogo.svg"
                alt="StrkLogo"
                fill
                className="object-cover"
              />
            </div>
            {potentialWinnings}
          </span>
        </div>
      </div>

      {/* Platform fee */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm md:text-base font-medium text-grey-3 dark:text-[#6C737F]">
            Platform Fee
          </h3>
        </div>
        <span className="mt-1 text-xs md:text-base font-medium flex items-center gap-1">
          {platformFee}{" "}
          <Info className="h-4 w-4 text-blue-950 dark:text-white" />
        </span>
      </div>

      <div>
        <h3 className="text-sm md:text-base font-medium text-grey-3 dark:text-[#6C737F]">
          Terms or Wager Description
        </h3>
        <div className="mt-2 space-y-4 text-sm md:text-base font-medium text-blue-950 dark:text-white">
          {Array.isArray(description) ? (
            description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm md:text-base font-medium text-grey-3 dark:text-[#6C737F]">
          Category
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-white dark:bg-grey-7 space-x-2 px-3 py-2 text-sm md:text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 transition-colors">
            {category}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-sm md:text-base font-medium text-grey-3 dark:text-[#6C737F]">
          Hashtags
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-white dark:bg-grey-7 space-x-2 px-3 py-2 text-sm md:text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 transition-colors"
            >
              <span className="pr-1">
                <Hash className="h-5 w-5 p-1 dark:bg-white dark:text-blue-1 rounded" />
              </span>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
