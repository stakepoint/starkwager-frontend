"use client";

import React, { useState } from "react";
import {
  Bitcoin,
  ChartLine,
  Gamepad2,
  Music,
  Scale,
  Sword,
  TrendingUp,
  Volleyball,
} from "lucide-react";

const WagerTabOptions = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const options = [
    {
      id: 1,
      title: "Trending",
      icon: (
        <TrendingUp
          size={16}
          color={`${selectedTab == 1 ? "white" : "#102A56"}`}
        />
      ),
      iconDark: (
        <TrendingUp
          size={16}
          color={`${selectedTab == 1 ? "#102A56" : "white"}`}
        />
      ),
    },
    {
      id: 2,
      title: "Sports",
      icon: (
        <Volleyball
          size={16}
          color={`${selectedTab == 2 ? "white" : "#102A56"}`}
        />
      ),
      iconDark: (
        <Volleyball
          size={16}
          color={`${selectedTab == 2 ? "#102A56" : "white"}`}
        />
      ),
    },
    {
      id: 3,
      title: "Entertainment",
      icon: (
        <Music size={16} color={`${selectedTab == 3 ? "white" : "#102A56"}`} />
      ),
      iconDark: (
        <Music size={16} color={`${selectedTab == 3 ? "#102A56" : "white"}`} />
      ),
    },
    {
      id: 4,
      title: "Politics",
      icon: (
        <Scale size={16} color={`${selectedTab == 4 ? "white" : "#102A56"}`} />
      ),
      iconDark: (
        <Scale size={16} color={`${selectedTab == 4 ? "#102A56" : "white"}`} />
      ),
    },
    {
      id: 5,
      title: "Crypto",
      icon: (
        <Bitcoin
          size={16}
          color={`${selectedTab == 5 ? "white" : "#102A56"}`}
        />
      ),
      iconDark: (
        <Bitcoin
          size={16}
          color={`${selectedTab == 5 ? "#102A56" : "white"}`}
        />
      ),
    },
    {
      id: 6,
      title: "Stocks",
      icon: (
        <ChartLine
          size={16}
          color={`${selectedTab == 6 ? "white" : "#102A56"}`}
        />
      ),
      iconDark: (
        <ChartLine
          size={16}
          color={`${selectedTab == 6 ? "#102A56" : "white"}`}
        />
      ),
    },
    {
      id: 7,
      title: "ESports",
      icon: (
        <Sword size={16} color={`${selectedTab == 7 ? "white" : "#102A56"}`} />
      ),
      iconDark: (
        <Sword size={16} color={`${selectedTab == 7 ? "#102A56" : "white"}`} />
      ),
    },
    {
      id: 8,
      title: "Games",
      icon: (
        <Gamepad2
          size={16}
          color={`${selectedTab == 8 ? "white" : "#102A56"}`}
        />
      ),
      iconDark: (
        <Gamepad2
          size={16}
          color={`${selectedTab == 8 ? "#102A56" : "white"}`}
        />
      ),
    },
  ];

  const handleTabSelect = (id: number) => {
    setSelectedTab(id);
  };

  return (
    <div className="flex items-center gap-3 w-full overflow-x-auto no-scrollbar pb-2">
      {options.map((option) => (
        <div
          key={option.id}
          className={`flex items-center gap-3 border-none ${
            option.id == selectedTab
              ? "bg-blue-1 dark:bg-white"
              : "bg-[#EFF1F5] dark:bg-grey-9"
          } rounded-sm py-3 px-2.5 cursor-pointer`}
          onClick={handleTabSelect.bind(null, option.id)}
        >
          <p
            className={`text-sm font-medium ${
              option.id == selectedTab
                ? "text-white dark:text-grey-8"
                : "text-blue-1 dark:text-white"
            }`}
          >
            {option.title}
          </p>
          <div className="dark:hidden">{option.icon}</div>
          <div className="dark:block hidden">{option.iconDark}</div>
        </div>
      ))}
    </div>
  );
};

export default WagerTabOptions;
