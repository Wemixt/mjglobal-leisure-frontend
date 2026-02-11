"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { tours } from "@/data/tours";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TourPackagesPage() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <main className="relative z-10">
                {/* Hero */}
                <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                    <Image
                        src="/images/hero/heritage.jpg"
                        alt="Tour Packages – Sri Lanka"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </section>

                {/* Title & intro */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-4xl mx-auto space-y-1">
                            <p className="text-brand-orange text-lg md:text-xl italic tracking-wide" style={{ fontFamily: "cursive" }}>
                                Curated Experiences
                            </p>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black tracking-tight mt-2">
                                Tour Packages
                            </h1>
                            <p className="text-gray-600 text-base md:text-lg mt-1">
                                Luxury tours designed around wellness, wildlife, heritage, and adventure across Sri Lanka
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tour packages grid */}
                <section className="py-12 md:py-16 bg-[#FAF9F6]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {tours.map((tour, index) => (
                                <Link
                                    key={tour.id}
                                    href={`/tours/${tour.slug}`}
                                    className="group"
                                    onMouseEnter={() => setHoveredId(tour.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <article
                                        className={cn(
                                            "relative overflow-hidden rounded-2xl",
                                            "bg-white transition-all duration-500 ease-out",
                                            "border border-gray-100",
                                            "shadow-md hover:shadow-2xl",
                                            "transform hover:-translate-y-1",
                                            "cursor-pointer h-full flex flex-col",
                                            "hover:border-brand-orange/20"
                                        )}
                                    >
                                        <div className="relative w-full h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden">
                                            <Image
                                                src={tour.image}
                                                alt={tour.title}
                                                fill
                                                className={cn(
                                                    "object-cover transition-transform duration-700 ease-out",
                                                    hoveredId === tour.id && "scale-110"
                                                )}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-white/50">
                                                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                                                <span className="text-xs font-semibold text-gray-800 tracking-wide">
                                                    {tour.duration}
                                                </span>
                                            </div>

                                            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-white/50">
                                                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                                                <span className="text-xs font-semibold text-gray-800 tracking-wide">
                                                    Luxury
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5 md:p-6 flex flex-col flex-1">
                                            <div className="flex-1 space-y-2.5 mb-4">
                                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors duration-300 leading-tight">
                                                    {tour.title}
                                                </h2>
                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                                    {tour.shortDescription}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {tour.highlights.slice(0, 2).map((h, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs px-2.5 py-1 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue rounded-md font-medium border border-brand-blue/10"
                                                        >
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                                                {tour.bestTime && (
                                                    <span className="text-xs text-gray-500 font-medium min-w-0">
                                                        <span className="whitespace-nowrap">Best: </span>
                                                        {tour.bestTime}
                                                    </span>
                                                )}
                                                <div className="flex items-center gap-2 text-brand-orange font-semibold group-hover:gap-2.5 transition-all duration-300 flex-shrink-0">
                                                    <span className="text-sm whitespace-nowrap">View tour</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue/5 rounded-2xl" />
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA strip */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <p className="text-gray-600 text-base md:text-lg mb-6">
                            Can&apos;t find the right package? We can tailor a luxury itinerary to your dates and interests.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-white font-bold shadow-lg hover:bg-brand-orange/90 hover:scale-105 transition-all"
                        >
                            Enquire now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
