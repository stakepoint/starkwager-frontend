"use client";

// components/landingpage/SidebarNavigation.tsx
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wallet, X, Menu } from "lucide-react";
import { getSvgById } from "@/svgs";
import { LandingArrow } from "@/svgs/landingArrow";
import { useAccount } from "@starknet-react/core";

interface SidebarNavigationProps {
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "INTRO", href: "#intro" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "CONTACT", href: "#contact" },
];

const SidebarNavigation: FC<SidebarNavigationProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string) => {
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile sidebar after clicking
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button - only show when sidebar is closed */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-10 right-4 z-50 p-[16px] bg-[#1F2A37] text-white rounded-[16px] gap-[12px] h-[56px] w-[56px]"
        >
          <Menu size={24} color="#FFFFFF" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed h-full bg-[#1F2A37] border border-[#30374F] text-white z-40 transition-all duration-300 flex flex-col",
          isMobile
            ? isOpen
              ? "w-full left-0"
              : "-left-full w-full"
            : "w-64 left-0 top-0 ",
          className
        )}
      >
        {/* Mobile header with close button */}
        {isMobile && isOpen && (
          <div className="flex items-center justify-between p-7 bg-[#1F2A37]">
            <h2 className="text-xl font-bold flex justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="28"
                viewBox="0 0 24 28"
                fill="none"
              >
                <g clip-path="url(#clip0_38223_18479)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9968 25.957C11.4047 22.287 9.59559 18.6241 7.34543 15.6787C7.12323 15.3996 6.72315 15.3411 6.47053 15.5383C6.17185 15.7614 6.10362 16.1727 6.32554 16.4513C8.42862 19.2477 10.1719 22.6904 10.7141 26.1681C10.7885 26.5087 11.1122 26.7517 11.4505 26.703C11.8343 26.6273 12.0712 26.2976 11.9968 25.957Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0734 26.1265C12.671 22.613 15.4541 19.7109 18.2161 17.6191C18.4687 17.4219 18.5364 17.0103 18.3142 16.7313C18.0923 16.4526 17.6922 16.3948 17.3938 16.6183C14.4223 18.8762 11.4514 22.0866 10.7951 25.9216C10.7494 26.2655 10.9981 26.5904 11.3398 26.6533C11.6817 26.7166 12.0274 26.47 12.0734 26.1265Z"
                    fill="white"
                  />
                  <path
                    d="M11.5892 24.7425C10.691 18.5078 9.52547 5.32675 12.0497 2.48012"
                    stroke="white"
                    strokeWidth="0.981851"
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_38223_18479">
                    <rect
                      width="14.0365"
                      height="23.06"
                      fill="white"
                      transform="translate(0.0117188 7.69727) rotate(-30)"
                    />
                  </clipPath>
                </defs>
              </svg>{" "}
              <span className="transform -rotate-6 inline-block translate-y-1">
                WHERE TO?
              </span>
            </h2>
            <button onClick={toggleSidebar} className="p-2">
              <X size={24} />
            </button>
          </div>
        )}

        {/* Logo (desktop only) */}
        {!isMobile && (
          <div className="p-10 mt-10">
            <Link href="/dashboard">
              {getSvgById("appLogo", { className: "w-28" })}
            </Link>
          </div>
        )}

        {/* Navigation links */}
        <nav className="p-6">
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  "py-2",
                  index !== navItems.length - 1
                    ? "border-b border-dashed border-[#4D5761]"
                    : ""
                )}
              >
                <div className="flex justify-between items-center">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-xl font-bold hover:text-[#E0FE10] transition-colors"
                  >
                    {item.label}
                  </a>
                  <div className="w-8 h-8 bg-[#E0FE10] rounded-full flex items-center justify-center text-[#1F2A37]">
                    <LandingArrow />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect Wallet button - moved up with less bottom margin */}
        {!address && (
          <div className="p-4 mt-4">
            <Button
              className="w-full bg-[#E0FE10] text-[#102A56] hover:bg-[#a8d500] font-bold py-3 rounded-md"
              onClick={() => console.log("Connect wallet clicked")}
            >
              Connect Wallet <Wallet className="ml-2 h-5 w-5" color="#102A56" />
            </Button>
            <p className="text-center text-sm mt-2 text-[#EFF8FF]">
              and start making wagers
            </p>
          </div>
        )}

        {/* Copyright - moved up */}
        <div className="p-4  text-xs text-[#6C737F] font-[400] mt-4">
          Copyright © Strkwgr 2025
        </div>
      </div>
    </>
  );
};

export default SidebarNavigation;
