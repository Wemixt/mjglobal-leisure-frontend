"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useTourSummaryList } from "@/hooks";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TourPackagesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { data, error, isLoading } = useTourSummaryList(currentPage);

  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

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
        <section className="py-8 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto space-y-1">
              <p
                className="text-brand-orange text-base md:text-lg lg:text-xl italic tracking-wide"
                style={{ fontFamily: "cursive" }}
              >
                Curated Experiences
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-black tracking-tight mt-2">
                Tour Packages
              </h1>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-1 px-2">
                Luxury tours designed around wellness, wildlife, heritage, and adventure across Sri Lanka
              </p>
            </div>
          </div>
        </section>

        {/* Tour packages grid */}
        <section className="py-8 md:py-12 lg:py-16 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {error && (
              <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
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
                No tour packages available yet.
              </div>
            )}

            {!isLoading && !error && items.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
                  {items.map((tour) => (
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
                        <div className="relative w-full h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden">
                          <Image
                            src={tour.heroImage}
                            alt={tour.name}
                            fill
                            className={cn(
                              "object-cover transition-transform duration-700 ease-out",
                              hoveredId === tour.id && "scale-110"
                            )}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                          {/* Duration tag overlay - pill-shaped badge */}
                          <div className="absolute top-2 left-2 md:top-3 md:left-3">
                            <span className="inline-flex items-center justify-center px-2.5 py-1 md:px-3 md:py-1.5 bg-brand-orange text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg">
                              {tour.totalDays} Days
                            </span>
                          </div>
                        </div>

                        <div className="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
                          {/* Duration & Price Row */}
                          <div className="flex items-center justify-between mb-2 md:mb-3">
                            <div className="flex items-center gap-1.5 md:gap-2 text-brand-orange">
                              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                              <span className="text-xs md:text-sm font-medium">
                                {tour.totalDays} Day Tour
                              </span>
                            </div>
                            <span className="text-xs md:text-sm font-medium text-brand-orange">
                              {tour.price ? `$${tour.price}` : "Contact us"}
                            </span>
                          </div>

                          {/* Title - Large, bold */}
                          <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors duration-300 mb-1.5 md:mb-2 leading-tight line-clamp-2">
                            {tour.name}
                          </h2>

                          {/* Short description */}
                          <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 leading-relaxed line-clamp-2">
                            {tour.shortDescription}
                          </p>

                          {/* Separator */}
                          <div className="border-t border-gray-200 mb-3 md:mb-4" />

                          {/* View Itinerary CTA */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs md:text-sm text-brand-orange font-medium">
                              View Itinerary
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-orange group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>

                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue/5 rounded-2xl" />
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination – same pattern as blog page */}
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
                    {meta.total !== undefined && ` · ${meta.total} package${meta.total !== 1 ? "s" : ""} total`}
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-8 md:py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 md:mb-6 px-2">
              Can&apos;t find the right package? We can tailor a luxury itinerary to your dates and interests.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-brand-orange px-6 py-3 md:px-8 md:py-4 text-white font-bold text-sm md:text-base shadow-lg hover:bg-brand-orange/90 hover:scale-105 transition-all"
            >
              Enquire now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

