"use client";

import { motion } from "framer-motion";

/**
 * Ribbon "Domain for Sale" di pojok kiri atas — diagonal di bawah navbar,
 * bersinar dengan sweep cahaya, dan mengarah ke #kontak.
 */
export default function SaleRibbon() {
  return (
    <motion.a
      href="#kontak"
      aria-label="Domain for Sale — ajukan penawaran Anda"
      initial={{ opacity: 0, x: -48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed -left-[58px] top-[102px] z-40 w-[185px] -rotate-45 sm:-left-[54px] sm:top-[108px] sm:w-[215px]"
    >
      <span className="relative flex h-10 items-center justify-center overflow-hidden bg-[linear-gradient(115deg,oklch(0.42_0.18_27),oklch(0.56_0.21_27)_50%,oklch(0.4_0.17_27))] shadow-[0_12px_32px_-12px_oklch(0.44_0.18_27/80%)] transition-all duration-300 group-hover:brightness-110 sm:h-11">
        <span
          className="animate-ribbon-shine pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,oklch(1_0_0/0.4)_50%,transparent_70%)] bg-[length:220%_100%]"
          aria-hidden="true"
        />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white drop-shadow-sm sm:text-xs">
          Domain for Sale
        </span>
      </span>
    </motion.a>
  );
}
