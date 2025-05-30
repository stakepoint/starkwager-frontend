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
    <div className="bg-body-bg dark:bg-grey-10  mx-auto">
      <section className="bg-body-bg dark:bg-grey-10 min-h-screen w-full flex mx-auto">
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
