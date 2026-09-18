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

export const metadata: Metadata = {
  title: "UMKM.id — Domain Premium untuk Ekosistem UMKM Indonesia",
  description:
    "UMKM.id adalah domain premium yang merepresentasikan ekosistem Usaha Mikro, Kecil, dan Menengah Indonesia. Satu Nama. Satu Identitas. Potensi Digital yang Besar. Ditawarkan seharga 1 Milyar Rupiah.",
  keywords: [
    "UMKM.id",
    "domain premium",
    "domain Indonesia",
    "UMKM",
    "domain .id",
    "akuisisi domain",
    "PT. IMKJ",
  ],
  authors: [{ name: "PT. IMKJ" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "UMKM.id — Premium Digital Domain",
    description:
      "Satu Nama. Satu Identitas. Potensi Digital yang Besar. Domain premium untuk ekosistem UMKM Indonesia — kini ditawarkan seharga 1 Milyar Rupiah.",
    siteName: "UMKM.id",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMKM.id — Premium Digital Domain",
    description:
      "Domain premium untuk ekosistem UMKM Indonesia. Hubungi PT. IMKJ untuk informasi dan penawaran.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0b08",
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
