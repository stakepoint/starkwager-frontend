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
    },
    {
      id: 3,
      title: "Entertainment",
      icon: (
        <Music size={16} color={`${selectedTab == 3 ? "white" : "#102A56"}`} />
      ),
    },
    {
      id: 4,
      title: "Politics",
      icon: (
        <Scale size={16} color={`${selectedTab == 4 ? "white" : "#102A56"}`} />
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
    },
    {
      id: 7,
      title: "ESports",
      icon: (
        <Sword size={16} color={`${selectedTab == 7 ? "white" : "#102A56"}`} />
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
    },
  ];

  const handleTabSelect = (id: number) => {
    setSelectedTab(id);
  };

  return (
    <div className="flex items-center gap-3 w-full overflow-x-auto no-scrollbar">
      {options.map((option) => (
        <div
          key={option.id}
          className={`flex items-center gap-3 border-none ${
            option.id == selectedTab ? "bg-blue-1" : "bg-[#EFF1F5]"
          } rounded-sm py-2 px-2.5 cursor-pointer`}
          onClick={handleTabSelect.bind(null, option.id)}
        >
          <p
            className={`text-sm font-medium ${
              option.id == selectedTab ? "text-white" : "text-blue-1"
            }`}
          >
            {option.title}
          </p>
          <div>{option.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default WagerTabOptions;
