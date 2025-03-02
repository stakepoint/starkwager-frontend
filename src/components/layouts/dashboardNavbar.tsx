'use client'

import { Bell, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/utils";
import NotificationPanel from '@/components/layouts/notificationPanel';
import Image from "next/image";

export default function DashboardNavbar() {
  const pathname = usePathname();
  return (
    <nav className="hidden  lg:py-6 lg:flex ">
      <header className="flex w-full items-center justify-between ">
        <h1 className="text-3xl font-bold hidden lg:block  text-blue-950">
          {getPageTitle(pathname)}
        </h1>
        <div className="flex justify-between w-full lg:w-fit  items-center gap-4">
          <div className="flex items-center gap-2">

            <Image width={64} height={64} src='/images/avatar.svg' alt='Avatar' />


            <div className="flex items-center gap-2 bg-white p-1 px-2 rounded-[8px]">
              <span className="text-sm text-blue-950 font-medium">
                @noyi24_7
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 text-blue-950 h-4 w-4"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="text-blue-950 " variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>
    </nav>
  );
}
