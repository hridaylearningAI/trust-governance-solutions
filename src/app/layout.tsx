import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Trust Governance Solutions — Vendor compliance, handled.",
  description:
    "Compliance reports & remediation for software vendors selling into the enterprise. Pass buyer compliance reviews before they even start.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased font-sans", geist.variable)}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
