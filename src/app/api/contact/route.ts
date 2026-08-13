import { getServerClient } from "@/lib/supabase-server";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "info@pigiecore.co.ke";
const FROM_EMAIL = process.env.EMAIL_FROM || "Pigiecore Solutions <onboarding@resend.dev>";

const SERVICE_LABELS: Record<string, string> = {
  "custom-software": "Custom business software",
  "saas-platform": "SaaS platform",
  "web-application": "Web application",
  "automation-integration": "Automation / integration",
  other: "Other",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "1-2-months": "1 – 2 months",
  "3-6-months": "3 – 6 months",
  "6-plus-months": "6+ months",
};

function label(value: string | null | undefined, map: Record<string, string>) {
  return (value && map[value]) || value || "Not provided";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface EnquiryDetails {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
}

async function sendNotification(d: EnquiryDetails) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("Contact email notification skipped: RESEND_API_KEY is not set");
    return;
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const rows = [
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone || "Not provided"],
      ["Service interested in", label(d.service, SERVICE_LABELS)],
      ["Budget", d.budget || "Not provided"],
      ["Timeline", label(d.timeline, TIMELINE_LABELS)],
      ["Message", d.message],
    ]
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;vertical-align:top;">${escapeHtml(v)}</td></tr>`
      )
      .join("");

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      replyTo: d.email,
      subject: `New project enquiry from ${d.name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px;">
          <h2 style="color:#0ea5e9;margin-bottom:4px;">New Project Enquiry</h2>
          <p style="margin-top:0;color:#475569;">A client has submitted an enquiry through pigiecore.co.ke</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px;margin-top:16px;">
            ${rows}
          </table>
          <p style="margin-top:20px;font-size:13px;color:#475569;">
            Reply to the client directly at <a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>
            or manage this enquiry in the <a href="https://pigiecore.co.ke/admin">admin dashboard</a>.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
  }
}

export async function POST(request: Request) {
  const rl = rateLimit(request, "contact-form", 5, 10 * 60 * 1000);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, service, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await getServerClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone: phone ?? null,
      service: service ?? null,
      budget: budget ?? null,
      timeline: timeline ?? null,
      message,
    });

    if (error) {
      console.error("PostgreSQL insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    await sendNotification({
      name,
      email,
      phone: phone ?? null,
      service: service ?? null,
      budget: budget ?? null,
      timeline: timeline ?? null,
      message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
