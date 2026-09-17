"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Building2,
  GraduationCap,
  Network,
  Crown,
  Quote,
} from "lucide-react";

const USE_CASES = [
  {
    icon: ShoppingBag,
    title: "Sebuah Marketplace",
    description: "Pintu masuk digital bagi jutaan pelaku usaha Indonesia.",
  },
  {
    icon: Building2,
    title: "Sebuah Direktori Bisnis",
    description: "Database terlengkap bisnis UMKM di seluruh Nusantara.",
  },
  {
    icon: GraduationCap,
    title: "Pusat Informasi & Edukasi",
    description: "Sumber pengetahuan dan pemberdayaan pelaku usaha.",
  },
  {
    icon: Network,
    title: "Sebuah Ekosistem Digital",
    description: "Menghubungkan pelaku usaha, investor, dan pasar.",
  },
  {
    icon: Crown,
    title: "Brand Nasional",
    description: "Identitas berskala nasional yang menggunakan nama UMKM.id.",
  },
];

export default function Vision() {
  return (
    <section
      id="visi"
      className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 md:py-32"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_10%_60%,oklch(0.54_0.21_27/0.04),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Visi & Fleksibilitas
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Bukan Sekadar <span className="text-red-gradient">Domain</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bayangkan sebuah platform digital yang menjadi pintu masuk bagi
            jutaan pelaku UMKM Indonesia. Nama{" "}
            <span className="font-display font-semibold text-foreground">
              UMKM.id
            </span>{" "}
            memiliki fleksibilitas untuk dikembangkan sesuai visi dan strategi
            pemiliknya.
          </p>
        </motion.div>

        <div className="mt-14 grid items-start gap-10 md:mt-16 lg:grid-cols-2 lg:gap-14">
          {/* Image side */}
          <motion.figure
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="brand-frame relative overflow-hidden rounded-2xl">
              <Image
                src="/images/umkm-vision.jpg"
                alt="Pengusaha UMKM Indonesia tersenyum percaya diri di pasar tradisional yang ramai dengan tenda merah putih"
                width={1344}
                height={768}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-lg italic text-foreground/95">
                  &ldquo;Jutaan pelaku usaha. Satu nama yang mewakili mereka
                  semua.&rdquo;
                </p>
              </figcaption>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="brand-frame mt-0 rounded-2xl bg-card/90 p-5 backdrop-blur-md sm:-mt-10 sm:ml-8 sm:p-6"
            >
              <Quote className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Nilai sebuah domain premium tidak hanya terletak pada jumlah
                karakter atau ekstensi, tetapi pada{" "}
                <span className="font-semibold text-foreground">
                  nama, relevansi, potensi brand, kemudahan diingat, dan
                  peluang pengembangan bisnis di masa depan.
                </span>
              </p>
            </motion.div>
          </motion.figure>

          {/* Use cases side */}
          <ul className="flex flex-col gap-3.5">
            {USE_CASES.map((useCase, index) => (
              <motion.li
                key={useCase.title}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-400 hover:border-primary/35 hover:bg-card sm:gap-5 sm:p-5"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-transform duration-400 group-hover:scale-110 sm:size-13">
                  <useCase.icon className="size-5.5 sm:size-6" strokeWidth={1.6} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground sm:text-lg">
                    {useCase.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
