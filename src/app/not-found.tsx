import Link from "next/link";

/**
 * Halaman 404 bermerek — menangani kunjungan dari URL situs lama
 * (mis. /listing/…, /terms) yang masih terindeks Google, dan
 * mengarahkannya kembali ke penawaran domain UMKM.id.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Halaman Tidak Ditemukan
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        4<span className="text-red-gradient">0</span>4
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
        Halaman yang Anda cari sudah tidak tersedia. Namun,{" "}
        <strong className="font-semibold text-foreground">
          domain premium UMKM.id
        </strong>{" "}
        kini tersedia untuk diakuisisi — 1 Milyar Rupiah, transaksi aman
        melalui notaris.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_8px_32px_-8px] shadow-primary/50 transition-all duration-300 hover:shadow-[0_8px_40px_-6px] hover:shadow-primary/60"
      >
        Lihat Penawaran UMKM.id
      </Link>
    </main>
  );
}
