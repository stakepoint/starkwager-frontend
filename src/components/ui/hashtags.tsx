"use client";

import { Hash } from "lucide-react";
import { useState } from "react";

const HashtagsModal = () => {
  const [selectedHashtags, setSelectedHashtags] = useState<number[]>([1]);

  const hashtags = [
    {
      id: 1,
      title: "Bitcoin",
    },
    {
      id: 2,
      title: "STRKBet",
    },
    {
      id: 3,
      title: "BTCto100k",
    },
    {
      id: 4,
      title: "CryptoBetting",
    },
    {
      id: 5,
      title: "BlockchainWager",
    },
    {
      id: 6,
      title: "CryptoTrends",
    },
    {
      id: 7,
      title: "Web3Challenge",
    },
    {
      id: 8,
      title: "DeFiPrediction",
    },
  ];

  const handleHashtagSelect = (id: number) => {
    setSelectedHashtags(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((hashtagId) => hashtagId !== id) // Remove the hashtag if it's already selected
          : [...prevSelected, id] // Add the hashtag if it's not selected
    );
  };

  return (
    <>
      <h3 className="text-center font-medium text-xl md:text-2xl leading-[2.1] sm:leading-[1.75] text-headingBlue mt-2">
        Add Hashtag(s)
      </h3>
      <div className="flex flex-col w-full justify-center items-center -mt-3">
        <p className="text-center max-w-[263px] md:max-w-full text-sm md:text-lg text-grey-1 tracking-[-0.36px] leading-[1.3] sm:leading-[1.3] mb-3 mt-2">
          Hashtags helps other users find your wager easily and quickly.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap overflow-x-hidden">
        {hashtags.map((hashtag) => (
          <div
            key={hashtag.id}
            className={`flex items-center gap-3 border-none ${
              selectedHashtags.includes(hashtag.id)
                ? "bg-blue-1"
                : "bg-[#EFF1F5]"
            } rounded-lg py-2 px-2.5 cursor-pointer`}
            onClick={handleHashtagSelect.bind(null, hashtag.id)}
          >
            <div
              className={`rounded-[1.5px] ${
                selectedHashtags.includes(hashtag.id)
                  ? "bg-input-bg"
                  : "bg-blue-1"
              }`}
            >
              <Hash
                size={16}
                color={`${
                  selectedHashtags.includes(hashtag.id) ? "#102A56" : "#EFF1F5"
                }`}
              />
            </div>

            <p
              className={`text-sm font-medium ${
                selectedHashtags.includes(hashtag.id)
                  ? "text-white"
                  : "text-blue-1"
              }`}
            >
              {hashtag.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HashtagsModal;
