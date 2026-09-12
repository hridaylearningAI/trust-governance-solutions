import Link from "next/link";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function SentEmailsPage() {
  const { profile, userId } = await requireProfile();
  const supabase = await createClient();

  let query = supabase
    .from("sent_emails")
    .select(
      "id, subject, status, send_mode, recipient_count, from_email, created_at, sent_by"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (profile.role !== "admin") {
    query = query.eq("sent_by", userId);
  }

  const { data, error } = await query;

  const senderIds = [...new Set((data ?? []).map((row) => row.sent_by))];
  const { data: senders } = senderIds.length
    ? await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", senderIds)
    : { data: [] as Array<{ id: string; full_name: string; email: string }> };

  const senderMap = new Map((senders ?? []).map((s) => [s.id, s]));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink">
          Sent emails
        </h1>
        <p className="mt-1 text-sm font-medium text-body">
          {profile.role === "admin"
            ? "All team sends across Hriday, Manav, and Admin."
            : "Your outbound sends only."}
        </p>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error.message}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        {!data?.length ? (
          <p className="px-5 py-8 text-sm font-medium text-body">
            No sends logged yet.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {data.map((row) => {
              const sender = senderMap.get(row.sent_by);
              return (
                <li key={row.id}>
                  <Link
                    href={`/admin/sent/${row.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-mist/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-ink">
                        {row.subject}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-faint">
                        {row.send_mode} · {row.recipient_count} recipient
                        {row.recipient_count === 1 ? "" : "s"} ·{" "}
                        {row.from_email}
                        {sender ? ` · by ${sender.full_name}` : ""} ·{" "}
                        {new Date(row.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                        row.status === "sent"
                          ? "bg-brand-soft text-brand-deeper"
                          : row.status === "partial"
                            ? "bg-amber-50 text-amber-800"
                            : row.status === "failed"
                              ? "bg-red-50 text-red-700"
                              : "bg-mist text-body"
                      }`}
                    >
                      {row.status}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
