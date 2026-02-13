"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  size: "large" | "medium" | "small";
  colSpan?: number;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/recent gallery/elephant.png",
    alt: "Elephant walking on a dirt road",
    size: "large",
  },
  {
    id: 2,
    src: "/images/recent gallery/camping.png",
    alt: "Sunrise scene with person standing on a hill",
    size: "medium",
  },
  {
    id: 3,
    src: "/images/recent gallery/boat ride.png",
    alt: "Group white-water rafting",
    size: "small",
  },
  {
    id: 4,
    src: "/images/recent gallery/tiger.png",
    alt: "Leopards on rocky surface",
    size: "medium",
  },
  {
    id: 5,
    src: "/images/recent gallery/lighthouse.png",
    alt: "White lighthouse on cliff overlooking ocean",
    size: "medium",
  },
  {
    id: 6,
    src: "/images/recent gallery/nine arch.png",
    alt: "Blue train on stone viaduct bridge",
    size: "medium",
  },
  {
    id: 7,
    src: "/images/recent gallery/herbal treatment.png",
    alt: "Person in spa relaxation setting",
    size: "large",
  },
];

export default function RecentGallery() {
  const getImageHeight = (size: string) => {
    switch (size) {
      case "large":
        return "h-[150px] md:h-[180px] lg:h-[215px]";
      case "medium":
        return "h-[130px] md:h-[155px] lg:h-[180px]";
      case "small":
        return "h-[105px] md:h-[120px] lg:h-[135px]";
      default:
        return "h-[130px]";
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
            Make Your Tour More Pleasure
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
            Recent Gallery
          </h2>
        </div>

        {/* Gallery Grid - Staggered Masonry Layout - 5 Columns */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-start">
          {/* Column 1 - Large Vertical Image (Elephant) - Positioned Lower */}
          <div className="w-full md:w-[18%] md:mt-16">
            <div
              className={cn(
                "relative w-full rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                getImageHeight("large")
              )}
            >
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>
          </div>

          {/* Column 2 - Two Images Stacked (Camping + Boat Ride) */}
          <div className="w-full md:w-[18%] flex flex-col gap-4 md:gap-6">
            {/* Top Image - Camping */}
            <div
              className={cn(
                "relative w-full flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                "h-[140px] md:h-[165px] lg:h-[190px]"
              )}
            >
              <Image
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>

            {/* Bottom Image - Boat Ride */}
            <div
              className={cn(
                "relative w-full flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                "h-[140px] md:h-[165px] lg:h-[190px]"
              )}
            >
              <Image
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>
          </div>

          {/* Column 3 - Center Column - Tiger Image (Tall Vertical) */}
          <div className="w-full md:w-[18%]">
            <div
              className={cn(
                "relative w-full rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                "h-[296px] md:h-[354px] lg:h-[404px]"
              )}
            >
              <Image
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>
          </div>

          {/* Column 4 - Two Images Stacked (Lighthouse + Nine Arch) */}
          <div className="w-full md:w-[18%] flex flex-col gap-4 md:gap-6">
            {/* Top Image - Lighthouse */}
            <div
              className={cn(
                "relative w-full flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                "h-[140px] md:h-[165px] lg:h-[190px]"
              )}
            >
              <Image
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>

            {/* Bottom Image - Nine Arch Bridge */}
            <div
              className={cn(
                "relative w-full flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                "h-[140px] md:h-[165px] lg:h-[190px]"
              )}
            >
              <Image
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>
          </div>

          {/* Column 5 - Large Vertical Image (Herbal Treatment) - Positioned Lower */}
          <div className="w-full md:w-[18%] md:mt-16">
            <div
              className={cn(
                "relative w-full rounded-2xl md:rounded-3xl overflow-hidden",
                "group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                getImageHeight("large")
              )}
            >
              <Image
                src={galleryImages[6].src}
                alt={galleryImages[6].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 18vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
