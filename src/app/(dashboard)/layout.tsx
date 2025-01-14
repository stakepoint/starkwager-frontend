import DashboardNavbar from "@/components/layouts/dashboardNavbar";
import Sidebar from "@/components/layouts/sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="  bg-white mx-auto">
      <section className="bg-gray-100 w-full flex mx-auto">
        <Sidebar />
        <div className="w-full container  mx-auto">
          <DashboardNavbar />
          {children}
        </div>
      </section>
    </div>
  );
}
