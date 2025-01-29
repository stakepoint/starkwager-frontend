import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const GeneralSans = localFont({
  src: [
    {
      path: "/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/GeneralSans-Italic.woff2",
      weight: "400",
      style: "Italic",
    },
    {
      path: "/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "Italic",
    },
  ],
  variable: "--font-general-sans", // Creates a CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starkwager",
  description: "Welcome to starkwager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${GeneralSans.variable} ${geistMono.variable} antialiased `}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
