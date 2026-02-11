"use client";

import Image from "next/image";
import { Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GetToKnowUs() {
  return (
    <section className="relative w-full py-8 lg:py-10 bg-[#FAF9F6]">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="w-full lg:w-[98%] xl:w-[97%] ml-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column - Image with Overlay */}
          <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/images/otherImages/letusknow_image.jpg"
              alt="Plan Your Trip"
              fill
              className="object-cover"
            />
            
            {/* Overlay Contact Box */}
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-2xl max-w-[300px] md:max-w-[340px]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-xs md:text-sm font-semibold text-gray-600 mb-2 leading-tight">
                    BOOK TOUR NOW
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    666 888 0000
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-3 md:space-y-4">
            {/* Header Section */}
            <div className="space-y-1.5 md:space-y-2">
              <p className="text-brand-orange text-sm md:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
                Get to know us
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-black tracking-tight leading-tight">
                Plan Your Trip with Us
              </h2>
            </div>

            {/* Body Text */}
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
              There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised words which don't look even slightly.
            </p>

            {/* Feature List */}
            <ul className="space-y-2.5 md:space-y-3">
              {[
                "Invest in your simply neighborhood",
                "Support people in free text extreme need",
                "Largest global industrial business community"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-orange" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base flex-1">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={cn(
                "w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl",
                "bg-brand-orange text-white font-semibold text-sm md:text-base uppercase tracking-wide",
                "hover:bg-brand-orange/90 transition-all duration-300",
                "shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              )}
            >
              BOOK WITH US NOW
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
