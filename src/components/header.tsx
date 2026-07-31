"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Close, Menu } from "@carbon/icons-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { GapCheckModal } from "./gap-check-modal";

const menuItems = [
  { name: "Platform", href: "/platform" },
  { name: "Services", href: "/services" },
  { name: "Frameworks", href: "/frameworks" },
  { name: "Calculator", href: "/calculator" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
];

const serviceSubItems = [
  { name: "Governance Services", href: "/services/governance" },
  { name: "AI Governance (EU AI Act)", href: "/services/ai-governance", badge: "High-Growth" },
  { name: "Audit Support & Defense", href: "/services/audit-support" },
  { name: "Security Operations & vCISO", href: "/services/security-operations" },
  { name: "Technical Security Assessments", href: "/services/technical-security-assessments" },
];

export function Header() {
  const pathname = usePathname();
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="fixed z-30 w-full px-2 top-0 left-0"
      >
        <div
          className={cn(
            "mx-auto mt-3 max-w-6xl px-6 transition-all duration-300 lg:px-8",
            isScrolled
              ? "bg-white/80 max-w-5xl rounded-2xl border border-line shadow-lg shadow-navy/5 backdrop-blur-md py-1.5"
              : "bg-white/40 backdrop-blur-sm rounded-2xl border border-line/60 py-2"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Trust Governance Solutions — home"
              className="flex items-center shrink-0"
            >
              <Logo />
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-5 text-sm font-bold">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === "/services" && pathname.startsWith("/services"));
                  const isServices = item.href === "/services";

                  if (isServices) {
                    return (
                      <li
                        key={item.href}
                        className="relative"
                        onMouseEnter={() => setIsServicesHovered(true)}
                        onMouseLeave={() => setIsServicesHovered(false)}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "inline-flex items-center gap-1 transition-colors duration-150 py-1 px-2 rounded-lg text-body hover:text-brand-deep",
                            isActive && "bg-brand-soft text-brand-deeper font-extrabold"
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                        </Link>

                        {/* Services Dropdown */}
                        {isServicesHovered && (
                          <div className="absolute top-full left-0 mt-1 w-64 rounded-2xl border border-line bg-white p-3 shadow-xl space-y-1">
                            <Link
                              href="/services"
                              className="block p-2 rounded-xl text-xs font-black text-ink hover:bg-mist hover:text-brand-deep border-b border-line pb-2 mb-1"
                            >
                              All Services Overview →
                            </Link>
                            {serviceSubItems.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-body hover:bg-mist hover:text-brand-deep transition-colors"
                              >
                                <span>{sub.name}</span>
                                {sub.badge && (
                                  <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-extrabold text-navy-deep">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-colors duration-150 py-1 px-2 rounded-lg text-body hover:text-brand-deep",
                          isActive && "bg-brand-soft text-brand-deeper font-extrabold"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA Button & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:inline-flex font-bold text-xs h-9 px-4 rounded-xl"
              >
                <span>Book Free Gap Check</span>
              </Button>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-40 p-2 text-ink lg:hidden cursor-pointer rounded-lg hover:bg-mist"
              >
                {menuState ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuState && (
            <div className="mt-4 border-t border-line pt-4 pb-2 lg:hidden space-y-3 bg-white rounded-2xl p-4 shadow-xl border border-line">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href || (item.href === "/services" && pathname.startsWith("/services"));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className={cn(
                          "block py-2 px-3 rounded-xl text-sm font-bold text-body hover:bg-mist hover:text-brand-deep",
                          isActive && "bg-brand-soft text-brand-deeper font-extrabold"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-2 border-t border-line">
                <Button
                  onClick={() => {
                    setMenuState(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full font-bold text-sm h-10 rounded-xl"
                >
                  <span>Book Free Gap Check</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Gap Check Booking Modal */}
      <GapCheckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}
