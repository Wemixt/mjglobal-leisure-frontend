"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { TourItineraryDay } from "@/types";

interface TourPlanProps {
    itinerary: TourItineraryDay[];
}

/** Renders text with **highlighted** segments in gold. */
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
                    <span key={i} className="text-brand-gold font-semibold">
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
        <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-orange">Tour Plan</h2>

            <div className="flex flex-wrap gap-2">
                {itinerary.map(({ day }) => (
                    <button
                        key={day}
                        type="button"
                        onClick={() => setActiveDay(day)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all border ${
                            activeDay === day
                                ? "bg-brand-gold text-white border-brand-gold"
                                : "bg-[#E0F7FA] text-brand-orange border-[#B2EBF2] hover:bg-[#B2EBF2]/50"
                        }`}
                    >
                        Day {day}
                    </button>
                ))}
            </div>

            <div className="space-y-3 pt-2">
                {currentDay.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{renderItemText(item)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
