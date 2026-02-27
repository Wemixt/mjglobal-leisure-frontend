"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: number;
  name: string;
  image: string;
  description: string;
}

const activities: Activity[] = [
  { 
    id: 1, 
    name: "Diving", 
    image: "/images/acttivites/diving.jpg",
    description: "Explore the underwater world"
  },
  { 
    id: 2, 
    name: "Safari", 
    image: "/images/acttivites/safari.jpg",
    description: "Wildlife adventures await"
  },
  { 
    id: 3, 
    name: "Snorkeling", 
    image: "/images/acttivites/snorkling.jpg",
    description: "Discover marine life"
  },
  { 
    id: 4, 
    name: "Surfing", 
    image: "/images/acttivites/surfing.jpg",
    description: "Ride the perfect wave"
  },
  { 
    id: 5, 
    name: "Whale Watching", 
    image: "/images/acttivites/whale_watching.jpg",
    description: "Witness majestic creatures"
  },
  { 
    id: 6, 
    name: "Adventure Tours", 
    image: "/images/acttivites/pexels-vickytm-29772747.jpg",
    description: "Thrilling experiences"
  },
];

export default function PopularActivities() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
            Popular Activities
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
            Explore Amazing Activities
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4">
            Discover thrilling adventures and unforgettable experiences tailored for every traveler
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "group relative overflow-hidden rounded-3xl shadow-lg",
                "hover:shadow-2xl transition-all duration-500",
                "transform hover:-translate-y-2",
                "cursor-pointer"
              )}
            >
              {/* Image Container */}
              <div className="relative w-full h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {activity.name}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base">
                      {activity.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-brand-orange/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
