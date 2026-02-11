"use client";

import Image from "next/image";
import { ArrowRight, Search, MapPin, Calendar, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const heroImages = [
    { url: "/images/hero/wild life.png", alt: "Wildlife Safari" },
    { url: "/images/hero/nine arch.png", alt: "Heritage Bridge" },
    { url: "/images/hero/lighthouse.png", alt: "Coastal Beauty" },
    { url: "/images/hero/spa.png", alt: "Wellness Retreat" },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#FAF9F6] pt-24 md:pt-32 pb-12">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px]" />

            <div className="container relative mx-auto h-full px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">

                    {/* Left Column: Content & Search */}
                    <div className="space-y-10 animate-fade-in-up">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-brand-gold">
                                <Star size={16} fill="currentColor" />
                                <span className="text-xs font-bold uppercase tracking-widest">Premium Travel Partner</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-brand-blue leading-[0.95]">
                                Explore the <br />
                                <span className="text-brand-orange">Wonders</span> of <br />
                                Sri Lanka
                            </h1>

                            <p className="max-w-xl text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                                Curating bespoke journeys across pristine beaches, ancient kingdoms,
                                and lush wildlife sanctuaries. Experience paradise like never before.
                            </p>
                        </div>

                        {/* Search Bar - Integrated Card */}
                        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-200/50">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 mb-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        <MapPin size={14} className="text-brand-orange" />
                                        Destination
                                    </label>
                                    <select className="w-full bg-transparent text-gray-900 font-semibold outline-none border-b border-gray-100 pb-2 focus:border-brand-blue transition-colors">
                                        <option>Select location</option>
                                        <option>Ella, Hill Country</option>
                                        <option>Yala National Park</option>
                                        <option>Mirissa, South Coast</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        <Calendar size={14} className="text-brand-orange" />
                                        Duration
                                    </label>
                                    <select className="w-full bg-transparent text-gray-900 font-semibold outline-none border-b border-gray-100 pb-2 focus:border-brand-blue transition-colors">
                                        <option>Choose duration</option>
                                        <option>1-3 Days</option>
                                        <option>4-7 Days</option>
                                        <option>7+ Days</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                        <Users size={14} className="text-brand-orange" />
                                        Travelers
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Group size"
                                        className="w-full bg-transparent text-gray-900 font-semibold outline-none border-b border-gray-100 pb-2 focus:border-brand-blue transition-colors placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 rounded-2xl bg-brand-blue py-4 font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue/90 hover:scale-[1.02] flex items-center justify-center gap-2">
                                    <Search size={20} />
                                    <span>Find Your Adventure</span>
                                </button>
                                <button className="rounded-2xl border border-gray-200 px-8 py-4 font-bold text-gray-700 transition-all hover:bg-gray-50 flex items-center justify-center gap-2 group">
                                    View Tours
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Staggered Image Gallery */}
                    <div className="relative h-[600px] md:h-[700px] animate-fade-in-up delay-300">
                        {/* Main Image */}
                        <div className="absolute top-0 right-0 w-[80%] h-[70%] rounded-[40px] overflow-hidden shadow-2xl z-10 rotate-3 transition-transform hover:rotate-0 duration-700">
                            <Image
                                src={heroImages[1].url}
                                alt={heroImages[1].alt}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Secondary Overlapping Image */}
                        <div className="absolute bottom-4 left-0 w-[60%] h-[50%] rounded-[40px] overflow-hidden shadow-2xl z-20 -rotate-6 transition-transform hover:rotate-0 duration-700">
                            <Image
                                src={heroImages[0].url}
                                alt={heroImages[0].alt}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Third Decorative Element */}
                        <div className="absolute top-1/2 left-0 w-[40%] h-[40%] -translate-y-1/2 rounded-[40px] overflow-hidden shadow-2xl z-0 transition-transform hover:-translate-x-4 duration-700 hidden md:block">
                            <Image
                                src={heroImages[2].url}
                                alt={heroImages[2].alt}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>

                        {/* Floating Experience Card */}
                        <div className="absolute bottom-12 right-0 bg-white p-6 rounded-3xl shadow-xl z-30 animate-bounce-subtle">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                    <Star className="text-brand-orange" size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-brand-blue">4.9/5</p>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Guest Satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .delay-300 { animation-delay: 0.3s; }
                
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
