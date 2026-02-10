"use client";

import React from 'react';

const Hero = () => {
    return (
        <section className="relative w-full h-screen min-h-[700px] bg-white overflow-hidden">
            {/* Main Layout */}
            <div className="flex flex-col md:flex-row w-full h-full relative">

                {/* LEFT SIDE: Text Content */}
                <div className="relative w-full md:w-[45%] h-full bg-white flex flex-col justify-center pl-6 pr-10 md:pl-12 md:pr-10 z-20">
                    <div className="space-y-8 max-w-xl animate-fade-in-up">
                        <h1 className="text-7xl md:text-[110px] font-black text-[#2D2D2D] leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                            Discover <br />
                            <span className="text-[#3F4499]">Sri Lanka</span>
                        </h1>

                        <p className="text-xl text-[#2D2D2D]/40 font-medium max-w-[320px]">
                            The emerald island awaits—hidden waterfalls, ancient temples, and golden beaches.
                        </p>

                        <div className="pt-4">
                            <button className="group px-10 py-5 bg-[#FF7D61] hover:bg-[#ff6a4a] text-white rounded-full font-bold text-xl shadow-2xl shadow-[#FF7D61]/40 transition-all hover:scale-105">
                                Explore more
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Image Area with Curved Shape (Newly shifted to Right) */}
                <div className="relative flex-1 h-[50vh] md:h-full z-10 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/hero/heritage.jpg')`, // Heritage Image
                        }}
                    >
                        {/* Dark Overlay for depth */}
                        <div className="absolute inset-0 bg-black/5" />
                    </div>

                    {/* Curve Shape Overlay - Positioned on the LEFT edge of the right image */}
                    <div className="absolute inset-y-0 -left-1 w-[150px] md:w-[250px] z-20 pointer-events-none">
                        <svg
                            className="h-full w-full text-white fill-current"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            style={{ filter: 'drop-shadow(10px 0 15px rgba(0,0,0,0.05))' }}
                        >
                            <path d="M0 0 C 40 10, 80 30, 40 50 C 0 70, 60 90, 0 100 L 0 0 Z" />
                        </svg>
                    </div>

                    {/* Decorative Mountains (SVG) */}
                    <div className="absolute top-[20%] right-[15%] text-white/20 pointer-events-none select-none">
                        <svg width="250" height="120" viewBox="0 0 250 120">
                            <path d="M20 100 L 80 30 L 140 100 Z" fill="currentColor" />
                            <path d="M100 100 L 160 50 L 220 100 Z" fill="currentColor" opacity="0.6" />
                        </svg>
                    </div>
                </div>

            </div>

            {/* Decorative Dots in background */}
            <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-3 opacity-10">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#3F4499] rounded-full" />
                ))}
            </div>
        </section>
    );
};

export default Hero;
