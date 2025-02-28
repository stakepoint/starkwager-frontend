import DashboardNavbar from "@/components/layouts/dashboardNavbar";
import Sidebar from "@/components/layouts/sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-body-bg  mx-auto">
      <section className="bg-body-bg min-h-screen w-full flex mx-auto">
        <Sidebar />
        <div className="w-full container px-4 max-w-4xl  mx-auto">
          <DashboardNavbar />
          {children}
        </div>
      </section>
    </div>
  );
}
