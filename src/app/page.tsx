import Footer from "@/components/layouts/footer";
import SidebarNavigation from "@/components/landingpage/SidebarNavigation";

import SecondSection from "@/components/second-section/SecondSection";
import React from "react";
import Hero from "@/components/landingpage/hero";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import Impact from "@/components/landingpage/Impact";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0E101B] text-white">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content with appropriate padding to account for sidebar */}
      <main className="flex-1 md:ml-64">
        {/* Intro Section */}
        <section id="intro" className="">
          <div>
            <Hero />
          </div>
        </section>
        <SecondSection />

        {/* How It Works Section */}
        <section id="how-it-works" className="min-h-screen flex items-center">
          <HowItWorksSection />
        </section>

        {/* Impact section  */}
        <Impact />

        {/* footer */}
        <Footer />
      </main>
    </div>
  );
}
