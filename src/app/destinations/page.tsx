"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useDestinationSummaryList } from "@/hooks";
import { ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DestinationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { data, error, isLoading } = useDestinationSummaryList(currentPage);

  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main className="relative z-10">
        {/* Cover Image Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <Image
            src="/images/hero/heritage.jpg"
            alt="Discover Sri Lanka Destinations"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </section>

        {/* Title and Description Section */}
        <section className="py-8 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto space-y-2 md:space-y-1">
              <h1 className="text-brand-orange text-sm md:text-lg lg:text-xl italic tracking-wide" style={{ fontFamily: "cursive" }}>
                Explore Sri Lanka
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-black tracking-tight mt-2">
                Discover Amazing Destinations
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-1 px-2 md:px-0">
                From pristine beaches to ancient fortresses, explore the diverse beauty of Sri Lanka
              </p>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-8 md:py-12 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {error && (
              <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[380px] rounded-xl md:rounded-2xl bg-white border border-gray-100 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!isLoading && !error && items.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No destinations yet.
              </div>
            )}

            {!isLoading && !error && items.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {items.map((destination) => (
                    <Link
                      key={destination.id}
                      href={`/destinations/${destination.slug}`}
                      className="group"
                      onMouseEnter={() => setHoveredId(destination.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-xl md:rounded-2xl",
                          "bg-white transition-all duration-700 ease-out",
                          "border border-gray-100",
                          "shadow-md hover:shadow-2xl",
                          "transform hover:-translate-y-1",
                          "cursor-pointer h-full flex flex-col",
                          "hover:border-brand-orange/20"
                        )}
                      >
                        <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden">
                          <Image
                            src={destination.coverImage}
                            alt={destination.title}
                            fill
                            className={cn(
                              "object-cover transition-transform duration-700 ease-out",
                              hoveredId === destination.id && "scale-110"
                            )}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                          {destination.tourCount != null && (
                            <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/95 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg shadow-lg border border-white/50">
                              <span className="text-[10px] md:text-xs font-semibold text-gray-800 tracking-wide">
                                {destination.tourCount} tour{destination.tourCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          )}

                          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex items-center gap-1 md:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg shadow-lg border border-white/50">
                            <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-orange" />
                            <span className="text-[10px] md:text-xs font-semibold text-gray-800 tracking-wide">
                              {destination.location?.split(",")[0] ?? destination.location}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 md:p-5 lg:p-6 flex flex-col">
                          <div className="flex-1 space-y-2 md:space-y-2.5 mb-3 md:mb-4">
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors duration-300 leading-tight">
                              {destination.title}
                            </h3>
                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2">
                              {destination.excerpt}
                            </p>
                            {destination.tags && destination.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {destination.tags.slice(0, 2).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue rounded-md font-medium border border-brand-blue/10"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="mt-auto pt-3 md:pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs text-gray-500 min-w-0">
                              <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                              <span className="font-medium truncate">{destination.bestTime || "—"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 md:gap-2 text-brand-orange font-semibold group-hover:gap-2 md:group-hover:gap-2.5 transition-all duration-300 flex-shrink-0">
                              <span className="text-xs md:text-sm">Explore</span>
                              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue/5 rounded-xl md:rounded-2xl" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination – always show when we have data */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={!meta?.hasPreviousPage}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                      meta?.hasPreviousPage
                        ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "min-w-[2.25rem] rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                          currentPage === page
                            ? "border-brand-orange bg-brand-orange text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        )}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={!meta?.hasNextPage}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                      meta?.hasNextPage
                        ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    )}
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                {meta && (
                  <p className="mt-3 text-center text-xs text-gray-500">
                    Page {meta.page} of {totalPages}
                    {meta.total !== undefined && ` · ${meta.total} destination${meta.total !== 1 ? "s" : ""} total`}
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative w-full py-10 md:py-14 lg:py-18 xl:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-14 xl:gap-18 items-center">
              <div className="relative w-full lg:col-span-3 h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero/seawomen.jpg"
                  alt="Our Vision"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-2 space-y-3 md:space-y-4 lg:space-y-5">
                <div className="space-y-2">
                  <p className="text-brand-orange text-xs md:text-sm lg:text-base italic tracking-wide" style={{ fontFamily: "cursive" }}>
                    Our Vision
                  </p>
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-black tracking-tight leading-tight">
                    Discover the Beauty of Sri Lanka
                  </h2>
                </div>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">
                  At MJ Global Leisure, we envision a world where every traveler experiences the authentic beauty and rich culture of Sri Lanka. Our mission is to curate exceptional journeys that connect you with pristine beaches, ancient heritage sites, diverse wildlife, and the warm hospitality that makes Sri Lanka truly special.
                </p>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">
                  We believe in sustainable tourism that preserves the natural wonders and cultural treasures of this emerald island for generations to come. Join us in exploring destinations that inspire, transform, and create memories that last a lifetime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
