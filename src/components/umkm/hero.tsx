"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "4", label: "Karakter saja" },
  { value: "64 Jt+", label: "Pelaku UMKM Indonesia" },
  { value: ".id", label: "Identitas domain nasional" },
  { value: "No. 1", label: "Nama sektor di Nusantara" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-32"
    >
      {/* Decorative background layers */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_28%,oklch(0.54_0.21_27/0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 left-1/2 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      {/* Floating red particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="animate-float-slow absolute left-[12%] top-[30%] size-1.5 rounded-full bg-primary/70 blur-[1px]" />
        <span className="animate-float-slow absolute right-[16%] top-[24%] size-2 rounded-full bg-primary/50 blur-[1px] [animation-delay:1.2s]" />
        <span className="animate-float-slow absolute left-[24%] bottom-[26%] size-2.5 rounded-full bg-primary/40 blur-[2px] [animation-delay:2.1s]" />
        <span className="animate-float-slow absolute right-[26%] bottom-[32%] size-1.5 rounded-full bg-primary/60 blur-[1px] [animation-delay:3s]" />
        <span className="animate-float-slow absolute left-[45%] top-[18%] size-1 rounded-full bg-red-light/70 blur-[1px] [animation-delay:1.8s]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-primary shadow-[0_0_36px_-10px] shadow-primary/50 backdrop-blur-sm sm:px-7 sm:py-3 sm:text-base md:text-lg"
          >
            <span className="animate-pulse-glow inline-block size-2.5 rounded-full bg-primary sm:size-3" />
            <span className="text-shimmer-red">
              Domain Premium · Tersedia untuk Akuisisi
            </span>
            <span
              className="animate-badge-shine pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(110deg,transparent,oklch(1_0_0/0.4),transparent)]"
              aria-hidden="true"
            />
          </motion.span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-red-gradient mt-8 font-display text-[clamp(3.4rem,14vw,9rem)] font-bold leading-[0.95] tracking-tight"
        >
          UMKM<span className="font-normal">.</span>id
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-display text-xl italic text-foreground/90 sm:text-2xl md:text-[1.75rem]"
        >
          Satu Nama. Satu Identitas.
          <br className="hidden sm:block" /> Potensi Digital yang Besar.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Domain premium yang merepresentasikan salah satu sektor paling penting
          dalam perekonomian Indonesia —{" "}
          <span className="font-semibold text-foreground">
            Usaha Mikro, Kecil, dan Menengah
          </span>
          . Singkat, mudah diingat, dan langsung dipahami seluruh masyarakat
          Indonesia.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <div className="brand-frame plaque-dark flex flex-col items-center gap-1.5 rounded-2xl px-5 py-6 sm:px-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Harga Penawaran
            </span>
            <span className="text-red-gradient-bright font-display text-[2.1rem] font-bold tracking-tight sm:text-5xl md:text-[4.5rem]">
              1 Milyar Rupiah
            </span>
            <span className="font-display text-base italic text-white/55 sm:text-lg">
              setara Rp1.000.000.000
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-13 w-full rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_8px_40px_-8px] shadow-primary/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_48px_-6px] hover:shadow-primary/70 sm:w-auto"
          >
            <a href="#kontak">
              <Gem className="size-4.5" />
              Ajukan Penawaran
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 w-full rounded-full border-primary/30 bg-transparent px-8 text-base font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary sm:w-auto"
          >
            <a href="#nilai">
              Mengapa Bernilai Premium?
              <ArrowRight className="size-4.5" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 border-l border-primary/15 px-2 first:border-l-0 sm:border-l sm:first:border-l-0"
            >
              <span className="text-red-gradient font-display text-2xl font-bold sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-center text-xs leading-snug text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#nilai"
        aria-label="Gulir ke bawah"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary md:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Gulir
        </span>
        <ChevronDown className="size-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
