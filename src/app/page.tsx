import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import PopularDestinations from "@/components/home/PopularDestinations";
import TourPackages from "@/components/home/TourPackages";
import GetToKnowUs from "@/components/home/GetToKnowUs";
import PopularActivities from "@/components/home/PopularActivities";
import StatisticsCounter from "@/components/home/StatisticsCounter";
import RecentGallery from "@/components/home/RecentGallery";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PopularDestinations />
        <TourPackages />
        <GetToKnowUs />
        <PopularActivities />
        <StatisticsCounter />
        <RecentGallery />
        <Testimonials />
        <Newsletter />
        {/* Other sections like Tours, etc. would go here */}
      </main>
      <Footer />
    </div>
  );
}
