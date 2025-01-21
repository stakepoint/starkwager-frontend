import DashboardNavbar from "@/components/layouts/dashboardNavbar";
import Sidebar from "@/components/layouts/sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white  mx-auto">
      <section className="bg-gray-100 min-h-screen md:px-0 px-4 w-full flex mx-auto">
        <Sidebar />
        <div className="w-full container max-w-4xl  mx-auto">
          <DashboardNavbar />
          {children}
        </div>
      </section>
    </div>
  );
}
