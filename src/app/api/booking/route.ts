import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, service, budget, timeline, email, phone } = await req.json();

    if (!name || !service || !budget || !timeline || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const timestamp = new Date().toLocaleString();

    await transporter.sendMail({
      from: `"UmarDev Booking" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER || "umarfarooq5743@gmail.com",
      replyTo: email,
      subject: `New Project Booking — ${service}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #020408; color: #fff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
          <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 2px;">UMARDEV</h1>
            <p style="margin: 8px 0 0; opacity: 0.8; font-size: 13px;">AI Chatbot Project Booking</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Client Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #fff; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Service Type</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #3b82f6; font-weight: 600;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Budget Range</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #10b981;">${budget}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Timeline</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #fff;">${timeline}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email Address</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #60a5fa;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Phone / WhatsApp</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #fff;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Timestamp</td>
                <td style="padding: 12px 0; color: rgba(255,255,255,0.3); font-size: 12px;">${timestamp}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 20px 32px; background: rgba(255,255,255,0.02); text-align: center; font-size: 12px; color: rgba(255,255,255,0.25); border-top: 1px solid rgba(255,255,255,0.05);">
            UmarDev — Digital Innovation Hub
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { error: "Failed to process booking. Please try again." },
      { status: 500 }
    );
  }
}
