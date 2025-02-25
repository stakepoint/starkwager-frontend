"use client";

import WagerCards from "@/components/ui/WagerCards";
import { useState } from "react";

export default function Wagers() {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  // Tab Options
  const options = [
    {
      id: 1,
      title: "Active",
    },
    {
      id: 2,
      title: "Pending",
    },
    {
      id: 3,
      title: "Complete",
    },
  ];

  // WagerCards Mock Data
  const cardData = [
    {
      question: "Will Bitcoin Hit $100k Before January 31, 2025?",
      progress: true,
      leftUser: {
        username: "@noyi24_7",
        icon: "",
      },
      rightUser: {
        username: "@babykeem",
        icon: "",
      },
      stakeAmount: 10,
    },
    {
      question: "Will Bitcoin Hit $100k Before January 31, 2025?",
      progress: false,
      leftUser: {
        username: "@major_doe",
        icon: "",
      },
      rightUser: {
        username: "@noyi24_7r",
        icon: "",
      },
      stakeAmount: 10,
    },
    {
      question: "Will Bitcoin Hit $100k Before January 31, 2025?",
      progress: true,
      leftUser: {
        username: "@noyi24_7",
        icon: "",
      },
      rightUser: {
        username: "@jane_lazer",
        icon: "",
      },
      stakeAmount: 10,
      completed: true,
    },
  ];

  const handleTabSelect = (id: number) => {
    setSelectedTab(id);
  };

  // Filter WagerCards based on selected tab
  const handleOptionsFilter = (value: number) => {
    if (value == 1) {
      return cardData.filter(
        (item) => item.progress === true && !item.completed
      );
    } else if (value == 2) {
      return cardData.filter(
        (item) => item.progress === false && !item.completed
      );
    } else {
      return cardData.filter((item) => item.completed);
    }
  };

  return (
    <section className="w-full pb-[10rem] mx-auto space-y-4 pt-5 lg:pt-[4rem]">
      <div className="flex items-center justify-center gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center gap-3 border-none ${
              option.id == selectedTab ? "bg-secondary" : "bg-transparent"
            } rounded-sm py-2 px-2.5 cursor-pointer`}
            onClick={handleTabSelect.bind(null, option.id)}
          >
            <p
              className={`text-sm font-medium ${
                option.id == selectedTab ? "text-blue-1" : "text-grey-3"
              }`}
            >
              {option.title}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        {handleOptionsFilter(selectedTab).map((card, index) => (
          <WagerCards
            key={index}
            question={card.question}
            progress={card.progress}
            leftUser={card.leftUser}
            rightUser={card.rightUser}
            stakeAmount={card.stakeAmount}
            completed={card.completed}
          />
        ))}
      </div>
    </section>
  );
}
