"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Email,
  Logout,
  Pen,
  UserMultiple,
  Dashboard,
} from "@carbon/icons-react";
import type { Profile } from "@/lib/admin-types";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: Dashboard, exact: true },
  { href: "/admin/compose", label: "Compose", icon: Pen },
  { href: "/admin/contacts", label: "Contacts", icon: UserMultiple },
  { href: "/admin/sent", label: "Sent", icon: Email },
];

export function AdminShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-mist">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-navy-deep text-white lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand">
            TGS Admin
          </p>
          <p className="mt-1 text-sm font-black">Email Workspace</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors",
                  active
                    ? "bg-brand text-navy-deep"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-xs font-extrabold">{profile.full_name}</p>
          <p className="truncate text-[11px] font-medium text-white/60">
            {profile.email}
          </p>
          <p className="mt-1 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-soft">
            {profile.role}
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white/80 hover:bg-white/10"
          >
            <Logout className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-ink lg:hidden">
                TGS Email Admin
              </p>
              <p className="truncate text-xs font-medium text-body">
                From {profile.from_email} · CC {profile.cc_email}
              </p>
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={signOut}
                className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold text-body"
              >
                Sign out
              </button>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-line px-2 py-2 lg:hidden">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold",
                    active
                      ? "bg-brand-soft text-brand-deeper"
                      : "text-body hover:bg-mist"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="min-h-0 px-4 py-6 sm:px-6 lg:px-8 overscroll-y-contain">
          {children}
        </main>
      </div>
    </div>
  );
}
