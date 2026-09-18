import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-primary/12 bg-card/30 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <a
            href="#beranda"
            className="flex items-baseline gap-0.5"
            aria-label="Kembali ke beratas — UMKM.id"
          >
            <span className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              UMKM
            </span>
            <span className="text-red-gradient font-display text-4xl font-bold tracking-tight sm:text-5xl">
              .id
            </span>
          </a>

          <div className="flex flex-col gap-1 font-display text-base italic text-muted-foreground sm:flex-row sm:items-center sm:gap-3 sm:text-lg">
            <span>Nama yang sederhana.</span>
            <span className="hidden text-primary/60 sm:inline" aria-hidden="true">
              ·
            </span>
            <span>Identitas yang kuat.</span>
            <span className="hidden text-primary/60 sm:inline" aria-hidden="true">
              ·
            </span>
            <span>Aset digital untuk peluang yang lebih besar.</span>
          </div>

          <a
            href="mailto:admin@umkm.id"
            className="group inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/8 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/15"
          >
            <Mail className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            admin@umkm.id — PT. IMKJ
          </a>
        </div>

        <div className="brand-hairline mt-12" aria-hidden="true" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 pb-2 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            <span className="font-semibold text-foreground/80">
              UMKM.id — Premium Digital Domain
            </span>{" "}
            · 1 Milyar Rupiah
          </p>
          <p>
            © {new Date().getFullYear()} PT. IMKJ. Hubungi kami untuk informasi
            dan penawaran.
          </p>
        </div>
      </div>
    </footer>
  );
}
