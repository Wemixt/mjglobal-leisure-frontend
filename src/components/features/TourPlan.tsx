"use client";

import { useState } from "react";
import { Calendar, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TourItineraryDay } from "@/types";

interface TourPlanProps {
    itinerary: TourItineraryDay[];
}

/** Renders text with **highlighted** segments. */
function renderItemText(text: string) {
    const parts: { type: "plain" | "highlight"; value: string }[] = [];
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
                    <span key={i} className="font-semibold">
                        {part.value}
                    </span>
                ) : (
                    part.value
                )
            )}
        </>
    );
}

/** Itinerary In Brief table - renders first on page */
export function ItineraryBrief({ itinerary }: TourPlanProps) {
    if (!itinerary.length) return null;
    return (
        <div className="rounded-xl md:rounded-2xl border shadow-sm overflow-hidden bg-white">
            <div className="px-5 py-5 md:px-6 md:py-6 border-b bg-gray-50/50">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                    Itinerary In Brief
                </h2>
            </div>
            <div className="divide-y divide-gray-100">
                {itinerary.map((day) => (
                    <div
                        key={day.day}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 px-5 py-5 md:px-6 md:py-6 hover:bg-gray-50/50 transition-colors duration-200 group"
                    >
                        <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                            <div className="flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm md:text-base border-2 shadow-sm bg-white">
                                Day {day.day}
                            </div>
                            <div className="min-w-0 flex-1 text-base md:text-lg font-medium">
                                {day.briefTitle ?? day.title}
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 flex-shrink-0 pl-12 sm:pl-0">
                            <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center bg-white shadow-sm">
                                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                            <span className="text-sm md:text-base font-medium whitespace-nowrap">Safe & professional driver</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Day tabs + day content card - renders last on page */
export function TourDayDetails({ itinerary }: TourPlanProps) {
    const [activeDay, setActiveDay] = useState(1);
    const currentDay = itinerary.find((d) => d.day === activeDay) ?? itinerary[0];

    if (!itinerary.length) return null;

    return (
        <div className="space-y-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {itinerary.map(({ day }) => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => setActiveDay(day)}
                            className={cn(
                                "px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all",
                                "border-2",
                                activeDay === day
                                    ? "border-gray-400 bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>
                <div className="rounded-xl md:rounded-2xl border p-5 sm:p-6 md:p-8">
                    <div className="flex items-start gap-3 mb-5 pb-5 border-b">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                                {currentDay.title || `Day ${currentDay.day}`}
                            </h3>
                            <p className="text-sm opacity-70">Day {currentDay.day} of {itinerary.length}</p>
                        </div>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                        {currentDay.items.map((item, index) => (
                            <div key={index} className="flex items-start gap-3 sm:gap-4">
                                <div className="flex-shrink-0 mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center">
                                    <span className="text-xs">✓</span>
                                </div>
                                <p className="text-sm sm:text-base leading-relaxed pt-0.5">
                                    {renderItemText(item)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}

export default function TourPlan({ itinerary }: TourPlanProps) {
    return (
        <div className="space-y-6 md:space-y-8">
            <ItineraryBrief itinerary={itinerary} />
            <TourDayDetails itinerary={itinerary} />
        </div>
    );
}
