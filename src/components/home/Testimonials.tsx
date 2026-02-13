"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Enthusiast",
    location: "United States",
    rating: 5,
    comment: "An absolutely incredible experience! The team at MJ Global Leisure made our Sri Lankan adventure unforgettable. From the pristine beaches to the wildlife safaris, every moment was perfectly planned. Highly recommend!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Photographer",
    location: "Singapore",
    rating: 5,
    comment: "As a photographer, I was blown away by the stunning locations they took us to. The Nine Arch Bridge and lighthouse views were breathtaking. The guides were knowledgeable and patient with our photo stops.",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Adventure Seeker",
    location: "Australia",
    rating: 5,
    comment: "The diving and snorkeling experiences were world-class! Crystal clear waters and amazing marine life. The team ensured our safety while maximizing the fun. Can't wait to come back for more adventures!",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Family Traveler",
    location: "India",
    rating: 5,
    comment: "Traveled with my family including two young kids. MJ Global Leisure made everything so easy and enjoyable. The kids loved the elephant encounters and camping experiences. Truly a memorable family vacation!",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Wellness Enthusiast",
    location: "United Kingdom",
    rating: 5,
    comment: "The herbal treatment and spa experiences were rejuvenating. Combined with the beautiful natural settings, it was the perfect wellness retreat. The team's attention to detail and hospitality was exceptional.",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Solo Traveler",
    location: "Canada",
    rating: 5,
    comment: "As a solo traveler, I was initially hesitant, but MJ Global Leisure made me feel safe and included. The group tours were well-organized and I met amazing people. The whale watching was a highlight!",
  },
  {
    id: 7,
    name: "Maria Garcia",
    role: "Nature Lover",
    location: "Spain",
    rating: 5,
    comment: "The wildlife safaris exceeded all expectations! We saw elephants, leopards, and so many birds. The guides were incredibly knowledgeable about the local wildlife and conservation efforts. A truly educational and exciting experience!",
  },
  {
    id: 8,
    name: "Robert Thompson",
    role: "Beach Enthusiast",
    location: "New Zealand",
    rating: 5,
    comment: "The beaches in Sri Lanka are absolutely stunning! MJ Global Leisure took us to hidden gems we never would have found on our own. The surfing lessons were professional and the beachside accommodations were perfect.",
  },
  {
    id: 9,
    name: "Sophie Martin",
    role: "Cultural Explorer",
    location: "France",
    rating: 5,
    comment: "The cultural tours were fascinating! We visited ancient temples, learned about local traditions, and enjoyed authentic Sri Lankan cuisine. The team's cultural insights made every site visit meaningful and memorable.",
  },
  {
    id: 10,
    name: "Ahmed Hassan",
    role: "Honeymooner",
    location: "UAE",
    rating: 5,
    comment: "Perfect honeymoon destination! MJ Global Leisure arranged everything beautifully - from romantic beach dinners to private tours. The attention to detail and personalized service made our special trip absolutely unforgettable.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate how many testimonials to show based on screen size
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    
    setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    const visible: Testimonial[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + visibleCount) % testimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleCount]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - visibleCount + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + visibleCount) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

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

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-[#FAF9F6] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
            What Our Clients Say
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
            Testimonials
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4">
            Discover what our satisfied customers have to say about their unforgettable journeys with us
          </p>
        </div>

        {/* Testimonials Grid - Always shows 3 (or responsive: 1 on mobile, 2 on tablet) */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-8 z-20",
              "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg",
              "flex items-center justify-center text-brand-orange",
              "hover:bg-brand-orange hover:text-white transition-all duration-300",
              "hover:scale-110 active:scale-95"
            )}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Testimonials Grid */}
          <div
            className={cn(
              "grid gap-4 md:gap-6 lg:gap-8",
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              "transition-all duration-500 ease-in-out",
              isTransitioning ? "opacity-50" : "opacity-100"
            )}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className={cn(
                  "relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl",
                  "p-6 md:p-7 lg:p-8",
                  "transition-all duration-300",
                  "transform hover:-translate-y-1"
                )}
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 md:top-5 md:right-5 w-10 h-10 md:w-11 md:h-11 bg-brand-orange/10 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Comment */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 pr-6 md:pr-8">
                  "{testimonial.comment}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>

                  {/* Name and Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-black mb-0.5 truncate">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 truncate">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-8 z-20",
              "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg",
              "flex items-center justify-center text-brand-orange",
              "hover:bg-brand-orange hover:text-white transition-all duration-300",
              "hover:scale-110 active:scale-95"
            )}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
