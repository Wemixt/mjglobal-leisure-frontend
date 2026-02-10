import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import PopularDestinations from "@/components/home/PopularDestinations";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PopularDestinations />
        {/* Other sections like Tours, etc. would go here */}
      </main>
      <Footer />
    </div>
  );
}
