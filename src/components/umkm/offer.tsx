"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, ArrowUpRight, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";

const AUDIENCES = [
  "Perusahaan",
  "Investor",
  "Institusi",
  "Startup",
  "Marketplace",
  "Organisasi",
];

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function CountUpPrice() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for a dramatic finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(formatRupiah(eased * 1_000_000_000));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  return (
    <span
      ref={ref}
      className="text-red-gradient-bright font-display text-[clamp(2.5rem,9vw,5.5rem)] font-bold leading-tight tracking-tight"
    >
      Rp{display}
    </span>
  );
}

export default function Offer() {
  return (
    <section
      id="penawaran"
      className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 md:py-32"
    >
      {/* Gold waves backdrop */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        aria-hidden="true"
        style={{
          backgroundImage: "url(/images/red-abstract.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,transparent_40%,oklch(0.99_0.003_40/0.92)_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Penawaran Akuisisi
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Miliki <span className="text-red-gradient">UMKM.id</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="brand-frame plaque-dark relative mt-12 overflow-hidden rounded-3xl p-8 text-center sm:p-12 md:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage: "url(/images/red-abstract.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2 text-white/60">
                <span className="font-semibold text-white">Domain:</span>
                <span className="font-display font-bold text-red-light">
                  UMKM.id
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-white/60">
                <span className="font-semibold text-white">Status:</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-red-light">
                  <BadgeCheck className="size-4" />
                  Domain Premium
                </span>
              </span>
            </div>

            <div
              className="mt-8 h-px w-40 bg-[linear-gradient(90deg,transparent,oklch(0.72_0.18_30/60%),transparent)]"
              aria-hidden="true"
            />

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
              Harga Penawaran
            </p>
            <div className="mt-3">
              <CountUpPrice />
            </div>
            <p className="mt-3 font-display text-xl italic text-white/60 sm:text-2xl">
              Satu Miliar Rupiah
            </p>

            <div
              className="mt-8 h-px w-40 bg-[linear-gradient(90deg,transparent,oklch(0.72_0.18_30/60%),transparent)]"
              aria-hidden="true"
            />

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Penawaran ditujukan kepada pihak yang memiliki visi membangun{" "}
              <span className="font-semibold text-white">
                brand digital berskala nasional di bidang UMKM
              </span>
              . Akuisisi domain dapat menjadi langkah strategis untuk memiliki
              identitas digital yang sederhana, relevan, dan berpotensi
              dikembangkan dalam jangka panjang.
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {AUDIENCES.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white/85 sm:text-sm"
                >
                  {audience}
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="mt-10 h-13 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_8px_40px_-8px] shadow-primary/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_48px_-6px] hover:shadow-primary/70"
            >
              <a href="#kontak">
                <Gem className="size-4.5" />
                Hubungi PT. IMKJ
                <ArrowUpRight className="size-4.5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
