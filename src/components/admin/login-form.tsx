"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const next =
    nextParam && nextParam.startsWith("/admin") ? nextParam : "/admin";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Prefer FormData so iOS/Android autofill values are included even when
      // React controlled state has not caught up yet.
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") ?? "")
        .trim()
        .toLowerCase();
      const password = String(form.get("password") ?? "");

      if (!email || !password) {
        setError("Enter your email and password.");
        return;
      }

      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setError(
          "Auth is not configured on this deployment. Missing Supabase public env vars."
        );
        return;
      }

      const supabase = createClient();
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (!data.session) {
        setError("Signed in, but no session was returned. Try again.");
        return;
      }

      // Hard navigation so auth cookies are sent on the next document request.
      // Soft client navigations often look like "nothing happened" on mobile.
      window.location.assign(next);
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-extrabold text-ink">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          defaultValue=""
          className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base font-medium text-ink outline-none focus:border-brand-deep sm:text-sm sm:py-2.5"
          placeholder="you@tgsolutions.net"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-xs font-extrabold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          defaultValue=""
          className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base font-medium text-ink outline-none focus:border-brand-deep sm:text-sm sm:py-2.5"
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-deep px-4 text-sm font-extrabold text-white transition-colors hover:bg-brand-deeper disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
