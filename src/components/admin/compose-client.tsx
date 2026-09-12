"use client";

import { useEffect, useMemo, useState } from "react";
import type { Contact, Profile } from "@/lib/admin-types";
import { Button } from "@/components/ui/button";
import { rewriteEmailAssetsForOrigin } from "@/lib/email-assets";

type Props = {
  profile: Profile;
  initialContacts: Contact[];
};

export function ComposeClient({ profile, initialContacts }: Props) {
  const [writeup, setWriteup] = useState("");
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [html, setHtml] = useState("");
  const [mode, setMode] = useState<"individual" | "bulk">("individual");
  const [toEmail, setToEmail] = useState("");
  const [toName, setToName] = useState("");
  const [pasteList, setPasteList] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [contacts] = useState(initialContacts);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewOrigin, setPreviewOrigin] = useState("http://localhost:3000");

  useEffect(() => {
    setPreviewOrigin(window.location.origin);
  }, []);

  const previewHtml = useMemo(() => {
    const fallback =
      "<p style='font-family:Arial,sans-serif;color:#43596e;padding:24px'>Generate or paste HTML to preview.</p>";
    if (!html) return fallback;
    return rewriteEmailAssetsForOrigin(html, previewOrigin);
  }, [html, previewOrigin]);

  const bulkFromPaste = useMemo(() => {
    return pasteList
      .split(/[\n,;]+/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
  }, [pasteList]);

  const selectedContacts = contacts.filter((c) => selectedIds.includes(c.id));

  useEffect(() => {
    setMessage(null);
    setError(null);
  }, [mode, writeup, subject, html]);

  async function generate() {
    setGenerating(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ writeup }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setSubject(data.subject ?? "");
      setPreheader(data.preheader ?? "");
      setHtml(data.html ?? "");
      setMessage("Draft generated. Review the preview before sending.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  function buildRecipients() {
    if (mode === "individual") {
      return [{ email: toEmail.trim().toLowerCase(), name: toName || null }];
    }
    const fromContacts = selectedContacts.map((c) => ({
      email: c.email,
      name: c.name,
    }));
    const fromPaste = bulkFromPaste.map((email) => ({ email, name: null }));
    const map = new Map<string, { email: string; name: string | null }>();
    for (const r of [...fromContacts, ...fromPaste]) {
      map.set(r.email, r);
    }
    return [...map.values()];
  }

  async function send() {
    setSending(true);
    setError(null);
    setMessage(null);
    try {
      const recipients = buildRecipients();
      const res = await fetch("/api/admin/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          html,
          writeup,
          mode,
          recipients,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");
      setMessage(
        `Sent ${data.sent} · failed ${data.failed}${
          data.resendIds?.length
            ? ` · Resend id(s): ${data.resendIds.join(", ")}`
            : ""
        }. Open Sent to review details.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed");
    } finally {
      setSending(false);
    }
  }

  function toggleContact(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-ink">
            Compose
          </h1>
          <p className="mt-1 text-sm font-medium text-body">
            Paste a write-up, generate branded HTML with Gemini, then send
            individually or in bulk. From{" "}
            <span className="font-bold text-ink">{profile.from_email}</span>,
            CC <span className="font-bold text-ink">{profile.cc_email}</span>.
          </p>
        </div>

        <section className="rounded-2xl border border-line bg-white p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-black text-ink">1. Write-up</h2>
            <Button
              type="button"
              onClick={generate}
              disabled={generating || writeup.trim().length < 20}
              className="h-9 rounded-xl bg-brand-deep px-3 text-xs font-extrabold text-white hover:bg-brand-deeper disabled:opacity-50"
            >
              {generating ? "Generating…" : "Generate with Gemini"}
            </Button>
          </div>
          <textarea
            value={writeup}
            onChange={(e) => setWriteup(e.target.value)}
            rows={8}
            placeholder="Describe the offer, proof points, audience pain, and CTA. Gemini will turn this into a conversion-ready HTML email."
            className="w-full rounded-xl border border-line bg-mist/40 px-3.5 py-3 text-sm font-medium text-ink outline-none focus:border-brand-deep"
          />
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 space-y-3">
          <h2 className="text-sm font-black text-ink">2. Subject & HTML</h2>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject line"
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-bold text-ink outline-none focus:border-brand-deep"
          />
          <input
            value={preheader}
            onChange={(e) => setPreheader(e.target.value)}
            placeholder="Preheader (optional note)"
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium text-ink outline-none focus:border-brand-deep"
          />
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={12}
            placeholder="HTML email body"
            className="w-full rounded-xl border border-line bg-mist/30 px-3.5 py-3 font-mono text-xs text-ink outline-none focus:border-brand-deep"
          />
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 space-y-4">
          <div className="flex gap-2">
            {(["individual", "bulk"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-xl px-3 py-1.5 text-xs font-extrabold capitalize ${
                  mode === m
                    ? "bg-brand-soft text-brand-deeper"
                    : "bg-mist text-body"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {mode === "individual" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                placeholder="Recipient email"
                className="rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-brand-deep"
              />
              <input
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="Recipient name (optional)"
                className="rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-brand-deep"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={pasteList}
                onChange={(e) => setPasteList(e.target.value)}
                rows={4}
                placeholder="Paste emails separated by commas or new lines"
                className="w-full rounded-xl border border-line px-3.5 py-3 text-sm font-medium outline-none focus:border-brand-deep"
              />
              <div>
                <p className="mb-2 text-xs font-extrabold text-ink">
                  Or select saved contacts ({selectedIds.length} selected)
                </p>
                <div className="max-h-48 space-y-1 overflow-y-auto rounded-xl border border-line p-2">
                  {contacts.length === 0 ? (
                    <p className="px-2 py-3 text-xs font-medium text-body">
                      No contacts yet. Add some on the Contacts page.
                    </p>
                  ) : (
                    contacts.map((c) => (
                      <label
                        key={c.id}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-mist"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(c.id)}
                          onChange={() => toggleContact(c.id)}
                        />
                        <span className="text-xs font-bold text-ink">
                          {c.name || c.email}
                        </span>
                        <span className="text-[11px] font-medium text-faint">
                          {c.email}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            type="button"
            onClick={send}
            disabled={sending || !subject || !html}
            className="h-11 w-full rounded-xl bg-navy px-4 text-sm font-extrabold text-white hover:bg-navy-deep disabled:opacity-50"
          >
            {sending ? "Sending…" : `Send ${mode} email`}
          </Button>
        </section>

        {message ? (
          <p className="rounded-xl border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-bold text-brand-deeper">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </p>
        ) : null}
      </div>

      <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
        <h2 className="text-sm font-black text-ink">Live preview</h2>
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="border-b border-line bg-mist px-4 py-2 text-[11px] font-bold text-body">
            {subject || "Subject preview"}
            {preheader ? (
              <span className="font-medium text-faint"> — {preheader}</span>
            ) : null}
          </div>
          <iframe
            title="Email preview"
            sandbox="allow-same-origin allow-popups"
            srcDoc={previewHtml}
            className="h-[70vh] w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
