import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseCsv(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const split = (line: string) => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        cells.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    cells.push(current.trim());
    return cells;
  };

  const header = split(lines[0]).map((h) => h.toLowerCase());
  const emailIdx = header.findIndex((h) => h === "email" || h === "e-mail");
  const nameIdx = header.findIndex((h) => h === "name" || h === "full_name");
  const companyIdx = header.findIndex((h) => h === "company" || h === "org");

  const start = emailIdx >= 0 ? 1 : 0;
  const rows: Array<{ email: string; name: string | null; company: string | null }> =
    [];

  for (let i = start; i < lines.length; i++) {
    const cells = split(lines[i]);
    const email =
      emailIdx >= 0
        ? cells[emailIdx]
        : cells.find((c) => isValidEmail(c.toLowerCase())) ?? "";
    const normalized = email.trim().toLowerCase();
    if (!isValidEmail(normalized)) continue;
    rows.push({
      email: normalized,
      name:
        nameIdx >= 0 && cells[nameIdx]
          ? cells[nameIdx]
          : emailIdx < 0 && cells[0] && !isValidEmail(cells[0])
            ? cells[0]
            : null,
      company: companyIdx >= 0 ? cells[companyIdx] || null : null,
    });
  }

  return rows;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  let rows: Array<{ email: string; name: string | null; company: string | null }> =
    [];

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as {
      contacts?: Array<{ email?: string; name?: string; company?: string }>;
      csv?: string;
    };
    if (body.csv) {
      rows = parseCsv(body.csv);
    } else if (Array.isArray(body.contacts)) {
      rows = body.contacts
        .map((c) => ({
          email: (c.email ?? "").trim().toLowerCase(),
          name: c.name?.trim() || null,
          company: c.company?.trim() || null,
        }))
        .filter((c) => isValidEmail(c.email));
    }
  } else {
    const form = await request.formData();
    const file = form.get("file");
    if (file instanceof File) {
      rows = parseCsv(await file.text());
    } else if (typeof form.get("csv") === "string") {
      rows = parseCsv(String(form.get("csv")));
    }
  }

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "No valid contacts found to import." },
      { status: 400 }
    );
  }

  const unique = new Map<string, (typeof rows)[number]>();
  for (const row of rows) unique.set(row.email, row);

  const payload = [...unique.values()].map((row) => ({
    ...row,
    created_by: user.id,
    updated_at: new Date().toISOString(),
    tags: [] as string[],
  }));

  const { data, error } = await supabase
    .from("contacts")
    .upsert(payload, { onConflict: "email" })
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ imported: data?.length ?? 0 });
}
