import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

/**
 * FAQ UMKM.id — membantu pengunjung sekaligus membuka peluang
 * rich snippet (FAQPage) di hasil pencarian Google.
 * Konten jawaban WAJIB sama dengan JSON-LD FAQPage di src/app/page.tsx.
 */

export const FAQ_ITEMS = [
  {
    question: "Apa itu UMKM?",
    answer:
      "UMKM adalah singkatan dari Usaha Mikro, Kecil, dan Menengah — kategori usaha berdasarkan modal dan omzet menurut UU No. 20 Tahun 2008. UMKM adalah tulang punggung ekonomi Indonesia: berkontribusi sekitar 61% terhadap PDB dan menyerap sekitar 97% tenaga kerja nasional.",
  },
  {
    question: "Apa itu UMKM.id?",
    answer:
      "UMKM.id adalah domain premium Indonesia berakhiran .id yang menampilkan kata UMKM — kata yang paling dikenali oleh 64 juta+ pelaku usaha Indonesia. Hanya 4 karakter, mudah diingat, mudah diketik, dan langsung menggambarkan fokus bisnis Anda.",
  },
  {
    question: "Berapa harga domain UMKM.id?",
    answer:
      "UMKM.id ditawarkan seharga 1 Milyar Rupiah (setara Rp1.000.000.000). Harga ini mencerminkan kelangkaan domain 4 karakter dengan kata kunci nasional yang hanya ada satu di dunia.",
  },
  {
    question: "Bagaimana cara mengajukan penawaran UMKM.id?",
    answer:
      "Isi formulir penawaran di halaman ini — email Anda terkirim langsung ke admin@umkm.id. Tim PT. IMKJ akan menindaklanjuti untuk proses negosiasi harga, verifikasi, dan mekanisme transaksi domain.",
  },
  {
    question: "Apakah transaksi pembelian UMKM.id aman?",
    answer:
      "Ya, sangat aman. Seluruh proses transfer domain UMKM.id dilakukan melalui notaris, memastikan legalitas, keabsahan, dan perlindungan bagi kedua belah pihak.",
  },
  {
    question: "Siapa penjual domain UMKM.id?",
    answer:
      "UMKM.id dimiliki dan dijual oleh PT. IMKJ, badan hukum Indonesia. Kontak resmi hanya melalui email admin@umkm.id.",
  },
  {
    question: "Untuk apa saja domain UMKM.id dapat digunakan?",
    answer:
      "UMKM.id cocok untuk marketplace UMKM, platform kemitraan dan supplier UMKM, layanan pembiayaan atau pinjaman UMKM, aplikasi kasir dan pembukuan, edukasi serta pelatihan UMKM, hingga gerbang ekspor dan portal informasi UMKM Indonesia.",
  },
] as const;

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            FAQ
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pertanyaan yang{" "}
            <span className="text-red-gradient">Sering Diajukan</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Semua yang perlu Anda ketahui tentang domain premium UMKM.id —
            dari definisi UMKM hingga proses akuisisi.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-10 space-y-3 rounded-2xl border border-transparent"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card/50 px-5 backdrop-blur-sm sm:px-6"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:no-underline hover:text-primary sm:text-lg">
                <span className="flex items-center gap-3">
                  <MessageCircleQuestion className="size-5 shrink-0 text-primary/70" />
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
