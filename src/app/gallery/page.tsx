"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useGalleryList } from "@/hooks";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { data, error, isLoading } = useGalleryList(currentPage);

  const items = (data?.items ?? []).filter((item) => item.isActive);
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
            alt="Gallery – Sri Lanka"
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
                Moments & Memories
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-black tracking-tight mt-2">
                Gallery
              </h1>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-1 px-2">
                A glimpse of the landscapes, wildlife, and experiences that await you in Sri Lanka
              </p>
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="py-8 md:py-12 lg:py-16 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {error && (
              <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl">
                {error}
              </div>
            )}

            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl md:rounded-2xl bg-white border border-gray-100 animate-pulse"
                  />
                ))}
              </div>
            )}

            {!isLoading && !error && items.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No images in the gallery yet.
              </div>
            )}

            {!isLoading && !error && items.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className={cn(
                        "group relative overflow-hidden rounded-xl md:rounded-2xl",
                        "bg-white transition-all duration-500 ease-out",
                        "border border-gray-100",
                        "shadow-md hover:shadow-2xl",
                        "transform hover:-translate-y-1",
                        "cursor-default hover:border-brand-orange/20",
                        "aspect-square"
                      )}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <div className="relative w-full h-full min-h-[200px] overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title || "Gallery image"}
                            fill
                            className={cn(
                              "object-cover transition-transform duration-700 ease-out",
                              hoveredId === item.id && "scale-110"
                            )}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                            No image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        {item.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                            <p className="text-white text-sm md:text-base font-medium drop-shadow-md line-clamp-2">
                              {item.title}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue/5 rounded-xl md:rounded-2xl" />
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
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
                    {meta.total !== undefined && ` · ${meta.total} image${meta.total !== 1 ? "s" : ""} total`}
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
              Ready to experience these moments yourself? Let us plan your perfect Sri Lankan journey.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-brand-orange px-6 py-3 md:px-8 md:py-4 text-white font-bold text-sm md:text-base shadow-lg hover:bg-brand-orange/90 hover:scale-105 transition-all"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
