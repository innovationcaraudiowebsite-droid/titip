import Navbar from "@/components/umkm/navbar";
import Hero from "@/components/umkm/hero";
import ValueProps from "@/components/umkm/value-props";
import Vision from "@/components/umkm/vision";
import Offer from "@/components/umkm/offer";
import Inquiry from "@/components/umkm/inquiry";
import Footer from "@/components/umkm/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <Vision />
        <Offer />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
