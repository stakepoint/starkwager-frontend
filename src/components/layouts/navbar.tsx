import { getSvgById } from "@/svgs";
import Link from "next/link";
import React from "react";

export default function AuthNavbar() {
  return (
    <nav className="bg-gray-900 flex items-center  justify-center h-[5.5rem]">
      <Link href="/">{getSvgById("appLogo", { className: "w-24" })}</Link>
    </nav>
  );
}
