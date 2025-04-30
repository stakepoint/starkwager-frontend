"use client";
import { CreateWagerProvider } from "@/contextApi/createWager.context";

export default function CreateWagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CreateWagerProvider>{children}</CreateWagerProvider>
    </div>
  );
}
