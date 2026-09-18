"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Handshake,
  SearchCheck,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const KATEGORI = [
  "Investor",
  "Institusi",
  "Startup",
  "Marketplace",
  "Organisasi",
] as const;

type Kategori = (typeof KATEGORI)[number];

const STEPS = [
  {
    icon: Handshake,
    title: "Hubungi Kami",
    description:
      "Isi formulir penawaran — email Anda terkirim langsung ke admin@umkm.id.",
  },
  {
    icon: SearchCheck,
    title: "Negosiasi & Verifikasi",
    description:
      "Diskusikan penawaran, proses verifikasi, dan mekanisme transaksi domain.",
  },
  {
    icon: ShieldCheck,
    title: "Transaksi Aman",
    description: "Proses transfer domain dilakukan melalui notaris.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

interface FormState {
  kategori: Kategori | "";
  nama: string;
  email: string;
  telepon: string;
  perusahaan: string;
  nilai: string;
  pesan: string;
}

const EMPTY_FORM: FormState = {
  kategori: "",
  nama: "",
  email: "",
  telepon: "",
  perusahaan: "",
  nilai: "",
  pesan: "",
};

export default function Inquiry() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  // Honeypot anti-bot — manusia tidak mengisi field ini
  const [honeypot, setHoneypot] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.kategori) next.kategori = "Pilih kategori Anda";
    if (form.nama.trim().length < 2) next.nama = "Nama wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Email tidak valid";
    if (form.pesan.trim().length < 10)
      next.pesan = "Ceritakan penawaran Anda (minimal 10 karakter)";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    try {
      const res = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        delivered?: boolean;
        mailtoUrl?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        toast({
          title: "Gagal mengirim",
          description:
            data.error ||
            "Terjadi kendala. Silakan coba lagi atau kirim manual ke admin@umkm.id.",
          variant: "destructive",
        });
        return;
      }

      if (data.delivered) {
        // Email benar-benar terkirim otomatis ke admin@umkm.id oleh server
        setSent(true);
        toast({
          title: "Email penawaran terkirim ✓",
          description: `Penawaran Anda telah dikirim ke admin@umkm.id. Tim PT. IMKJ akan menindaklanjuti.`,
        });
      } else if (data.mailtoUrl) {
        // Fallback: buka aplikasi email pengunjung, sudah terisi otomatis
        toast({
          title: "Menyiapkan email Anda…",
          description:
            "Aplikasi email dibuka dengan pesan lengkap — cukup tekan kirim.",
        });
        window.location.href = data.mailtoUrl;
        setSent(true);
      }
    } catch {
      toast({
        title: "Koneksi bermasalah",
        description:
          "Periksa koneksi internet Anda lalu coba lagi, atau kirim manual ke admin@umkm.id.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setSent(false);
    setErrors({});
  }

  const inputCls =
    "h-11 rounded-xl border-border bg-background/80 transition-colors focus-visible:ring-primary/40";

  return (
    <section
      id="kontak"
      className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_35%,oklch(0.54_0.21_27/0.05),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Kontak Resmi
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Berminat Mengakuisisi{" "}
            <span className="text-red-gradient">UMKM.id?</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Isi formulir di bawah — penawaran Anda terkirim{" "}
            <span className="font-semibold text-foreground">
              langsung ke email resmi admin@umkm.id
            </span>
            . Tim PT. IMKJ akan segera menindaklanjuti.
          </p>
        </motion.div>

        {/* Kartu formulir penawaran */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="brand-frame mt-14 rounded-2xl bg-card/70 p-6 backdrop-blur-sm sm:p-10 md:mt-16"
        >
          {sent ? (
            /* ------------------- Panel sukses ------------------- */
            <div className="mx-auto max-w-md py-8 text-center">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex size-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary"
              >
                <CheckCircle2 className="size-8" strokeWidth={1.8} />
              </motion.span>
              <h3 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Penawaran Anda Terkirim
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Email penawaran telah dikirim ke{" "}
                <a
                  href="mailto:admin@umkm.id"
                  className="font-semibold text-primary hover:underline"
                >
                  admin@umkm.id
                </a>
                . Tim PT. IMKJ akan menghubungi Anda kembali. Terima kasih atas
                minatnya pada domain UMKM.id.
              </p>
              <Button
                variant="outline"
                onClick={resetForm}
                className="mt-8 h-11 rounded-xl border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <RotateCcw className="size-4" />
                Kirim penawaran lain
              </Button>
            </div>
          ) : (
            /* --------------------- Formulir --------------------- */
            <>
              <div className="text-center">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <Mail className="size-5.5" strokeWidth={1.8} />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Hubungi
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  PT. IMKJ
                </p>
                <a
                  href="mailto:admin@umkm.id"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/15"
                >
                  <Mail className="size-3.5" />
                  admin@umkm.id
                </a>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 space-y-5"
                aria-label="Formulir penawaran domain UMKM.id"
              >
                {/* Kategori */}
                <div>
                  <Label className="text-sm font-semibold text-foreground">
                    Saya adalah <span className="text-primary">*</span>
                  </Label>
                  <div
                    className="mt-2.5 flex flex-wrap gap-2"
                    role="group"
                    aria-label="Pilih kategori pengirim"
                  >
                    {KATEGORI.map((k) => {
                      const active = form.kategori === k;
                      return (
                        <button
                          key={k}
                          type="button"
                          aria-pressed={active}
                          onClick={() => update("kategori", k)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                            active
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_16px_-4px] shadow-primary/50"
                              : "border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-primary"
                          }`}
                        >
                          {k}
                        </button>
                      );
                    })}
                  </div>
                  {errors.kategori && (
                    <p className="mt-1.5 text-xs text-destructive">
                      {errors.kategori}
                    </p>
                  )}
                </div>

                {/* Nama + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="offer-nama"
                      className="text-sm font-semibold text-foreground"
                    >
                      Nama Lengkap <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="offer-nama"
                      value={form.nama}
                      onChange={(e) => update("nama", e.target.value)}
                      placeholder="Nama Anda"
                      autoComplete="name"
                      className={inputCls}
                      aria-invalid={!!errors.nama}
                    />
                    {errors.nama && (
                      <p className="text-xs text-destructive">{errors.nama}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="offer-email"
                      className="text-sm font-semibold text-foreground"
                    >
                      Email <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="offer-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="nama@perusahaan.com"
                      autoComplete="email"
                      className={inputCls}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Telepon + Perusahaan */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="offer-telepon"
                      className="text-sm font-semibold text-foreground"
                    >
                      Telepon / WhatsApp
                    </Label>
                    <Input
                      id="offer-telepon"
                      type="tel"
                      value={form.telepon}
                      onChange={(e) => update("telepon", e.target.value)}
                      placeholder="+62 …"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="offer-perusahaan"
                      className="text-sm font-semibold text-foreground"
                    >
                      Perusahaan / Organisasi
                    </Label>
                    <Input
                      id="offer-perusahaan"
                      value={form.perusahaan}
                      onChange={(e) => update("perusahaan", e.target.value)}
                      placeholder="Nama perusahaan (opsional)"
                      autoComplete="organization"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Nilai penawaran */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offer-nilai"
                    className="text-sm font-semibold text-foreground"
                  >
                    Nilai Penawaran
                  </Label>
                  <Input
                    id="offer-nilai"
                    value={form.nilai}
                    onChange={(e) => update("nilai", e.target.value)}
                    placeholder="misal: Rp 900 Juta / 1 Milyar Rupiah"
                    className={inputCls}
                  />
                </div>

                {/* Pesan */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="offer-pesan"
                    className="text-sm font-semibold text-foreground"
                  >
                    Pesan Penawaran <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="offer-pesan"
                    value={form.pesan}
                    onChange={(e) => update("pesan", e.target.value)}
                    placeholder="Sampaikan rencana pengembangan UMKM.id dan detail penawaran Anda…"
                    rows={5}
                    className="resize-none rounded-xl border-border bg-background/80 transition-colors focus-visible:ring-primary/40"
                    aria-invalid={!!errors.pesan}
                  />
                  {errors.pesan && (
                    <p className="text-xs text-destructive">{errors.pesan}</p>
                  )}
                </div>

                {/* Honeypot — tersembunyi dari manusia */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute size-0 opacity-0"
                />

                {/* Tombol kirim */}
                <div className="flex flex-col items-center pt-2">
                  <Button
                    type="submit"
                    disabled={sending}
                    className="group h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[0_8px_32px_-8px] shadow-primary/50 transition-all duration-300 hover:shadow-[0_8px_40px_-6px] hover:shadow-primary/60 disabled:opacity-70 sm:h-12 sm:w-auto sm:px-14"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Mengirim…
                      </>
                    ) : (
                      <>
                        <Send className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        Kirim Email Penawaran
                      </>
                    )}
                  </Button>
                  <p className="mx-auto mt-4 flex max-w-md items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
                    Klik tombol dan penawaran Anda langsung terkirim ke email
                    resmi admin@umkm.id — tanpa perlu aplikasi email tambahan.
                  </p>
                </div>
              </form>
            </>
          )}
        </motion.div>

        {/* Alur akuisisi */}
        <motion.ol
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-6 md:grid-cols-3"
          aria-label="Alur akuisisi domain"
        >
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <step.icon className="size-4.5" strokeWidth={1.8} />
                </span>
                <span className="font-display text-sm font-bold tracking-widest text-primary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 font-display text-base font-semibold text-foreground sm:text-lg">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
