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
                    <div className="absolute top-20 md:top-24 lg:top-32 left-4 md:left-6 lg:left-12 z-20">
                        <Link
                            href="/destinations"
                            className="flex items-center gap-1.5 md:gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-full shadow-lg hover:bg-white transition-all group"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs md:text-sm lg:text-base font-semibold text-gray-800">Back to Destinations</span>
                        </Link>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 xl:p-16 z-10">
                        <div className="container mx-auto max-w-6xl px-4 md:px-6">
                            <div className="max-w-3xl space-y-3 md:space-y-4">
                                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                                    <div className="flex items-center gap-1.5 md:gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-orange" />
                                        <span className="text-xs md:text-sm font-semibold text-gray-800">{destination.location}</span>
                                    </div>
                                    {destination.listingCount && (
                                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                                            <span className="text-xs md:text-sm font-semibold text-gray-800">{destination.listingCount}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                                    {destination.name}
                                </h1>
                                
                                <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed">
                                    {destination.shortDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="py-8 md:py-12 lg:py-20 bg-white">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6 md:space-y-8">
                                {/* Description */}
                                <div className="space-y-3 md:space-y-4">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">About {destination.name}</h2>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {destination.description}
                                    </p>
                                </div>

                                {/* Highlights Section */}
                                <div className="space-y-4 md:space-y-6 pt-6 md:pt-8">
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Highlights</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        {destination.highlights.map((highlight, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-[#FAF9F6] rounded-xl md:rounded-2xl hover:bg-gray-50 transition-colors"
                                            >
                                                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
                                    {/* Info Card */}
                                    <div className="bg-[#FAF9F6] rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Travel Information</h3>
                                        
                                        <div className="space-y-4 md:space-y-6">
                                            {/* Best Time to Visit */}
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-brand-orange" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Best Time to Visit</h4>
                                                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{destination.bestTimeToVisit}</p>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Location</h4>
                                                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{destination.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href="/contact"
                                            className="mt-6 md:mt-8 w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-sm md:text-base font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <span>Book Your Trip</span>
                                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
                                        </Link>
                                    </div>

                                    {/* Related Destinations */}
                                    <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg border border-gray-200">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Explore More</h3>
                                        <Link
                                            href="/destinations"
                                            className="text-brand-orange hover:text-brand-orange/80 text-sm md:text-base font-semibold flex items-center gap-2 transition-all group"
                                        >
                                            <span>View All Destinations</span>
                                            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Best Experiences Section */}
                <section className="py-8 md:py-12 lg:py-20 bg-[#FAF9F6]">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="space-y-6 md:space-y-8">
                            <div className="text-center max-w-3xl mx-auto space-y-2">
                                <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
                                    Best Experiences
                                </p>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                                    What Makes {destination.name} Special
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {/* Experience 1 */}
                                <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mb-3 md:mb-4">
                                        <Camera className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
                                    </div>
                                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                                        Photography Paradise
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        Capture stunning landscapes, vibrant culture, and unforgettable moments. {destination.name} offers endless opportunities for breathtaking photography.
                                    </p>
                                </div>

                                {/* Experience 2 */}
                                <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-blue/10 flex items-center justify-center mb-3 md:mb-4">
                                        <UtensilsCrossed className="w-6 h-6 md:w-7 md:h-7 text-brand-blue" />
                                    </div>
                                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                                        Culinary Delights
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        Savor authentic local cuisine and fresh flavors unique to {destination.name}. Experience the rich culinary heritage of Sri Lanka.
                                    </p>
                                </div>

                                {/* Experience 3 */}
                                <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mb-3 md:mb-4">
                                        <Heart className="w-6 h-6 md:w-7 md:h-7 text-brand-orange" />
                                    </div>
                                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                                        Memorable Moments
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        Create lasting memories with unique experiences that connect you with the heart and soul of {destination.name}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Travel Tips Section */}
                <section className="py-8 md:py-12 lg:py-20 bg-white">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
                            {/* Left Column - Content */}
                            <div className="space-y-4 md:space-y-6">
                                <div className="space-y-2">
                                    <p className="text-brand-orange text-sm md:text-base lg:text-lg italic tracking-wide" style={{ fontFamily: 'cursive' }}>
                                        Travel Tips
                                    </p>
                                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                                        Plan Your Perfect Visit
                                    </h2>
                                </div>
                                
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-[#FAF9F6] rounded-lg md:rounded-xl">
                                        <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5 md:mt-1">
                                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Best Time to Visit</h4>
                                            <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">{destination.bestTimeToVisit}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-[#FAF9F6] rounded-lg md:rounded-xl">
                                        <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-blue/10 flex items-center justify-center mt-0.5 md:mt-1">
                                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-blue" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">What to Pack</h4>
                                            <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">Light clothing, comfortable shoes, sunscreen, and a camera to capture the beauty of {destination.name}.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-[#FAF9F6] rounded-lg md:rounded-xl">
                                        <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-orange/10 flex items-center justify-center mt-0.5 md:mt-1">
                                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Local Culture</h4>
                                            <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-relaxed">Respect local customs and traditions. Dress modestly when visiting religious sites and always ask permission before taking photos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image */}
                            <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
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
