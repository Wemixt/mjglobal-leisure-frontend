import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { destinationsService } from "@/api/services";
import { ClientError } from "@/api/client";
import { getDestinationBySlug } from "@/data/destinations";
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import type { DestinationDetail } from "@/types";

interface DestinationDetailsPageProps {
  params: Promise<{ slug: string }>;
}

/** Map static Destination to API-shaped DestinationDetail for fallback when API 404s. */
function staticToDetail(d: {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  location: string;
  highlights: string[];
  bestTimeToVisit: string;
}): DestinationDetail {
  return {
    id: parseInt(d.id, 10) || 0,
    title: d.name,
    slug: d.slug,
    excerpt: d.shortDescription,
    content: d.description,
    coverImage: d.image,
    images: [],
    tags: [],
    location: d.location,
    specificName: "",
    bestTime: d.bestTimeToVisit,
    tourCount: 0,
    explorerNote: "",
    keyHighlights: d.highlights.map((title) => ({ title, description: "" })),
    status: "published",
    publishedAt: "",
    views: 0,
    createdAt: "",
    updatedAt: "",
  };
}

/** Render content as plain text paragraphs (no HTML). */
function formatContent(content: string): string[] {
  if (!content || !content.trim()) return [];
  const plain = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!plain) return [];
  const paragraphs = plain.split(/\n\n+/).filter(Boolean);
  return paragraphs.length ? paragraphs : [plain];
}

export default async function DestinationDetailsPage({ params }: DestinationDetailsPageProps) {
  const { slug } = await params;

  let destination: DestinationDetail;
  try {
    destination = await destinationsService.getPublishedBySlug(slug);
  } catch (e) {
    if (e instanceof ClientError && e.status === 404) {
      const staticDest = getDestinationBySlug(slug);
      if (staticDest) destination = staticToDetail(staticDest);
      else notFound();
    } else {
      throw e;
    }
  }

  const keyHighlights = destination.keyHighlights ?? [];
  const contentBlocks = formatContent(destination.content || "");

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main className="relative z-10">
        {/* Hero Image Section */}
        <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <Image
            src={destination.coverImage}
            alt={destination.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </section>

        {/* Title Section + Back button */}
        <section className="py-6 md:py-8 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="mb-6 md:mb-8">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-1.5 md:gap-2 bg-white border border-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm hover:bg-gray-50 hover:border-brand-orange/50 transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Back to Destinations</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center leading-tight">
              {destination.title}
            </h1>
            {destination.excerpt ? (
              <p className="mt-3 text-center text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                {destination.excerpt}
              </p>
            ) : null}
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-8 md:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 min-w-0 space-y-6 md:space-y-8">
                {/* Description / Content - justified so lines end equally */}
                <div className="space-y-3 md:space-y-4 text-justify">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">About {destination.title}</h2>
                  {(contentBlocks.length > 0 ? contentBlocks : [destination.excerpt].filter(Boolean)).map((block, i) => (
                    <p key={i} className="text-gray-700 text-sm md:text-base leading-relaxed text-justify break-words">
                      {block}
                    </p>
                  ))}
                </div>

                {/* Key Highlights */}
                {keyHighlights.length > 0 && (
                  <div className="space-y-4 md:space-y-6 pt-6 md:pt-8">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {keyHighlights.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-[#FAF9F6] rounded-xl md:rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-900 text-sm md:text-base font-semibold block mb-0.5">{item.title}</span>
                            <span className="text-gray-600 text-xs md:text-sm leading-relaxed">{item.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
                  <div className="bg-[#FAF9F6] rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Travel Information</h3>

                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-brand-orange" />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Best Time to Visit</h4>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{destination.bestTime || "—"}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Location</h4>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{destination.location || "—"}</p>
                        </div>
                      </div>

                      {destination.tourCount != null && destination.tourCount > 0 && (
                        <div className="text-xs md:text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">{destination.tourCount}</span> tour{destination.tourCount !== 1 ? "s" : ""} available
                        </div>
                      )}

                      {destination.explorerNote ? (
                        <div className="pt-2 border-t border-gray-200">
                          <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Explorer Note</h4>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{destination.explorerNote}</p>
                        </div>
                      ) : null}
                    </div>

                    <Link
                      href="/tours"
                      className="mt-6 md:mt-8 w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-sm md:text-base font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Book Your Trip</span>
                      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
                    </Link>
                  </div>

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

        {/* Discover Sri Lanka */}
        <section className="py-8 md:py-12 lg:py-20 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <p className="text-brand-orange text-sm md:text-base italic tracking-wide" style={{ fontFamily: "cursive" }}>
                Destinations
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Discover Sri Lanka
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Sri Lanka offers something for every traveller—from ancient heritage and wildlife to beaches and highland tea country. Explore with confidence; our team is here to help you plan the perfect trip.
              </p>
            </div>
          </div>
        </section>

        {/* Plan Your Trip */}
        <section className="py-8 md:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <p className="text-brand-orange text-sm md:text-base italic tracking-wide" style={{ fontFamily: "cursive" }}>
                  Travel with us
                </p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  Plan Your Trip
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-start gap-3 p-4 bg-[#FAF9F6] rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Tailored itineraries</h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">We design trips around your dates, interests, and pace—whether you prefer culture, wildlife, or relaxation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#FAF9F6] rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Expert support</h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">From booking to arrival, our team is on hand to make your Sri Lankan journey smooth and memorable.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#FAF9F6] rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1">Flexible booking</h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">Book with confidence. We offer flexible options so you can plan your dream trip without worry.</p>
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
