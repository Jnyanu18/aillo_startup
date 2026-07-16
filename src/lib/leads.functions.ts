import { createServerFn } from "@tanstack/react-start";
import { leadInputSchema } from "./leads.schema";

// ---- Simple in-memory rate limiter (process-local, best-effort) ----
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = rateBuckets.get(key);
  if (!b || b.resetAt < now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}

// No storage anywhere, no third-party email service — a consultation request only ever
// becomes an email sent directly through the info@accelerationlogics.com mailbox's own SMTP
// (GoDaddy Workspace Email, per the domain's MX records).
async function sendLeadEmail(lead: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  socialLink?: string | null;
  serviceInterest?: string | null;
  message: string;
}) {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD;
  const to = process.env.LEAD_NOTIFY_TO || user;

  if (!user || !pass || !to) {
    console.error("[leads] MAIL_USER / MAIL_PASSWORD not configured — cannot send notification email");
    throw new Error("Email notifications are not configured yet. Please try again later.");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP_HOST || "smtpout.secureserver.net",
    port: Number(process.env.MAIL_SMTP_PORT) || 465,
    secure: true,
    auth: { user, pass },
  });

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Company", lead.company || "—"],
    ["Social link", lead.socialLink || "—"],
    ["Service interest", lead.serviceInterest || "—"],
  ];

  await transporter.sendMail({
    from: `AILO Leads <${user}>`,
    to,
    replyTo: lead.email,
    subject: `New consultation request: ${lead.name}`,
    html: `
      <h2>New consultation request</h2>
      <table cellpadding="4">
        ${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`).join("")}
      </table>
      <p><strong>Message</strong></p>
      <p>${lead.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot triggered? Pretend success.
    if (data.website && data.website.length > 0) return { ok: true as const };

    // Rate limit by email (process-local, ~5 per 5 minutes per email).
    if (!rateLimit(`email:${data.email.toLowerCase()}`, 5, 5 * 60_000)) {
      throw new Error("Too many submissions. Please try again shortly.");
    }

    try {
      await sendLeadEmail({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim(),
        company: data.company?.trim(),
        socialLink: data.socialLink?.trim(),
        serviceInterest: data.serviceInterest?.trim(),
        message: data.message.trim(),
      });
    } catch (err) {
      console.error("[leads] failed to send notification email", err);
      throw new Error("Could not send your message. Please try again.");
    }

    return { ok: true as const };
  });
