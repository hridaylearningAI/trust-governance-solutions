import { ContactsClient } from "@/components/admin/contacts-client";
import type { Contact } from "@/lib/admin-types";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ContactsPage() {
  await requireProfile();
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return <ContactsClient initialContacts={(data as Contact[]) ?? []} />;
}
