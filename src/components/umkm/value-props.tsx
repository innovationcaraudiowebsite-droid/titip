"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPinned, Rocket, ShieldCheck } from "lucide-react";

const REASONS = [
  {
    icon: Sparkles,
    number: "01",
    title: "Singkat dan Mudah Diingat",
    description:
      "UMKM.id terdiri dari satu kata yang sangat dikenal di Indonesia — mudah diketik, diucapkan, dan diingat oleh siapa pun.",
  },
  {
    icon: MapPinned,
    number: "02",
    title: "Relevan dengan Pasar Indonesia",
    description:
      "Istilah UMKM terhubung langsung dengan dunia usaha, kewirausahaan, perdagangan, ekonomi kerakyatan, dan pemberdayaan pelaku usaha.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Potensi Brand yang Luas",
    description:
      "Dapat dikembangkan untuk berbagai konsep digital: marketplace, direktori bisnis, platform informasi, komunitas usaha, hingga ekosistem pemberdayaan UMKM.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Identitas Digital yang Kuat",
    description:
      "Ekstensi .id memberikan positioning yang sangat dekat dengan pasar dan ekosistem bisnis Indonesia sebagai domain nasional.",
  },
];

export default function ValueProps() {
  return (
    <section id="nilai" className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_20%,oklch(0.8_0.135_82/0.06),transparent_70%)]"
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
            Nilai Premium
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Mengapa UMKM.id{" "}
            <span className="text-gold-gradient">Bernilai Premium?</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Nama domain yang kuat bukan sekadar alamat website. Dalam ekosistem
            digital, domain merupakan bagian dari{" "}
            <span className="font-semibold text-foreground">
              identitas, brand, kredibilitas, dan positioning
            </span>{" "}
            sebuah organisasi atau perusahaan.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {REASONS.map((reason, index) => (
            <motion.article
              key={reason.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: (index % 2) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_60px_-20px] hover:shadow-primary/25 sm:p-8"
            >
              <span
                className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-foreground/[0.04] transition-colors duration-500 group-hover:text-primary/10"
                aria-hidden="true"
              >
                {reason.number}
              </span>

              <div className="relative">
                <div className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/15 sm:size-14">
                  <reason.icon className="size-6 sm:size-7" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {reason.description}
                </p>
              </div>

              <div
                className="gold-hairline absolute inset-x-0 bottom-0 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
