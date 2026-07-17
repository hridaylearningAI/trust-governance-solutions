import { Logo } from "./logo";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Gap check", href: "#get-started" },
      { label: "Sample report", href: "#get-started" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "mailto:hello@trustgovernance.co" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="about" className="scroll-mt-24 bg-navy-deep">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-[30ch] text-[15px] font-medium leading-relaxed text-[#a9bccb]">
              Helping software vendors pass enterprise compliance reviews
              faster and with confidence.
            </p>
          </div>
          {columns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#8ba3b8]">
                {heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[15px] font-semibold text-white/85 transition-colors hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-line-dark pt-6 text-sm font-semibold text-[#a9bccb]">
          <span>© 2026 Trust Governance Solutions</span>
          <span aria-hidden="true">·</span>
          <a
            href="mailto:hello@trustgovernance.co"
            className="transition-colors hover:text-white"
          >
            hello@trustgovernance.co
          </a>
        </div>
      </div>
    </footer>
  );
}
