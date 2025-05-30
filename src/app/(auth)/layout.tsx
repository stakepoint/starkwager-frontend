import AuthNavbar from "@/components/layouts/navbar";
import React, { type ReactNode } from "react";

export default function authlayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <AuthNavbar />
      {children}
    </section>
  );
}
