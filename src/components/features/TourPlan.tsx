"use client";

import { useState } from "react";
import { CheckCircle2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TourItineraryDay } from "@/types";

interface TourPlanProps {
    itinerary: TourItineraryDay[];
}

/** Renders text with **highlighted** segments in brand orange. */
function renderItemText(text: string) {
    const parts: { type: "plain" | "highlight"; value: string }[] = [];
    let remaining = text;
    const regex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: "plain", value: text.slice(lastIndex, match.index) });
        }
        parts.push({ type: "highlight", value: match[1] });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push({ type: "plain", value: text.slice(lastIndex) });
    }
    if (parts.length === 0) {
        return text;
    }
    return (
        <>
            {parts.map((part, i) =>
                part.type === "highlight" ? (
                    <span key={i} className="text-brand-orange font-semibold">
                        {part.value}
                    </span>
                ) : (
                    part.value
                )
            )}
        </>
    );
}

export default function TourPlan({ itinerary }: TourPlanProps) {
    const [activeDay, setActiveDay] = useState(1);
    const currentDay = itinerary.find((d) => d.day === activeDay) ?? itinerary[0];

    if (!itinerary.length) return null;

    return (
        <div className="space-y-5 md:space-y-6">
            {/* Header */}
            <div className="space-y-1.5 md:space-y-2">
                <p className="text-brand-orange text-xs md:text-sm italic tracking-wide" style={{ fontFamily: "cursive" }}>
                    Itinerary
                </p>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight">
                    Tour Plan
                </h2>
            </div>

            {/* Day Tabs - Modern Design */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {itinerary.map(({ day }) => (
                    <button
                        key={day}
                        type="button"
                        onClick={() => setActiveDay(day)}
                        className={cn(
                            "relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-200",
                            "border-2",
                            activeDay === day
                                ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/30 scale-105"
                                : "bg-white text-gray-700 border-gray-200 hover:border-brand-orange/50 hover:bg-brand-orange/5 hover:text-brand-orange"
                        )}
                    >
                        Day {day}
                    </button>
                ))}
            </div>

            {/* Day Content Card */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8">
                {/* Day Header */}
                <div className="flex items-start gap-3 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
                            {currentDay.title || `Day ${currentDay.day}`}
                        </h3>
                        <p className="text-sm text-gray-500">Day {currentDay.day} of {itinerary.length}</p>
                    </div>
                </div>

                {/* Activities List */}
                <div className="space-y-3 md:space-y-4">
                    {currentDay.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 sm:gap-4 group"
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                                </div>
                            </div>
                            <div className="flex-1 pt-0.5">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    {renderItemText(item)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
