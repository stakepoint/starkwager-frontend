import { getSvgById } from "@/svgs";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sideLinks = [
  {
    name: "Home",
    url: "/dashboard",
    icon: (className: string) => getSvgById("home_icon", { className }),
  },
  {
    name: "Wagers",
    url: "/dashboard/wager",
    icon: (className: string) => getSvgById("shake_icon", { className }),
  },
  {
    name: "Wallets",
    url: "/dashboard/wallet",
    icon: (className: string) => getSvgById("wallet_icon", { className }),
  },
  {
    name: "Profile",
    url: "/dashboard/profile",
    icon: (className: string) => getSvgById("profile_icon", { className }),
  },
];

export default function Sidebar() {
  return (
    <aside className=" w-[12rem] px-6 py-8  flex flex-col items-center h-screen overflow-y-auto  bg-gray-900">
      <div className="w-full flex gap-8 flex-col items-center">
        {getSvgById("appLogo", { className: "w-24" })}
        <Button className="w-full flex items-center text-sm font-medium">
          {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-100" })}
          New Wager
        </Button>
      </div>
      <div className="pt-[5.5rem]">
        <div className="text-white flex flex-col items-center gap-4">
          {sideLinks.map((item, idx) => (
            <Link
              className="flex group fill-gray-500 text-gray-500 gap-2 flex-col items-center text-xs"
              href="#"
              key={idx}
            >
              <span
                className={cn(
                  buttonVariants({
                    className:
                      "w-[4rem] group-hover:fill-primary group-hover:bg-transparent bg-gray-800  rounded-2xl ",
                  })
                )}
              >
                {item.icon("fill-inherit")}
              </span>
              <span className="group-hover:text-primary">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
