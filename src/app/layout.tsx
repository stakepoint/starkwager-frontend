import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
import { ThemeProvider } from "@/components/layouts/themeProvider";
import { WalletProvider } from "@/contexts/WalletContext";

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

const SchaboCondensed = localFont({
  src: "./fonts/SCHABO-Condensed.woff2",
  variable: "--font-schabo-condensed",
  display: "swap",
});

const GeneralSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const Schabo = localFont({
  src: "./fonts/SCHABO-Condensed.otf",
  variable: "--font-schabo",
  weight: "400 900",
  style: "normal",
});

const Comedik = localFont({
  src: "./fonts/Comedik.woff2",
  variable: "--font-comedik",
  weight: "400 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Starkwager",
  description: "Welcome to Starkwager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${GeneralSans.variable} ${geistMono.variable} ${Schabo.variable} ${SchaboCondensed.variable} ${Comedik.variable} antialiased`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <WalletProvider>
              {children}
            </WalletProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
