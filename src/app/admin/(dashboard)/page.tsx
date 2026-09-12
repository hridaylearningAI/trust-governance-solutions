import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const { profile, userId } = await requireProfile();
  const supabase = await createClient();

  let sentQuery = supabase
    .from("sent_emails")
    .select("id, subject, status, send_mode, recipient_count, created_at, sent_by", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .limit(8);

  if (profile.role !== "admin") {
    sentQuery = sentQuery.eq("sent_by", userId);
  }

  const [{ count: contactCount }, sentResult] = await Promise.all([
    supabase.from("contacts").select("id", { count: "exact", head: true }),
    sentQuery,
  ]);

  const recent = sentResult.data ?? [];
  const totalSent = sentResult.count ?? 0;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
          Welcome, {profile.full_name}
        </h1>
        <p className="mt-1 text-sm font-medium text-body">
          Compose convertible emails with Gemini, send via Resend, and track
          delivery history.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-faint">
            Contacts
          </p>
          <p className="mt-2 text-3xl font-black text-ink">{contactCount ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-faint">
            {profile.role === "admin" ? "All sends" : "Your sends"}
          </p>
          <p className="mt-2 text-3xl font-black text-ink">{totalSent}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-faint">
            Role
          </p>
          <p className="mt-2 text-3xl font-black capitalize text-brand-deep">
            {profile.role}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/compose"
          className="inline-flex h-10 items-center rounded-xl bg-brand-deep px-4 text-sm font-extrabold text-white hover:bg-brand-deeper"
        >
          Compose email
        </Link>
        <Link
          href="/admin/contacts"
          className="inline-flex h-10 items-center rounded-xl border border-line bg-white px-4 text-sm font-extrabold text-ink hover:border-brand-deep"
        >
          Manage contacts
        </Link>
      </div>

      <section className="rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-sm font-black text-ink">Recent sends</h2>
          <Link
            href="/admin/sent"
            className="text-xs font-bold text-brand-deep hover:underline"
          >
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-sm font-medium text-body">
            No emails sent yet.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((row) => (
              <li key={row.id}>
                <Link
                  href={`/admin/sent/${row.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-mist/60"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">
                      {row.subject}
                    </p>
                    <p className="text-[11px] font-medium text-faint">
                      {row.send_mode} · {row.recipient_count} recipient
                      {row.recipient_count === 1 ? "" : "s"} ·{" "}
                      {new Date(row.created_at).toLocaleString()}
                    </p>
                  </div>
                  <StatusPill status={row.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === "sent"
      ? "bg-brand-soft text-brand-deeper"
      : status === "partial"
        ? "bg-amber-50 text-amber-800"
        : status === "failed"
          ? "bg-red-50 text-red-700"
          : "bg-mist text-body";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${styles}`}
    >
      {status}
    </span>
  );
}
