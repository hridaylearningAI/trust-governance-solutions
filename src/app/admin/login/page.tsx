import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-card">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-deep">
          Trust Governance Solutions
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-ink">
          Email admin login
        </h1>
        <p className="mt-2 text-sm font-medium text-body">
          Sign in with your @tgsolutions.net account to compose and send
          campaigns.
        </p>
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-body">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
