"use client";

import Link from "next/link";
import { tours } from "@/data/tours";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TourPackages() {
    return (
        <section className="relative w-full py-16 md:py-24 lg:py-32 bg-white overflow-hidden z-10">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16 space-y-2">
                    <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: "cursive" }}>
                        Curated Experiences
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
                        Tour packages
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
                        Luxury tours across Sri Lanka — wellness, wildlife, heritage, and adventure.
                    </p>
                </div>

                {/* List of 5 tour packages - clean, modern list */}
                <div className="max-w-4xl mx-auto">
                    <ul className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-[#FAF9F6] shadow-sm">
                        {tours.map((tour, index) => (
                            <li key={tour.id}>
                                <Link
                                    href={`/tours/${tour.slug}`}
                                    className={cn(
                                        "flex items-center justify-between gap-3 md:gap-4 px-4 md:px-6 py-3.5 md:py-4 lg:py-5",
                                        "text-left transition-all duration-200",
                                        "hover:bg-white hover:shadow-sm hover:border-brand-orange/20",
                                        "group"
                                    )}
                                >
                                    <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-brand-orange transition-colors leading-relaxed">
                                        {tour.title}
                                    </span>
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA to full page */}
                <div className="text-center mt-8 md:mt-10">
                    <Link
                        href="/tours"
                        className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all group text-sm md:text-base"
                    >
                        <span>View all tour packages</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
