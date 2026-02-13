"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

interface Destination {
  id: number;
  name: string;
  image: string;
  listingCount: string;
}

const destinations: Destination[] = [
  { id: 1, name: "Down South", image: "/images/destinations/Down south.png", listingCount: "15 Listing" },
  { id: 2, name: "Udawalawa", image: "/images/destinations/Udawalawa.png", listingCount: "2K Listing" },
  { id: 3, name: "Kandy", image: "/images/destinations/Kandy.png", listingCount: "9K Listing" },
  { id: 4, name: "Yala", image: "/images/destinations/yala.png", listingCount: "5K Listing" },
  { id: 5, name: "Sigiriya", image: "/images/destinations/Sigiriya.png", listingCount: "3K Listing" },
];

export default function PopularDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getCardPosition = (index: number) => {
    const totalCards = destinations.length;
    const relativeIndex = (index - currentIndex + totalCards) % totalCards;

    // Calculate position relative to center
    let position = relativeIndex;
    if (position > totalCards / 2) {
      position = position - totalCards;
    }

    return position;
  };

  const getCardStyle = (position: number) => {
    const absPosition = Math.abs(position);

    if (position === 0) {
      // Central card - in focus
      return {
        translateX: 0,
        scale: 1,
        zIndex: 5,
        opacity: 1,
        filter: "blur(0px)",
      };
    } else if (position === -1 || position === 1) {
      // Immediate side cards
      const translateX = isMobile ? position * 200 : position * 320; // Less overlap on mobile
      const scale = isMobile ? 0.75 : 0.85;
      return {
        translateX: translateX,
        scale: scale,
        zIndex: 4 - absPosition,
        opacity: 0.7,
        filter: "blur(4px)",
      };
    } else if (position === -2 || position === 2) {
      // Far side cards
      const translateX = isMobile ? position * 180 : position * 280;
      const scale = isMobile ? 0.6 : 0.7;
      return {
        translateX: translateX,
        scale: scale,
        zIndex: 3 - absPosition,
        opacity: 0.4,
        filter: "blur(8px)",
      };
    } else {
      // Very far cards (if more than 5)
      const translateX = isMobile ? position * 150 : position * 250;
      const scale = isMobile ? 0.5 : 0.6;
      return {
        translateX: translateX,
        scale: scale,
        zIndex: 2 - absPosition,
        opacity: 0.2,
        filter: "blur(12px)",
      };
    }
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-[#FAF9F6] overflow-hidden z-10">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
            Top Destination
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
            Popular Destination
          </h2>
        </div>
      </div>

      {/* Carousel Container - Full width for proper centering */}
      <div className="relative h-[420px] md:h-[520px] w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-full" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
          {destinations.map((destination, index) => {
            const position = getCardPosition(index);
            const style = getCardStyle(position);
            const isActive = position === 0;
            const cardWidth = isMobile ? 300 : 400;
            const cardHeight = isMobile ? 420 : 520;

            return (
              <div
                key={destination.id}
                className={cn(
                  "absolute cursor-pointer transition-all duration-700 ease-out",
                  !isActive && "pointer-events-none"
                )}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  left: "50%",
                  top: "50%",
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform: `translateX(${style.translateX}px) scale(${style.scale})`,
                  transformOrigin: "center center",
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  filter: style.filter,
                  willChange: 'transform',
                }}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  {/* Image */}
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    priority={isActive}
                  />

                  {/* Dark Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/80 via-black/60 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                        {destination.name}
                      </h3>
                      <p className="text-white/90 text-xs md:text-sm lg:text-base">
                        {destination.listingCount}
                      </p>
                    </div>

                    <button
                      className={cn(
                        "flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl border-2 border-white text-white text-sm md:text-base font-semibold transition-all whitespace-nowrap",
                        "hover:bg-white hover:text-brand-blue",
                        !isActive && "opacity-50"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle view all action
                      }}
                    >
                      View All
                      <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="container mx-auto px-6">
        <div className="flex justify-center gap-3 mt-12">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-brand-orange w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to destination ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
