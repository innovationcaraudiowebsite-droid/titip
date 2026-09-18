import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://umkm.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "UMKM.id Dijual — Domain Premium 1 Milyar Rupiah | PT. IMKJ",
  description:
    "Domain premium UMKM.id DIJUAL (domain for sale). Nama pendek 4 karakter untuk ekosistem UMKM Indonesia — 64 juta+ pelaku usaha. Ditawarkan 1 Milyar Rupiah, transaksi aman melalui notaris. Hubungi PT. IMKJ: admin@umkm.id.",
  keywords: [
    "UMKM.id",
    "domain UMKM.id dijual",
    "domain for sale",
    "domain premium",
    "domain premium Indonesia",
    "jual domain .id",
    "beli domain premium",
    "domain 4 karakter",
    "domain singkat",
    "akuisisi domain",
    "investasi domain",
    "domain UMKM Indonesia",
    "PT. IMKJ",
  ],
  authors: [{ name: "PT. IMKJ", url: SITE_URL }],
  creator: "PT. IMKJ",
  publisher: "PT. IMKJ",
  category: "technology",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "UMKM.id Dijual — Domain Premium Indonesia",
    description:
      "Domain premium UMKM.id tersedia untuk diakuisisi. Nama pendek, kuat, dan langsung dikenali 64 juta+ pelaku UMKM Indonesia. Ditawarkan 1 Milyar Rupiah — hubungi PT. IMKJ.",
    url: "/",
    siteName: "UMKM.id",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMKM.id Dijual — Domain Premium Indonesia",
    description:
      "Domain premium UMKM.id tersedia untuk diakuisisi. Ditawarkan 1 Milyar Rupiah — hubungi PT. IMKJ: admin@umkm.id.",
  },
  // GEO: penargetan geografis Indonesia untuk mesin pencari & AI search.
  other: {
    "geo.region": "ID",
    "geo.placename": "Indonesia",
    ICBM: "-6.2088, 106.8456",
    "content-language": "id-ID",
    "revisit-after": "7 days",
    "distribution": "global",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfaf9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${sourceSans.variable} ${baskerville.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
