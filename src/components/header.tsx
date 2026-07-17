"use client";
import Link from "next/link";
import { Close, Menu } from "@carbon/icons-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const menuItems = [
  { name: "Why TGS", href: "#why-tgs" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "About Us", href: "#about" },
];

export function Header() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-white/60 max-w-4xl rounded-2xl border border-line shadow-lg shadow-navy/5 backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="#top"
                aria-label="Trust Governance Solutions — home"
                className="flex items-center"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 text-ink lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <Close className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block font-bold text-body duration-150 hover:text-brand-deep"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-line p-6 shadow-2xl shadow-navy/10 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="block font-bold text-body duration-150 hover:text-brand-deep"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="#how-it-works"
                      onClick={() => setMenuState(false)}
                    />
                  }
                  variant="outline"
                  className={cn("font-bold", isScrolled && "lg:hidden")}
                >
                  <span>See How It Works</span>
                </Button>
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="#get-started"
                      onClick={() => setMenuState(false)}
                    />
                  }
                  className={cn("font-bold", isScrolled && "lg:hidden")}
                >
                  <span>Book a Free Gap Check</span>
                </Button>
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="#get-started"
                      onClick={() => setMenuState(false)}
                    />
                  }
                  className={cn(
                    "font-bold",
                    isScrolled ? "lg:inline-flex" : "hidden"
                  )}
                >
                  <span>Book a Free Gap Check</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
