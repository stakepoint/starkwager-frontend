// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
import Footer from "@/components/layouts/footer";
import SidebarNavigation from "@/components/landingpage/SidebarNavigation";
import HowItWorks from "@/components/ui/HowItWorks";
import SecondSection from "@/components/second-section/SecondSection";
import React from "react";
import Impact from "@/components/landingpage/Impact";
// import HowItWorks from '@/components/how-it-works/HowItWorks';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0E101B] text-white">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content with appropriate padding to account for sidebar */}
      <main className="flex-1 md:ml-64">
        {/* Intro Section */}
        <section id="intro" className="min-h-screen flex items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">INTRO</h2>
            <p className="text-xl">
              Introduction content about StarkWager goes here...
            </p>
          </div>
        </section>
        <SecondSection />

        {/* How It Works Section */}
        <section id="how-it-works" className="min-h-screen flex items-center">
          <HowItWorks />
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">CONTACT</h2>
            <p className="text-xl">Contact information and form goes here...</p>
          </div>
        </section>

        <HowItWorks />

        {/* Impact section  */}
        <Impact />

        {/* footer */}
        <Footer />
      </main>
    </div>
  );
}
