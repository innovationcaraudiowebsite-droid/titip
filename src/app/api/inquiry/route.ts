import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Format permintaan tidak valid." },
        { status: 400 }
      );
    }

    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          ok: false,
          error:
            firstIssue?.message ??
            "Data yang dikirim belum lengkap atau tidak valid.",
        },
        { status: 422 }
      );
    }

    const { name, email, phone, organization, message } = parsed.data;

    let inquiry;
    try {
      inquiry = await db.inquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          organization: organization || null,
          message,
        },
        select: { id: true, createdAt: true },
      });
    } catch (dbError) {
      // Database tidak tersedia (mis. lingkungan serverless tanpa SQLite).
      console.error("[POST /api/inquiry] Database unavailable:", dbError);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Layanan penawaran online sedang tidak tersedia. Silakan hubungi kami langsung di admin@umkm.id.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/inquiry] Failed to save inquiry:", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
