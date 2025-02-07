'use client';

import { getSvgById } from "@/svgs";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <>
      <SidebarDesktop />
      <SidebarMobile />
    </>
  );
}

export function SidebarDesktop() {
  const path = usePathname();

  return (
    <aside className=" hidden sticky top-0  w-[13rem] px-5 py-4  lg:flex flex-col items-center h-screen overflow-y-auto  bg-gray-900">
      <div className="w-full flex gap-8 flex-col items-center">
        {getSvgById("appLogo", { className: "w-28" })}
        <Link href="/dashboard/create-wager" className="w-full flex items-center justify-center gap-3 text-base font-medium bg-secondary rounded-2xl p-4">
          {getSvgById("shake_fill_icon", { className: "fill-blue-950 w-5" })}
          New Wager
        </Link>
      </div>
      <div className="pt-[5.5rem]">
        <div className="text-white flex flex-col items-center gap-4">
          {sideLinks.map((item, idx) => (
            <Link
              className={cn(`flex group fill-gray-500 text-gray-500 gap-2 flex-col items-center text-xs`)}
              href={item.url}
              key={idx}
            >
              <div className="w-[3.5rem] h-8 justify-center flex flex-col items-center group-hover:fill-primary group-hover:bg-transparent bg-gray-800  rounded-2xl ">
                {item.icon(
                  cn(
                    "w-6",
                    path === item.url ? "fill-secondary" : "fill-gray-500"
                  )
                )}

              </div>
              <span className={cn(`group-hover:text-primary`, path === item.url && 'text-secondary font-bold')}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside >
  );
}

export function SidebarMobile() {
  const path = usePathname();


  return (
    <aside className="md:hidden left-0  fixed bottom-0 w-full  py-3 flex flex-col items-center   bg-gray-900">
      <div className="w-full">
        <div className="text-white flex justify-between w-full items-center gap-4">
          {sideLinks.map((item, idx) => (
            <Link
              className="flex group w-full fill-gray-500 text-gray-500 gap-2 flex-col items-center text-xs"
              href="#"
              key={idx}
            >
              <div className="w-[3.5rem] h-8 justify-center flex flex-col items-center group-hover:fill-primary group-hover:bg-transparent bg-gray-800  rounded-2xl ">
                {item.icon(
                  cn(
                    "w-6",
                    path === item.url ? "fill-secondary" : "fill-gray-500"
                  )
                )}

              </div>
              <span className={cn(`group-hover:text-primary`, path === item.url && 'text-secondary font-bold')}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
