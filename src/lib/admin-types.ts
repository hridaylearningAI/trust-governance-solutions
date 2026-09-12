export type UserRole = "admin" | "member";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  from_email: string;
  cc_email: string;
  created_at: string;
};

export type Contact = {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  tags: string[];
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type SentEmailStatus = "queued" | "sent" | "partial" | "failed";
export type SendMode = "individual" | "bulk";

export type SentEmail = {
  id: string;
  subject: string;
  html_body: string;
  plain_writeup: string | null;
  from_email: string;
  cc_email: string | null;
  send_mode: SendMode;
  recipient_count: number;
  status: SentEmailStatus;
  resend_batch_id: string | null;
  sent_by: string;
  error_message: string | null;
  created_at: string;
};

export type SentEmailRecipient = {
  id: string;
  sent_email_id: string;
  recipient_email: string;
  recipient_name: string | null;
  resend_id: string | null;
  status: "sent" | "failed";
  error_message: string | null;
  created_at: string;
};

export type GenerateEmailResult = {
  subject: string;
  preheader: string;
  html: string;
};
