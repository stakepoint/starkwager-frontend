"use client";
import { CreateWagerProvider } from "@/contextApi/createWager.context";
import { Toaster } from "sonner";
export default function CreateWagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster />
      <CreateWagerProvider>{children}</CreateWagerProvider>
    </div>
  );
}
