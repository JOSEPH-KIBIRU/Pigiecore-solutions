import { getServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_EMAIL = process.env.EMAIL_FROM || "Pigiecore Solutions <onboarding@resend.dev>";

export async function POST(request: Request) {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { to, subject, message, pdfBase64, fileName } = body;

    if (!to || !pdfBase64) {
      return NextResponse.json({ error: "Recipient and PDF are required" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const buffer = Buffer.from(pdfBase64, "base64");

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: subject || "Your invoice from Pigiecore Solutions",
      html:
        message ||
        `<p>Hi,</p><p>Please find your invoice attached below.</p><p>Thank you for your business!</p><p>— Pigiecore Solutions</p>`,
      attachments: [
        {
          filename: fileName || "invoice.pdf",
          content: buffer,
        },
      ],
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
