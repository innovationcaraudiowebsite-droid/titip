"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, User2, Building2, MessageSquare, Send, Loader2, Handshake, SearchCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(120, "Nama terlalu panjang"),
  email: z.string().email("Format email tidak valid"),
  phone: z
    .string()
    .max(32, "Nomor telepon terlalu panjang")
    .optional()
    .or(z.literal("")),
  organization: z
    .string()
    .max(160, "Nama organisasi terlalu panjang")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

const STEPS = [
  {
    icon: Handshake,
    title: "Hubungi Kami",
    description:
      "Sampaikan minat akuisisi Anda melalui formulir atau email resmi.",
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
    description:
      "Proses transfer domain dilakukan melalui notaris.",
  },
];

export default function Inquiry() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", phone: "", organization: "", message: "" },
  });

  // Jalur email langsung ke admin@umkm.id — dipakai sebagai cadangan bila
  // server tidak dapat menerima penawaran (mis. database tidak tersedia).
  const buildMailto = (values: InquiryFormValues): string => {
    const subject = `Penawaran Domain UMKM.id — ${values.name}`;
    const body = [
      `Nama: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Telepon: ${values.phone}` : null,
      values.organization
        ? `Perusahaan/Organisasi: ${values.organization}`
        : null,
      "",
      "Pesan:",
      values.message,
      "",
      "— Dikirim melalui formulir di umkm.id",
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
    return `mailto:admin@umkm.id?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (values: InquiryFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        if (res.status >= 500) {
          setFallbackMailto(buildMailto(values));
        }
        throw new Error(data?.error ?? "Terjadi kesalahan. Silakan coba lagi.");
      }
      setFallbackMailto(null);
      toast({
        title: "Penawaran terkirim",
        description:
          "Terima kasih. Tim PT. IMKJ akan menghubungi Anda melalui email.",
      });
      reset();
    } catch {
      // Kesalahan jaringan/server: tawarkan jalur email langsung.
      setFallbackMailto(buildMailto(values));
      toast({
        title: "Gagal mengirim",
        description:
          "Silakan gunakan tombol kirim email langsung di bawah formulir.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontak"
      className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_15%_30%,oklch(0.54_0.21_27/0.04),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
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
            Untuk informasi lebih lanjut mengenai proses penawaran, negosiasi,
            dan mekanisme transaksi domain, silakan hubungi kami.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-5 lg:gap-10">
          {/* Contact info + process */}
          <motion.aside
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="brand-frame rounded-2xl bg-card/70 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Hubungi
              </p>
              <p className="mt-3 font-display text-2xl font-bold text-foreground">
                PT. IMKJ
              </p>
              <a
                href="mailto:admin@umkm.id"
                className="group mt-4 inline-flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/8 px-4 py-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/15"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Mail className="size-4.5" />
                </span>
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Email Resmi
                  </span>
                  <span className="block text-sm font-semibold text-primary">
                    admin@umkm.id
                  </span>
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Silakan menghubungi kami untuk mendapatkan informasi lebih
                lanjut mengenai <span className="font-semibold text-foreground">UMKM.id</span> dan
                proses akuisisinya.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Alur Akuisisi
              </p>
              <ol className="mt-5 flex flex-col gap-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4">
                    {index < STEPS.length - 1 && (
                      <span
                        className="absolute left-[18px] top-11 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/40 to-transparent"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                      <step.icon className="size-4" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {index + 1}. {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="brand-frame rounded-2xl bg-card/70 p-6 backdrop-blur-sm sm:p-8"
              aria-label="Formulir penawaran akuisisi domain"
            >
              <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                Formulir Penawaran
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Isi data di bawah ini dan tim kami akan menindaklanjuti
                penawaran Anda.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nama Lengkap <span className="text-primary">*</span>
                  </Label>
                  <div className="relative">
                    <User2 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Nama Anda"
                      autoComplete="name"
                      className="h-11 rounded-xl border-input bg-background/60 pl-10 focus-visible:ring-primary/50"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p role="alert" className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-primary">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@perusahaan.com"
                      autoComplete="email"
                      className="h-11 rounded-xl border-input bg-background/60 pl-10 focus-visible:ring-primary/50"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p role="alert" className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Nomor Telepon
                  </Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 8xx xxxx xxxx (opsional)"
                      autoComplete="tel"
                      className="h-11 rounded-xl border-input bg-background/60 pl-10 focus-visible:ring-primary/50"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p role="alert" className="text-xs text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="organization" className="text-sm font-medium">
                    Perusahaan / Organisasi
                  </Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="organization"
                      placeholder="Nama perusahaan (opsional)"
                      autoComplete="organization"
                      className="h-11 rounded-xl border-input bg-background/60 pl-10 focus-visible:ring-primary/50"
                      aria-invalid={!!errors.organization}
                      {...register("organization")}
                    />
                  </div>
                  {errors.organization && (
                    <p role="alert" className="text-xs text-destructive">
                      {errors.organization.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Pesan Penawaran <span className="text-primary">*</span>
                  </Label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3.5 top-4 size-4 text-muted-foreground" />
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Sampaikan minat, nilai penawaran, dan rencana pengembangan UMKM.id Anda..."
                      className="min-h-28 resize-none rounded-xl border-input bg-background/60 pl-10 focus-visible:ring-primary/50"
                      aria-invalid={!!errors.message}
                      {...register("message")}
                    />
                  </div>
                  {errors.message && (
                    <p role="alert" className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[0_8px_32px_-8px] shadow-primary/50 transition-all duration-300 hover:shadow-[0_8px_40px_-6px] hover:shadow-primary/60 disabled:opacity-60 sm:w-auto sm:px-12"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4.5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="size-4.5" />
                    Kirim Penawaran
                  </>
                )}
              </Button>
              {fallbackMailto && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-primary/25 bg-primary/8 p-4 sm:p-5"
                >
                  <p className="text-sm font-semibold text-foreground">
                    Pengiriman online sedang tidak tersedia.
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Kirim penawaran Anda langsung ke email resmi kami — isi
                    formulir sudah disiapkan otomatis.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-3 h-11 rounded-xl border-primary/40 bg-transparent text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <a href={fallbackMailto}>
                      <Mail className="size-4" />
                      Kirim Email ke admin@umkm.id
                    </a>
                  </Button>
                </div>
              )}
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Data Anda hanya digunakan untuk keperluan proses penawaran
                UMKM.id dan tidak akan dibagikan kepada pihak lain.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
