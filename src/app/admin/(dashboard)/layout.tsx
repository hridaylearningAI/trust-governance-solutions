import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireProfile();
  return <AdminShell profile={profile}>{children}</AdminShell>;
}
