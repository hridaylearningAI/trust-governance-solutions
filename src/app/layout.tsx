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

// Runs before first paint: flags first-time visits on <html> so the page
// content stays hidden (see globals.css) until the intro video finishes.
// Skipped for returning visitors (per session) and reduced-motion users.
const introScript = `try{if(!sessionStorage.getItem("tgs-intro-seen")&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-intro","")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", geist.variable)}
      // The pre-paint intro script below sets `data-intro` on <html> before
      // hydration, so this attribute mismatch is expected and intentional.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {children}
      </body>
    </html>
  );
}
