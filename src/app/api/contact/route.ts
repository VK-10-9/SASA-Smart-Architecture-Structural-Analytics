import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_Wbg6J3ws_nR1yVdgsyrcECmL4JaWjbqqE");

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "info@sasa.engineer",
      subject: `Contact Form Submission from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 