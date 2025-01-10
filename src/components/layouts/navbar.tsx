import { SVG_ICONS } from "@/svgs";
import Link from "next/link";
import React from "react";

export default function AuthNavbar() {
  return (
    <nav className="bg-gray-900 flex items-center  justify-center h-[5.5rem]">
      <Link href="/">{SVG_ICONS.appLogo.svg}</Link>
    </nav>
  );
}
