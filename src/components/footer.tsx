import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    heading: "Platform",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "100+ Integrations", href: "/platform#integrations" },
      { label: "24/7 Continuous Scan", href: "/platform#monitoring" },
      { label: "Timeline Calculator", href: "/calculator" },
      { label: "3-Week Timeline", href: "/how-it-works" },
    ],
  },
  {
    heading: "Frameworks",
    links: [
      { label: "SOC 2 Type II", href: "/frameworks#soc2" },
      { label: "ISO 27001", href: "/frameworks#iso27001" },
      { label: "GDPR / EU Privacy", href: "/frameworks#gdpr" },
      { label: "HIPAA Security", href: "/frameworks#hipaa" },
      { label: "Custom Buyer Checklists", href: "/frameworks#checklists" },
    ],
  },
  {
    heading: "Solutions & Pricing",
    links: [
      { label: "Vendor Compliance Pricing", href: "/pricing" },
      { label: "Startup Plan", href: "/pricing#startup" },
      { label: "Enterprise Scale Plan", href: "/pricing#enterprise" },
      { label: "Book Free Gap Check", href: "/pricing#gap-check" },
      { label: "ROI Calculator", href: "/calculator" },
    ],
  },
  {
    heading: "Company & Legal",
    links: [
      { label: "About TGS", href: "/" },
      { label: "Contact Us", href: "mailto:hello@trustgovernance.co" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security & Trust Center", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="about" className="scroll-mt-24 bg-navy-deep">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo variant="light" size="lg" />
            <p className="mt-4 text-xs font-medium leading-relaxed text-[#a9bccb]">
              Helping software vendors pass enterprise compliance reviews faster with
              a single, reusable compliance report enterprise buyers accept as-is.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-bold text-brand-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              All Systems Operational
            </div>
          </div>

          {columns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#8ba3b8]">
                {heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs font-semibold text-white/80 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line-dark pt-6 text-xs font-semibold text-[#a9bccb]">
          <span>© 2026 Trust Governance Solutions Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@trustgovernance.co"
              className="transition-colors hover:text-white"
            >
              hello@trustgovernance.co
            </a>
            <span aria-hidden="true">·</span>
            <Link href="/" className="text-brand hover:underline">
              Back to Home ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
