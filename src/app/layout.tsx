import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://www.trustgovernance.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trust Governance Solutions — Vendor Compliance, Handled.",
    template: "%s | Trust Governance Solutions",
  },
  description:
    "Pass enterprise security reviews before they start. TGS scans your stack, fixes compliance gaps, and issues a single buyer-ready report accepted as-is.",
  keywords: [
    "vendor compliance",
    "SOC 2 automation",
    "ISO 27001 compliance",
    "GDPR attestation",
    "HIPAA compliance software",
    "enterprise security review",
    "security questionnaire automation",
    "continuous drift monitoring",
    "reusable compliance report",
  ],
  authors: [{ name: "Trust Governance Solutions", url: siteUrl }],
  creator: "Trust Governance Solutions",
  publisher: "Trust Governance Solutions",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Trust Governance Solutions — Vendor Compliance, Handled.",
    description:
      "Pass enterprise compliance reviews before they even start. One continuously-monitored compliance report that enterprise buyers accept as-is.",
    siteName: "Trust Governance Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Governance Solutions — Vendor Compliance, Handled.",
    description:
      "Pass enterprise compliance reviews before they even start. Single reusable attestation report for SOC 2, ISO 27001, and GDPR.",
    creator: "@trustgovernance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
