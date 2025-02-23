import React from "react";

function WagerCardSkeleton() {
  return (
    <div className="w-full p-4 bg-white mt-3 rounded-lg animate-pulse">
      {/* Status Indicator */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <span className="text-gray-400 text-[13px] md:text-sm">Loading...</span>
      </div>

      {/* Question */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>

      {/* Stake Amount */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-2 w-1/3">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Users */}
      <div className="flex justify-between items-center gap-4 md:gap-8 px-6 md:px-10 lg:px-14">
        <div className="text-center">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-300 rounded-lg mb-1"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-6 w-12 bg-gray-300 rounded mt-1"></div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-300 rounded-lg mb-1"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default WagerCardSkeleton;
