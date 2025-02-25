import DashboardNavbar from "@/components/layouts/dashboardNavbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-body-bg min-h-screen w-full flex mx-auto">
      <div className="w-full container px-4 max-w-4xl  mx-auto">
        <DashboardNavbar />
        {children}
      </div>
    </section>
  );
}
