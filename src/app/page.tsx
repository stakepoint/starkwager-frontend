import SidebarNavigation from "@/components/landingpage/SidebarNavigation";
import SecondSection from "@/components/second-section/SecondSection";
import React from "react";
import HowItWorks from '@/components/how-it-works/HowItWorks';
import Hero from '@/components/landingpage/hero'

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0E101B] text-white">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content with appropriate padding to account for sidebar */}
      <main className="flex-1 md:ml-64 p-6">
        {/* Intro Section */}
        <section id="intro" className="">
          <div>
            <Hero />
          </div>
        </section>

        {/* How It Works Section */}
        <SecondSection />

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">CONTACT</h2>
            <p className="text-xl">Contact information and form goes here...</p>
          </div>
        </section>

        <HowItWorks />
      </main>
    </div>
  );
}