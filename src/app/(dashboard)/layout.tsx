"use client";
import DashboardNavbar from "@/components/layouts/dashboardNavbar";
import Sidebar from "@/components/layouts/sidebar";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [showSidebar, setShowSidebar] = React.useState(true);

  useEffect(() => {
    if (pathName === "/dashboard/profile/setting") {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [pathName]);

  return (
    <div className="bg-body-bg  mx-auto ">
      <section className="bg-body-bg min-h-screen w-full flex mx-auto dark:bg-dark-body-bg">
        {showSidebar && <Sidebar />}
        <div
          className={`w-full container px-4   mx-auto ${
            showSidebar ? "max-w-4xl" : "max-w-6xl"
          }`}
        >
          <DashboardNavbar />
          {children}
        </div>
      </section>
    </div>
  );
}
