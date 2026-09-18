import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

/**
 * API kirim penawaran domain UMKM.id → admin@umkm.id
 *
 * Strategi pengiriman (otomatis sesuai env yang terisi):
 *  1. SMTP  — SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS (mailbox domain sendiri)
 *  2. RESEND_API_KEY — via HTTP API Resend
 *  3. Fallback — kembalikan mailtoUrl sehingga frontend membuka aplikasi email
 *     pengunjung yang sudah terisi penuh (tetap berfungsi tanpa konfigurasi).
 */

const RECIPIENT = "admin@umkm.id";

const offerSchema = z.object({
  kategori: z.enum([
    "Investor",
    "Institusi",
    "Startup",
    "Marketplace",
    "Organisasi",
  ]),
  nama: z.string().trim().min(2, "Nama terlalu pendek").max(120),
  email: z.string().trim().email("Email tidak valid").max(160),
  telepon: z.string().trim().max(40).optional().or(z.literal("")),
  perusahaan: z.string().trim().max(160).optional().or(z.literal("")),
  nilai: z.string().trim().max(80).optional().or(z.literal("")),
  pesan: z.string().trim().min(10, "Pesan minimal 10 karakter").max(4000),
  // Honeypot anti-bot: harus kosong (manusia tidak melihat field ini)
  website: z.string().max(0).optional().or(z.literal("")),
});

type OfferData = z.infer<typeof offerSchema>;

/* ----------------------------- Rate limiting ----------------------------- */

const MAX_HITS = 3; // maksimal pengiriman
const WINDOW_MS = 15 * 60 * 1000; // per 15 menit per IP

function getHits(): Map<string, number[]> {
  const g = globalThis as typeof globalThis & {
    __umkmOfferHits?: Map<string, number[]>;
  };
  g.__umkmOfferHits ??= new Map<string, number[]>();
  return g.__umkmOfferHits;
}

function isRateLimited(ip: string): boolean {
  const hits = getHits();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/* ----------------------------- Email template ---------------------------- */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailBody(data: OfferData): { text: string; html: string } {
  const rows: Array<[string, string]> = [
    ["Kategori", data.kategori],
    ["Nama", data.nama],
    ["Email", data.email],
    ["Telepon/WA", data.telepon || "—"],
    ["Perusahaan/Organisasi", data.perusahaan || "—"],
    ["Nilai Penawaran", data.nilai || "—"],
  ];

  const text = [
    "PENAWARAN DOMAIN UMKM.ID",
    "========================",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Pesan:",
    data.pesan,
    "",
    "------------------------",
    "Dikirim melalui formulir umkm.id",
  ].join("\n");

  const html = `
<div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;border:1px solid #e5e0da;border-radius:12px;overflow:hidden">
  <div style="background:linear-gradient(115deg,#8f1d1d,#c53030);padding:20px 28px;color:#fff">
    <div style="font-size:11px;letter-spacing:.25em;text-transform:uppercase;opacity:.85">Penawaran Domain</div>
    <div style="font-size:26px;font-weight:700;margin-top:4px">UMKM.id</div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#1f2937">
    ${rows
      .map(
        ([k, v], i) => `
    <tr style="${i % 2 ? "background:#faf7f5;" : ""}">
      <td style="padding:10px 28px;color:#6b7280;width:210px;vertical-align:top">${k}</td>
      <td style="padding:10px 28px 10px 0;font-weight:600">${escapeHtml(v)}</td>
    </tr>`
      )
      .join("")}
    <tr>
      <td colspan="2" style="padding:18px 28px 6px;color:#6b7280;border-top:1px solid #e5e0da">Pesan</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 28px 24px;line-height:1.7;white-space:pre-wrap">${escapeHtml(
        data.pesan
      )}</td>
    </tr>
  </table>
  <div style="background:#faf7f5;padding:14px 28px;font-size:12px;color:#9ca3af;font-family:Arial,sans-serif">
    Email ini dikirim otomatis dari formulir kontak umkm.id • PT. IMKJ
  </div>
</div>`.trim();

  return { text, html };
}

/* ------------------------------ Mailto URL ------------------------------- */

function buildMailtoUrl(data: OfferData): string {
  const subject = `Penawaran Domain UMKM.id — ${data.kategori} — ${data.nama}`;
  const body = [
    "Halo Tim PT. IMKJ,",
    "",
    "Saya tertarik mengakuisisi domain premium UMKM.id. Berikut data saya:",
    "",
    `Kategori: ${data.kategori}`,
    `Nama: ${data.nama}`,
    `Email: ${data.email}`,
    `Telepon/WA: ${data.telepon || "-"}`,
    `Perusahaan/Organisasi: ${data.perusahaan || "-"}`,
    `Nilai penawaran: ${data.nilai || "-"}`,
    "",
    "Pesan:",
    data.pesan,
    "",
    "Terima kasih.",
  ].join("\n");
  return `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/* ------------------------------ Kirim email ------------------------------ */

interface SendResult {
  delivered: boolean;
  provider: "smtp" | "resend" | "none";
  error?: string;
}

async function sendViaSmtp(data: OfferData): Promise<SendResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return { delivered: false, provider: "none" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : port === 465,
      auth: { user, pass },
    });

    const { text, html } = buildEmailBody(data);
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `UMKM.id <${user}>`,
      to: RECIPIENT,
      replyTo: data.email,
      subject: `Penawaran Domain UMKM.id — ${data.kategori} — ${data.nama}`,
      text,
      html,
    });
    return { delivered: true, provider: "smtp" };
  } catch (err) {
    console.error("[offer] SMTP gagal:", err);
    return {
      delivered: false,
      provider: "smtp",
      error: "Gagal mengirim melalui SMTP",
    };
  }
}

async function sendViaResend(data: OfferData): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { delivered: false, provider: "none" };

  try {
    const { text, html } = buildEmailBody(data);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "UMKM.id <onboarding@resend.dev>",
        to: [RECIPIENT],
        reply_to: data.email,
        subject: `Penawaran Domain UMKM.id — ${data.kategori} — ${data.nama}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[offer] Resend gagal:", res.status, await res.text());
      return { delivered: false, provider: "resend", error: "Resend error" };
    }
    return { delivered: true, provider: "resend" };
  } catch (err) {
    console.error("[offer] Resend error:", err);
    return { delivered: false, provider: "resend", error: "Resend error" };
  }
}

/* -------------------------------- Handler -------------------------------- */

export async function POST(request: NextRequest) {
  // Rate limit per IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Terlalu banyak pengiriman. Silakan coba lagi dalam 15 menit atau kirim manual ke admin@umkm.id.",
      },
      { status: 429 }
    );
  }

  // Parse & validasi
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  const parsed = offerSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message || "Data tidak valid." },
      { status: 422 }
    );
  }

  const data = parsed.data;
  // Honeypot terisi → bot. Jawab sukses palsu agar bot tidak mencoba lagi.
  if (data.website) {
    return NextResponse.json({ ok: true, delivered: true, provider: "smtp" });
  }

  // 1) SMTP → 2) Resend → 3) fallback mailto
  const smtp = await sendViaSmtp(data);
  const result = smtp.provider === "none" ? await sendViaResend(data) : smtp;

  if (result.delivered) {
    return NextResponse.json({
      ok: true,
      delivered: true,
      provider: result.provider,
    });
  }

  // Tidak terkirim otomatis → serahkan mailto agar tetap "langsung kirim"
  return NextResponse.json({
    ok: true,
    delivered: false,
    provider: "none",
    mailtoUrl: buildMailtoUrl(data),
    error: result.error,
  });
}
