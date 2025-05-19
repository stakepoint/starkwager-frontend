"use client";

import React, { useState } from "react";
import { Bell, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/utils";
import NotificationPanel from "@/components/layouts/notificationPanel";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdownMenu";
import WalletBar from "../ui/wallet-bar";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const toggleNotificationPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <nav className="py-6 lg:flex ">
      <header className="flex w-full items-center justify-between ">
        <h1 className="text-3xl font-bold lg:block whitespace-nowrap text-blue-950 dark:text-white">
          {getPageTitle(pathname)}
        </h1>
        <div className="flex md:justify-between justify-end w-full lg:w-fit items-center gap-4">
          <div className="hidden md:flex">
            <WalletBar isWeb={false} />
          </div>
          {/*Theme Changer*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-950 dark:text-white"
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Monitor className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="dark:bg-white dark:text-grey-9"
            >
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="text-blue-950 dark:text-white"
            variant="ghost"
            size="icon"
            onClick={toggleNotificationPanel}
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>
      {isPanelOpen && <NotificationPanel />}
    </nav>
  );
}
