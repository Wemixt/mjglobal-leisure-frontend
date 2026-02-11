"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Compass,
  Leaf,
  Heart,
  Users,
  Target,
  Eye,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Compass,
    title: "Authentic Experiences",
    description:
      "We design journeys that connect you with the real Sri Lanka—its people, culture, and untouched landscapes.",
  },
  {
    icon: Leaf,
    title: "Sustainable Tourism",
    description:
      "We are committed to preserving the island's natural beauty and supporting local communities for future generations.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your comfort, safety, and satisfaction guide every decision we make from planning to the last day of your trip.",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description:
      "Our team knows Sri Lanka inside out—hidden gems, best seasons, and the warmest hospitality spots.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <Image
            src="/images/hero/seawomen.jpg"
            alt="About MJ Global Leisure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p
              className="text-white/90 text-lg md:text-xl italic tracking-wide mb-2"
              style={{ fontFamily: "cursive" }}
            >
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              About Us
            </h1>
            <p className="text-white/90 text-base md:text-lg mt-4 max-w-2xl">
              Your trusted partner in discovering the wonders of Sri Lanka
            </p>
          </div>
        </section>

        {/* Intro - Who We Are */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <p
                className="text-brand-orange text-lg md:text-xl italic tracking-wide"
                style={{ fontFamily: "cursive" }}
              >
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black tracking-tight">
                MJ Global Leisure
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We are a premier travel company dedicated to showcasing the
                emerald island of Sri Lanka. From pristine beaches and ancient
                heritage sites to lush wildlife and warm hospitality, we curate
                experiences that create memories for a lifetime.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Founded with a passion for authentic travel, we combine local
                expertise with exceptional service to deliver journeys that are
                both adventurous and comfortable. Whether you seek relaxation,
                culture, or adventure, we are here to make it happen.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16 lg:py-20 bg-[#FAF9F6]">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="relative overflow-hidden rounded-2xl bg-white p-8 md:p-10 shadow-lg border border-gray-100">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <Target className="w-7 h-7 text-brand-orange" />
                  </div>
                  <p
                    className="text-brand-orange text-sm md:text-base italic tracking-wide"
                    style={{ fontFamily: "cursive" }}
                  >
                    Our Mission
                  </p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight">
                    Create Unforgettable Journeys
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    To design and deliver exceptional travel experiences across
                    Sri Lanka that inspire, educate, and connect travelers with
                    the island's natural beauty, rich culture, and welcoming
                    people—while supporting sustainable and responsible
                    tourism.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-white p-8 md:p-10 shadow-lg border border-gray-100">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10 flex flex-col items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-brand-orange" />
                  </div>
                  <p
                    className="text-brand-orange text-sm md:text-base italic tracking-wide"
                    style={{ fontFamily: "cursive" }}
                  >
                    Our Vision
                  </p>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight">
                    Sri Lanka for Everyone
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    To be the most trusted and loved travel partner for
                    discovering Sri Lanka—where every traveler, from solo
                    explorers to families, finds their perfect journey and
                    leaves with a deeper connection to this extraordinary
                    island.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="text-center mb-12 md:mb-16 space-y-2">
              <p
                className="text-brand-orange text-lg md:text-xl italic tracking-wide"
                style={{ fontFamily: "cursive" }}
              >
                What We Stand For
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black tracking-tight">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative rounded-2xl p-6 md:p-8 bg-[#FAF9F6] border border-gray-100",
                    "transition-all duration-300 hover:shadow-xl hover:border-brand-orange/20",
                    "hover:-translate-y-1"
                  )}
                >
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mb-5 group-hover:bg-brand-orange/20 transition-colors">
                    <item.icon className="w-7 h-7 text-brand-orange" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story + Image Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-[#FAF9F6]">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
              <div className="relative w-full lg:col-span-3 h-[340px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero/heritage.jpg"
                  alt="Our Journey"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-2 space-y-4 md:space-y-5">
                <p
                  className="text-brand-orange text-sm md:text-base italic tracking-wide"
                  style={{ fontFamily: "cursive" }}
                >
                  Our Journey
                </p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight leading-tight">
                  From Passion to Your Perfect Trip
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  MJ Global Leisure was born from a deep love for Sri Lanka and a
                  desire to share its magic with the world. We started small—with
                  a handful of handcrafted tours—and grew by putting our guests
                  first and staying true to sustainable, authentic travel.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Today we continue to expand our offerings while keeping the
                  same commitment: every itinerary is thoughtfully designed,
                  every partner carefully chosen, and every trip backed by our
                  promise of quality and care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - white background with highlighted card */}
        <section className="py-16 md:py-20 lg:py-24 bg-white relative">
          {/* Accent line - orange only, no pink/purple */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center rounded-2xl border-2 border-brand-orange/25 bg-white shadow-xl shadow-gray-200/60 py-12 md:py-14 px-6 md:px-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Ready to Explore Sri Lanka?
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8">
                Let us craft the perfect itinerary for you. Get in touch or book
                your tour today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-full",
                    "bg-brand-orange text-white font-bold text-base md:text-lg",
                    "shadow-lg shadow-brand-orange/30 transition-all hover:bg-brand-orange/90 hover:scale-105"
                  )}
                >
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/destinations"
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-full",
                    "bg-white text-brand-orange font-semibold text-base md:text-lg border-2 border-brand-orange",
                    "transition-all hover:bg-brand-orange hover:text-white"
                  )}
                >
                  View Destinations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
