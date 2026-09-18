"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Gem, Mail, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "umkm-id-sale-popup-dismissed";

/**
 * Popup "Domain for Sale" — muncul sekali per sesi setelah 2,4 detik.
 * Menampilkan harga, CTA ke formulir kontak (mailto), dan dapat ditutup
 * melalui tombol X, klik latar, atau tombol Escape.
 */
export default function SalePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage tidak tersedia — tetap tampilkan popup.
    }
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Abaikan — popup hanya akan muncul lagi pada kunjungan berikutnya.
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
          {/* Latar belakang */}
          <motion.button
            type="button"
            aria-label="Tutup popup"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 cursor-default bg-[oklch(0.21_0.012_25/55%)] backdrop-blur-sm"
          />

          {/* Kartu popup */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sale-popup-title"
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="brand-frame relative w-full max-w-md overflow-hidden rounded-2xl bg-card text-center shadow-2xl"
          >
            {/* Pita header */}
            <div className="relative flex items-center justify-center gap-2 overflow-hidden bg-[linear-gradient(115deg,oklch(0.42_0.18_27),oklch(0.56_0.21_27)_50%,oklch(0.4_0.17_27))] py-3">
              <span
                className="animate-ribbon-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,oklch(1_0_0/0.35)_50%,transparent_70%)] bg-[length:220%_100%]"
                aria-hidden="true"
              />
              <Tag className="size-4 text-white" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white sm:text-sm">
                Domain for Sale
              </span>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Tutup popup"
              className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
            >
              <X className="size-4.5" />
            </button>

            <div className="flex flex-col items-center px-6 py-8 sm:px-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Domain Premium
              </span>

              <h3
                id="sale-popup-title"
                className="text-red-gradient mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl"
              >
                UMKM.id
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
                Kini tersedia untuk diakuisisi — satu kesempatan untuk satu
                pemilik.
              </p>

              <div className="plaque-dark mt-6 flex w-full flex-col items-center gap-0.5 rounded-xl px-4 py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  Harga Penawaran
                </span>
                <span className="text-red-gradient-bright font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  1 Milyar Rupiah
                </span>
                <span className="font-display text-sm italic text-white/55">
                  setara Rp1.000.000.000
                </span>
              </div>

              <Button
                asChild
                className="mt-7 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[0_8px_32px_-8px] shadow-primary/50 transition-all duration-300 hover:shadow-[0_8px_40px_-6px] hover:shadow-primary/60"
              >
                <a href="#kontak" onClick={close}>
                  <Gem className="size-4.5" />
                  Ajukan Penawaran
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-3 h-11 w-full rounded-xl border-primary/30 bg-transparent text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
              >
                <a href="mailto:admin@umkm.id?subject=Penawaran%20Domain%20UMKM.id">
                  <Mail className="size-4" />
                  admin@umkm.id
                </a>
              </Button>

              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Transaksi aman melalui notaris — PT. IMKJ.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
