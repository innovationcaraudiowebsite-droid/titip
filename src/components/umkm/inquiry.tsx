"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Handshake,
  SearchCheck,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: Handshake,
    title: "Hubungi Kami",
    description:
      "Kirim penawaran Anda langsung melalui email resmi admin@umkm.id.",
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

// Template email siap pakai — langsung terbuka di aplikasi email pengunjung,
// tanpa bergantung pada server/database apa pun.
const MAILTO_URL = (() => {
  const subject = "Penawaran Domain UMKM.id";
  const body = [
    "Halo Tim PT. IMKJ,",
    "",
    "Saya tertarik mengakuisisi domain premium UMKM.id.",
    "",
    "Nama:",
    "Email:",
    "Telepon:",
    "Perusahaan/Organisasi:",
    "",
    "Nilai penawaran:",
    "Rencana pengembangan UMKM.id:",
    "",
    "Terima kasih.",
  ].join("\n");
  return `mailto:admin@umkm.id?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
})();

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function Inquiry() {
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
            Sampaikan penawaran Anda langsung melalui email resmi kami. Tim
            PT. IMKJ akan menindaklanjuti untuk proses negosiasi dan
            transaksi.
          </p>
        </motion.div>

        {/* Kartu kontak email langsung */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="brand-frame mt-14 rounded-2xl bg-card/70 p-8 text-center backdrop-blur-sm sm:p-12 md:mt-16"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
            <Mail className="size-5.5" strokeWidth={1.8} />
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Hubungi
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            PT. IMKJ
          </p>

          <a
            href="mailto:admin@umkm.id"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/15"
          >
            admin@umkm.id
          </a>

          <div className="mt-8 flex justify-center">
            <Button
              asChild
              className="group h-14 rounded-xl bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_8px_32px_-8px] shadow-primary/50 transition-all duration-300 hover:shadow-[0_8px_40px_-6px] hover:shadow-primary/60 sm:h-12 sm:px-12"
            >
              <a href={MAILTO_URL}>
                <Mail className="size-5" />
                Kirim Email Penawaran
                <ArrowUpRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>

          <p className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
            Tombol ini akan membuka aplikasi email Anda dengan pesan yang
            sudah disiapkan otomatis — tanpa perlu mengisi formulir.
          </p>
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
