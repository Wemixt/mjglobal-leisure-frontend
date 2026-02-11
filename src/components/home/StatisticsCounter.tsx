"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Statistic {
  id: number;
  value: number;
  suffix: string;
  label: string;
  duration?: number; // Animation duration in ms
}

const statistics: Statistic[] = [
  { id: 1, value: 499, suffix: "+", label: "HAPPY CUSTOMERS", duration: 2000 },
  { id: 2, value: 149, suffix: "+", label: "DESTINATIONS", duration: 2000 },
  { id: 3, value: 19, suffix: "K+", label: "TOURS COMPLETED", duration: 2000 },
  { id: 4, value: 97, suffix: "%", label: "SATISFACTION RATE", duration: 2000 },
];

export default function StatisticsCounter() {
  const [counters, setCounters] = useState<number[]>(statistics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    statistics.forEach((stat, index) => {
      const duration = stat.duration || 2000;
      const steps = 60; // Number of animation steps
      const increment = stat.value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(
          Math.floor(increment * currentStep),
          stat.value
        );

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = currentValue;
          return newCounters;
        });

        if (currentStep >= steps) {
          // Ensure final value is set correctly
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = stat.value;
            return newCounters;
          });
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  const formatValue = (value: number, suffix: string) => {
    // For percentage, show decimal if needed
    if (suffix === "%") {
      return `${value}${suffix}`;
    }
    return `${value}${suffix}`;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20 lg:py-24 bg-brand-orange"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center space-y-2 md:space-y-3"
            >
              {/* Number */}
              <div
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white",
                  "transition-all duration-300",
                  hasAnimated && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {formatValue(counters[index], stat.suffix)}
              </div>
              
              {/* Label */}
              <div
                className={cn(
                  "text-xs md:text-xs lg:text-sm font-semibold text-white uppercase tracking-wider",
                  "transition-all duration-300",
                  hasAnimated && "animate-fade-in-up"
                )}
                style={{
                  animationDelay: `${index * 100 + 200}ms`,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
