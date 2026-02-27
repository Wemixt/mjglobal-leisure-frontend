"use client";

import { Star, Quote, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useReviewsList } from "@/hooks";
import type { ReviewItem } from "@/types";

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeReview, setActiveReview] = useState<ReviewItem | null>(null);
  const { data, error, isLoading } = useReviewsList(currentPage);

  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          "w-3 h-3 md:w-4 md:h-4",
          index < rating
            ? "fill-brand-orange text-brand-orange"
            : "fill-gray-200 text-gray-200"
        )}
      />
    ));
  };

  const isCommentLong = (comment: string) => comment.length > 220;

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-[#FAF9F6] overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <p
            className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide"
            style={{ fontFamily: "cursive" }}
          >
            What Our Clients Say
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
            Testimonials
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4">
            Discover what our satisfied customers have to say about their unforgettable journeys with us
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {error && (
            <div className="text-center py-12 text-red-600 bg-red-50 rounded-2xl">
              {error}
            </div>
          )}

          {isLoading && (
            <div
              className={cn(
                "grid gap-4 md:gap-6 lg:gap-8",
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              )}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-7 lg:p-8 h-[240px] animate-pulse"
                />
              ))}
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-12 text-gray-500 rounded-2xl bg-white/80">
              No reviews yet.
            </div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!meta?.hasPreviousPage}
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-8 z-20",
                  "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg",
                  "flex items-center justify-center",
                  meta?.hasPreviousPage
                    ? "text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    : "text-gray-300 cursor-not-allowed"
                )}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div
                className={cn(
                  "grid gap-4 md:gap-6 lg:gap-8",
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                )}
              >
                {items.map((review) => {
                  const isLong = isCommentLong(review.comment);

                  return (
                    <div
                      key={review.id}
                      className={cn(
                        "relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl",
                        "p-6 md:p-7 lg:p-8",
                        "transition-all duration-300",
                        "transform hover:-translate-y-1",
                        "flex flex-col"
                      )}
                    >
                      <div className="absolute top-4 right-4 md:top-5 md:right-5 w-10 h-10 md:w-11 md:h-11 bg-brand-orange/10 rounded-full flex items-center justify-center">
                        <Quote className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {renderStars(review.rating)}
                      </div>

                      {review.title ? (
                        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 pr-8">
                          {review.title}
                        </h3>
                      ) : null}

                      {/* Comment – always 3 lines here for consistent card height */}
                      <div className="mb-3 pr-6 md:pr-8">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-3">
                          &quot;{review.comment}&quot;
                        </p>
                      </div>

                      {isLong && (
                        <button
                          type="button"
                          onClick={() => setActiveReview(review)}
                          className="text-xs md:text-sm text-brand-orange font-semibold hover:underline mb-3 self-start"
                        >
                          Show more
                        </button>
                      )}

                      <div className="mt-auto flex items-center gap-3 md:gap-4">
                        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-bold text-black mb-0.5 truncate">
                            {review.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={!meta?.hasNextPage}
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-8 z-20",
                  "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg",
                  "flex items-center justify-center",
                  meta?.hasNextPage
                    ? "text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                    : "text-gray-300 cursor-not-allowed"
                )}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}

          {!isLoading && !error && items.length > 0 && meta && totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!meta.hasPreviousPage}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  meta.hasPreviousPage
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
                disabled={!meta.hasNextPage}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  meta.hasNextPage
                    ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                )}
                aria-label="Next page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
              </div>
              <p className="text-xs text-gray-500">
                Page {meta.page} of {totalPages}
                {meta.total != null && ` · ${meta.total} review${meta.total !== 1 ? "s" : ""} total`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full review modal */}
      {activeReview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
            <button
              type="button"
              onClick={() => setActiveReview(null)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              aria-label="Close full review"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              {renderStars(activeReview.rating)}
            </div>

            {activeReview.title && (
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {activeReview.title}
              </h3>
            )}

            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              &quot;{activeReview.comment}&quot;
            </p>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg">
                {activeReview.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                  {activeReview.name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
