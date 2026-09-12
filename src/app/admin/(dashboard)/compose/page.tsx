import { ComposeClient } from "@/components/admin/compose-client";
import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Contact } from "@/lib/admin-types";

export default async function ComposePage() {
  const { profile } = await requireProfile();
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ComposeClient
      profile={profile}
      initialContacts={(data as Contact[]) ?? []}
    />
  );
}
