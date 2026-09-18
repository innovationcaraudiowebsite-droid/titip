import { Building2, Users, TrendingUp, BadgeCheck, Lightbulb } from "lucide-react";

/**
 * Section artikel SEO "Tentang UMKM" — konten edukatif yang kaya kata kunci
 * (UMKM, Usaha Mikro Kecil Menengah, UMKM Indonesia) untuk membantu Google
 * & AI search memahami topik situs, sekaligus memperkuat nilai domain UMKM.id.
 */

const STATS = [
  {
    icon: Building2,
    value: "64 juta+",
    label: "Pelaku UMKM di Indonesia",
  },
  {
    icon: TrendingUp,
    value: "±61%",
    label: "Kontribusi UMKM terhadap PDB nasional",
  },
  {
    icon: Users,
    value: "±97%",
    label: "Tenaga kerja Indonesia diserap UMKM",
  },
];

const USE_CASES = [
  {
    title: "Marketplace UMKM",
    description:
      "Platform jual-beli produk UMKM online — pasar digital yang menghubungkan ribuan pelaku usaha mikro, kecil, dan menengah dengan pembeli di seluruh Indonesia.",
  },
  {
    title: "Kemitraan & Supplier UMKM",
    description:
      "Jaringan kemitraan UMKM dengan BUMN, perbankan, dan perusahaan besar — mempertemukan supplier UMKM dengan korporasi.",
  },
  {
    title: "Pembiayaan & Pinjaman UMKM",
    description:
      "Layanan pendanaan UMKM: pinjaman modal usaha mikro, KUR, fintech lending, hingga pembiayaan syariah untuk pengembangan usaha.",
  },
  {
    title: "Aplikasi Kasir & Pembukuan UMKM",
    description:
      "Software kasir (POS), pembukuan digital, dan manajemen stok yang dirancang khusus untuk kebutuhan usaha mikro dan kecil.",
  },
  {
    title: "Edukasi & Pelatihan UMKM",
    description:
      "Kursus, pelatihan, dan sertifikasi UMKM — meningkatkan kapasitas pelaku usaha dalam digitalisasi, pemasaran, dan keuangan.",
  },
  {
    title: "Ekspor & Portal Informasi UMKM",
    description:
      "Gerbang ekspor produk UMKM ke pasar global, atau portal berita, data, dan kebijakan seputar dunia UMKM Indonesia.",
  },
];

export default function SeoContent() {
  return (
    <section
      id="tentang-umkm"
      className="relative scroll-mt-20 border-y border-border/60 bg-card/30 px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Edukasi
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Tentang{" "}
            <span className="text-red-gradient">UMKM</span> Indonesia
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <strong className="font-semibold text-foreground">
              UMKM (Usaha Mikro, Kecil, dan Menengah)
            </strong>{" "}
            adalah tulang punggung ekonomi Indonesia — diatur dalam UU No. 20
            Tahun 2008 tentang Usaha Mikro, Kecil, dan Menengah, dengan
            kategori berdasarkan modal usaha dan hasil penjualan tahunan.
          </p>
        </div>

        {/* Statistik */}
        <dl className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm sm:p-7"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                <stat.icon className="size-5" strokeWidth={1.8} />
              </span>
              <dd className="mt-4 font-display text-3xl font-bold text-red-gradient sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Mengapa bernilai */}
        <article className="brand-frame mt-12 rounded-2xl bg-card/70 p-8 backdrop-blur-sm sm:p-10">
          <h3 className="flex items-center gap-3 font-display text-xl font-bold text-foreground sm:text-2xl">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
              <BadgeCheck className="size-4.5" strokeWidth={1.8} />
            </span>
            Mengapa Domain UMKM.id Sangat Bernilai?
          </h3>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              <strong className="font-semibold text-foreground">
                UMKM.id
              </strong>{" "}
              adalah domain premium Indonesia berakhiran{" "}
              <strong className="font-semibold text-foreground">
                .id
              </strong>{" "}
              — ekstensi resmi negara Republik Indonesia yang dikelola PANDI
              (Pengelola Nama Domain Internet Indonesia). Nama{" "}
              <em>umkm</em> adalah kata yang paling langsung dikenali oleh
              64 juta+ pelaku usaha di Indonesia, dan{" "}
              <strong className="font-semibold text-foreground">
                hanya ada satu UMKM.id di dunia
              </strong>
              .
            </p>
            <p>
              Dengan panjang hanya{" "}
              <strong className="font-semibold text-foreground">
                4 karakter
              </strong>
              , mudah diketik, mudah diingat, dan lugas — UMKM.id termasuk
              kelas domain terlangka: kombinasi kata kunci nasional generik
              dengan TLD negara. Domain seperti ini tidak dapat dibuat ulang
              atau digantikan — kehadirannya secara instan memberikan
              kredibilitas dan kepercayaan kepada pengunjung.
            </p>
          </div>
        </article>

        {/* Potensi penggunaan */}
        <article className="mt-12">
          <h3 className="flex items-center gap-3 font-display text-xl font-bold text-foreground sm:text-2xl">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
              <Lightbulb className="size-4.5" strokeWidth={1.8} />
            </span>
            Potensi Penggunaan UMKM.id
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Satu nama yang mencakup seluruh ekosistem usaha mikro, kecil, dan
            menengah — cocok untuk berbagai model bisnis digital berikut:
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((use) => (
              <li
                key={use.title}
                className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30"
              >
                <p className="font-display text-base font-semibold text-foreground">
                  {use.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {use.description}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
