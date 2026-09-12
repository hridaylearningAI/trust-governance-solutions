"use client";

import { useState } from "react";
import type { Contact } from "@/lib/admin-types";
import { Button } from "@/components/ui/button";

export function ContactsClient({
  initialContacts,
}: {
  initialContacts: Contact[];
}) {
  const [contacts, setContacts] = useState(initialContacts);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/contacts");
    const data = await res.json();
    if (res.ok) setContacts(data.contacts ?? []);
  }

  async function addContact(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setEmail("");
      setName("");
      setCompany("");
      setMessage("Contact saved.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  async function importCsv() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/contacts/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setCsv("");
      setMessage(`Imported ${data.imported} contacts.`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setBusy(false);
    }
  }

  async function onFile(file: File | null) {
    if (!file) return;
    const text = await file.text();
    setCsv(text);
  }

  async function remove(id: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-ink">Contacts</h1>
        <p className="mt-1 text-sm font-medium text-body">
          Shared team list for bulk sends. Add one-by-one or import CSV
          (`email,name,company`).
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <form
          onSubmit={addContact}
          className="space-y-3 rounded-2xl border border-line bg-white p-5"
        >
          <h2 className="text-sm font-black text-ink">Add contact</h2>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-brand-deep"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-brand-deep"
          />
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-brand-deep"
          />
          <Button
            type="submit"
            disabled={busy}
            className="h-10 rounded-xl bg-brand-deep px-4 text-xs font-extrabold text-white hover:bg-brand-deeper"
          >
            Save contact
          </Button>
        </form>

        <div className="space-y-3 rounded-2xl border border-line bg-white p-5">
          <h2 className="text-sm font-black text-ink">Import CSV</h2>
          <input
            type="file"
            accept=".csv,text/csv,text/plain"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            className="block w-full text-xs font-medium text-body"
          />
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={6}
            placeholder={"email,name,company\nceo@acme.com,Alex,Acme"}
            className="w-full rounded-xl border border-line px-3.5 py-3 font-mono text-xs outline-none focus:border-brand-deep"
          />
          <Button
            type="button"
            onClick={importCsv}
            disabled={busy || !csv.trim()}
            className="h-10 rounded-xl bg-navy px-4 text-xs font-extrabold text-white hover:bg-navy-deep"
          >
            Import
          </Button>
        </div>
      </div>

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

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="border-b border-line px-5 py-3 text-sm font-black text-ink">
          {contacts.length} contacts
        </div>
        {contacts.length === 0 ? (
          <p className="px-5 py-8 text-sm font-medium text-body">
            No contacts yet.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {contacts.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-3 px-5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">
                    {c.name || c.email}
                  </p>
                  <p className="truncate text-xs font-medium text-body">
                    {c.email}
                    {c.company ? ` · ${c.company}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(c.id)}
                  className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
