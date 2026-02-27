"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { blogs } from "@/data/blogs";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogPage() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <main className="relative z-10">
                {/* Hero */}
                <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                    <Image
                        src="/images/hero/heritage.jpg"
                        alt="Blog – Travel Stories & Tips"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </section>

                {/* Title & intro */}
                <section className="py-8 md:py-12 lg:py-16 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-4xl mx-auto space-y-1">
                            <p className="text-brand-orange text-base md:text-lg lg:text-xl italic tracking-wide" style={{ fontFamily: "cursive" }}>
                                Stories & Insights
                            </p>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-black tracking-tight mt-2">
                                Blog
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-1 px-2">
                                Travel tips, destination guides, and inspiration for your Sri Lankan journey
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog grid */}
                <section className="py-8 md:py-12 lg:py-16 bg-[#FAF9F6]">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
                            {blogs.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group"
                                    onMouseEnter={() => setHoveredId(post.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <article
                                        className={cn(
                                            "relative overflow-hidden rounded-xl md:rounded-2xl",
                                            "bg-white transition-all duration-500 ease-out",
                                            "border border-gray-100",
                                            "shadow-md hover:shadow-2xl",
                                            "transform hover:-translate-y-1",
                                            "cursor-pointer h-full flex flex-col",
                                            "hover:border-brand-orange/20"
                                        )}
                                    >
                                        <div className="relative w-full h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className={cn(
                                                    "object-cover transition-transform duration-700 ease-out",
                                                    hoveredId === post.id && "scale-110"
                                                )}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                            <div className="absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 md:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded md:rounded-lg shadow-lg border border-white/50">
                                                <span className="text-[10px] md:text-xs font-semibold text-gray-800 tracking-wide">
                                                    {post.category}
                                                </span>
                                            </div>

                                            <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1 md:gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded md:rounded-lg shadow-lg border border-white/50">
                                                <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-orange" />
                                                <span className="text-[10px] md:text-xs font-semibold text-gray-800 tracking-wide">
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
                                            <div className="flex-1 space-y-1.5 md:space-y-2 mb-2 md:mb-3">
                                                <h2 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 group-hover:text-brand-blue transition-colors duration-300 leading-tight line-clamp-2">
                                                    {post.title}
                                                </h2>
                                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500">
                                                    <Calendar className="w-3 h-3 flex-shrink-0" />
                                                    <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-2 md:pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                                                <span className="text-[10px] md:text-xs text-gray-500 truncate">{post.author}</span>
                                                <div className="flex items-center gap-1.5 md:gap-2 text-brand-orange font-semibold group-hover:gap-2 transition-all duration-300 flex-shrink-0">
                                                    <span className="text-xs md:text-sm whitespace-nowrap">Read more</span>
                                                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-blue/5 rounded-2xl" />
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA strip */}
                <section className="py-8 md:py-12 lg:py-16 bg-white">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                        <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 md:mb-6 px-2">
                            Ready to turn these stories into your own adventure? We&apos;ll design a luxury itinerary just for you.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-brand-orange px-6 py-3 md:px-8 md:py-4 text-white font-bold text-sm md:text-base shadow-lg hover:bg-brand-orange/90 hover:scale-105 transition-all"
                        >
                            Get in touch
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
