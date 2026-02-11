import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getTourBySlug } from "@/data/tours";
import TourPlan from "@/components/features/TourPlan";
import { ArrowLeft, Clock, CheckCircle2, Calendar, Sparkles } from "lucide-react";

interface TourDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
    const { slug } = await params;
    const tour = getTourBySlug(slug);

    if (!tour) {
        notFound();
    }

    return (
        <div className="relative min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <main className="relative z-10">
                {/* Hero */}
                <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                    <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                    <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20">
                        <Link
                            href="/tours"
                            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg hover:bg-white transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-800 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm md:text-base font-semibold text-gray-800">Back to Tour packages</span>
                        </Link>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10">
                        <div className="container mx-auto max-w-6xl">
                            <div className="max-w-3xl space-y-4">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <Clock className="w-4 h-4 text-brand-orange" />
                                        <span className="text-sm font-semibold text-gray-800">{tour.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <Sparkles className="w-4 h-4 text-brand-orange" />
                                        <span className="text-sm font-semibold text-gray-800">Luxury</span>
                                    </div>
                                </div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                    {tour.title}
                                </h1>
                                <p className="text-white/90 text-base md:text-lg max-w-2xl">
                                    {tour.shortDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            <div className="lg:col-span-2 space-y-8">
                                {tour.tourOverview ? (
                                    <div className="space-y-1.5 md:space-y-2">
                                        <p className="text-brand-orange text-xs md:text-sm italic tracking-wide" style={{ fontFamily: "cursive" }}>
                                            Overview
                                        </p>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight leading-tight">
                                            Tour Overview
                                        </h2>
                                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl pt-2">
                                            {tour.tourOverview}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About this tour</h2>
                                        <p className="text-gray-700 text-lg leading-relaxed">
                                            {tour.description}
                                        </p>
                                    </div>
                                )}

                                {tour.destinationsHighlights && (
                                    <div className="space-y-1.5 md:space-y-2 pt-6">
                                        <p className="text-brand-orange text-xs md:text-sm italic tracking-wide" style={{ fontFamily: "cursive" }}>
                                            Destinations
                                        </p>
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight leading-tight">
                                            Destinations & Highlights
                                        </h2>
                                        <div className="text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl space-y-4 whitespace-pre-line pt-2">
                                            {tour.destinationsHighlights}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6 pt-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Highlights</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tour.highlights.map((highlight, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-4 bg-[#FAF9F6] rounded-2xl hover:bg-gray-50 transition-colors"
                                            >
                                                <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 font-medium">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {tour.itinerary && tour.itinerary.length > 0 && (
                                    <div className="pt-10 border-t border-gray-200">
                                        <TourPlan itinerary={tour.itinerary} />
                                    </div>
                                )}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-5">
                                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-5">Tour details</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-brand-orange" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Duration</h4>
                                                    <p className="text-gray-500 text-sm">{tour.duration}</p>
                                                </div>
                                            </div>
                                            {tour.bestTime && (
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                                        <Calendar className="w-5 h-5 text-brand-blue" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-900 mb-0.5">Best time</h4>
                                                        <p className="text-gray-500 text-sm">{tour.bestTime}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <Link
                                            href="/contact"
                                            className="mt-6 w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-sm py-3.5 px-5 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md"
                                        >
                                            <span>Book this tour</span>
                                            <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </Link>
                                    </div>
                                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-200">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">More tours</h3>
                                        <Link
                                            href="/tours"
                                            className="text-brand-orange hover:text-brand-orange/80 font-medium text-sm flex items-center gap-2 transition-all group"
                                        >
                                            <span>View all tour packages</span>
                                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
