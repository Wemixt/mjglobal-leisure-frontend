"use client";

import Image from "next/image";
import { MapPin, ShieldCheck, Car } from "lucide-react";
import type { TourItineraryDay } from "@/types";

interface DayByDayDetailsProps {
    itinerary: TourItineraryDay[];
}

/** Day-by-day section: same days as brief table, with full description below. Orange design. */
export default function DayByDayDetails({ itinerary }: DayByDayDetailsProps) {
    if (!itinerary.length) return null;

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    Your Day-by-Day Program
                </h2>
                <div className="flex justify-center gap-1.5 mt-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-brand-orange/70"
                            aria-hidden
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-8 w-full md:w-[85%] max-w-[72rem] mx-auto">
                    {itinerary.map((day) => {
                        const fallbackDesc = day.items
                            .filter((item) => item !== day.title && !item.startsWith("Distance/Time:"))
                            .join(" ");
                        const description = day.dayDescription || fallbackDesc.slice(0, 400) + (fallbackDesc.length > 400 ? "…" : "") || day.title;
                        const location = day.location ?? day.briefTitle ?? day.title;

                        return (
                            <div key={day.day} className="w-full bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-4 sm:p-5 md:p-6">
                                        {/* Header */}
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-10">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-block px-3 py-1 rounded-lg bg-brand-orange text-white text-sm font-bold">
                                                    Day {day.day}
                                                </span>
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                                    {day.briefTitle ?? day.title}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                                <MapPin className="w-4 h-4 flex-shrink-0 text-brand-orange" />
                                                <span>{location}</span>
                                            </div>
                                        </div>

                                        {/* Description + Image (text left ~50%, image right ~50%) */}
                                        <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6 mb-5">
                                            <p className="md:w-1/2 text-gray-600 text-sm md:text-base leading-relaxed min-w-0">
                                                {description || day.title}
                                            </p>
                                            <div className="md:w-1/2 min-h-[200px] md:min-h-[280px] relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                {day.image ? (
                                                    <Image
                                                        src={day.image}
                                                        alt={`Day ${day.day} - ${day.briefTitle ?? day.title}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">Day {day.day}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer services */}
                                        <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-brand-orange">
                                                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                    <ShieldCheck className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium">Safe & professional driver</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-brand-orange">
                                                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                    <Car className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium">Quality, comfortable vehicle</span>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
