import Navbar from "@/components/umkm/navbar";
import Hero from "@/components/umkm/hero";
import ValueProps from "@/components/umkm/value-props";
import Vision from "@/components/umkm/vision";
import Offer from "@/components/umkm/offer";
import Inquiry from "@/components/umkm/inquiry";
import Footer from "@/components/umkm/footer";
import SaleRibbon from "@/components/umkm/sale-ribbon";
import SalePopup from "@/components/umkm/sale-popup";

const SITE_URL = "https://umkm.id";

// Structured data (schema.org) — membantu Google & AI search (GEO)
// memahami bahwa UMKM.id adalah produk domain premium yang dijual.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "UMKM.id",
      inLanguage: "id-ID",
      description:
        "Domain premium UMKM.id — tersedia untuk diakuisisi dari PT. IMKJ.",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PT. IMKJ",
      url: SITE_URL,
      email: "admin@umkm.id",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ID",
      },
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#domain`,
      name: "UMKM.id — Domain Premium Indonesia",
      sku: "UMKM.ID",
      description:
        "Domain premium UMKM.id, nama pendek 4 karakter untuk ekosistem UMKM Indonesia. Dijual dengan harga 1 Milyar Rupiah, transaksi aman melalui notaris.",
      brand: { "@id": `${SITE_URL}/#organization` },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        url: SITE_URL,
        priceCurrency: "IDR",
        price: "1000000000",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": `${SITE_URL}/#organization` },
        priceValidUntil: "2027-12-31",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <Vision />
        <Offer />
        <Inquiry />
      </main>
      <Footer />
      <SaleRibbon />
      <SalePopup />
    </div>
  );
}
