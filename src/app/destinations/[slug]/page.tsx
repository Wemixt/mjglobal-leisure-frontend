import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getDestinationBySlug } from "@/data/destinations";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Camera, UtensilsCrossed, Heart } from "lucide-react";

interface DestinationDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export default async function DestinationDetailsPage({ params }: DestinationDetailsPageProps) {
    const { slug } = await params;
    const destination = getDestinationBySlug(slug);

    if (!destination) {
        notFound();
    }

    return (
        <div className="relative min-h-screen bg-[#FAF9F6]">
            <Navbar />
            
            <main className="relative z-10">
                {/* Hero Image Section */}
                <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                    
                    {/* Back Button */}
                    <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20">
                        <Link
                            href="/destinations"
                            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg hover:bg-white transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-800 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm md:text-base font-semibold text-gray-800">Back to Destinations</span>
                        </Link>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10">
                        <div className="container mx-auto max-w-6xl">
                            <div className="max-w-3xl space-y-4">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <MapPin className="w-4 h-4 text-brand-orange" />
                                        <span className="text-sm font-semibold text-gray-800">{destination.location}</span>
                                    </div>
                                    {destination.listingCount && (
                                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <span className="text-sm font-semibold text-gray-800">{destination.listingCount}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    {destination.name}
                                </h1>
                                
                                <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                                    {destination.shortDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Description */}
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About {destination.name}</h2>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {destination.description}
                                    </p>
                                </div>

                                {/* Highlights Section */}
                                <div className="space-y-6 pt-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Highlights</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {destination.highlights.map((highlight, index) => (
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
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-6">
                                    {/* Info Card */}
                                    <div className="bg-[#FAF9F6] rounded-3xl p-6 md:p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Information</h3>
                                        
                                        <div className="space-y-6">
                                            {/* Best Time to Visit */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                    <Calendar className="w-6 h-6 text-brand-orange" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Best Time to Visit</h4>
                                                    <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                                    <MapPin className="w-6 h-6 text-brand-blue" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                                                    <p className="text-gray-600">{destination.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href="/contact"
                                            className="mt-8 w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <span>Book Your Trip</span>
                                            <ArrowLeft className="w-5 h-5 rotate-180" />
                                        </Link>
                                    </div>

                                    {/* Related Destinations */}
                                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Explore More</h3>
                                        <Link
                                            href="/destinations"
                                            className="text-brand-orange hover:text-brand-orange/80 font-semibold flex items-center gap-2 transition-all group"
                                        >
                                            <span>View All Destinations</span>
                                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Best Experiences Section */}
                <section className="py-12 md:py-20 bg-[#FAF9F6]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="space-y-8">
                            <div className="text-center max-w-3xl mx-auto space-y-2">
                                <p className="text-brand-orange text-base md:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
                                    Best Experiences
                                </p>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    What Makes {destination.name} Special
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                {/* Experience 1 */}
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
                                        <Camera className="w-7 h-7 text-brand-orange" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                        Photography Paradise
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Capture stunning landscapes, vibrant culture, and unforgettable moments. {destination.name} offers endless opportunities for breathtaking photography.
                                    </p>
                                </div>

                                {/* Experience 2 */}
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center mb-4">
                                        <UtensilsCrossed className="w-7 h-7 text-brand-blue" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                        Culinary Delights
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Savor authentic local cuisine and fresh flavors unique to {destination.name}. Experience the rich culinary heritage of Sri Lanka.
                                    </p>
                                </div>

                                {/* Experience 3 */}
                                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
                                        <Heart className="w-7 h-7 text-brand-orange" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                        Memorable Moments
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Create lasting memories with unique experiences that connect you with the heart and soul of {destination.name}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Travel Tips Section */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            {/* Left Column - Content */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-brand-orange text-base md:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
                                        Travel Tips
                                    </p>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Plan Your Perfect Visit
                                    </h2>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-[#FAF9F6] rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Best Time to Visit</h4>
                                            <p className="text-gray-600 text-sm md:text-base">{destination.bestTimeToVisit}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-[#FAF9F6] rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">What to Pack</h4>
                                            <p className="text-gray-600 text-sm md:text-base">Light clothing, comfortable shoes, sunscreen, and a camera to capture the beauty of {destination.name}.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-[#FAF9F6] rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Local Culture</h4>
                                            <p className="text-gray-600 text-sm md:text-base">Respect local customs and traditions. Dress modestly when visiting religious sites and always ask permission before taking photos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image */}
                            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={destination.image}
                                    alt={`${destination.name} travel tips`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
