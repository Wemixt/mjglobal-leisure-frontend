import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ItineraryBrief } from "@/components/features/TourPlan";
import DayByDayDetails from "@/components/features/DayByDayDetails";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { toursService } from "@/api/services";
import { ClientError } from "@/api/client";
import { getTourBySlug } from "@/data/tours";
import type { Tour, TourDetail, TourItineraryDay } from "@/types";

interface TourDetailsPageProps {
  params: Promise<{ slug: string }>;
}

function parseTotalDaysFromTour(tour: Tour): number {
  if (tour.duration) {
    const match = tour.duration.match(/\d+/);
    if (match) {
      const value = parseInt(match[0], 10);
      if (!Number.isNaN(value)) return value;
    }
  }
  if (tour.itinerary && tour.itinerary.length > 0) {
    return tour.itinerary.length;
  }
  return 0;
}

function staticItineraryToDetailDays(
  itinerary: TourItineraryDay[] | undefined
): TourDetail["days"] {
  if (!itinerary || itinerary.length === 0) return [];
  return itinerary.map((day, index) => ({
    id: index + 1,
    dayNumber: day.day,
    location: day.location ?? "",
    topic: day.title,
    subTopic: "",
    image: day.image ?? "",
    description:
      day.dayDescription ??
      (day.items && day.items.length > 0 ? day.items.join("\n") : ""),
    mealPlan: null,
    accommodation: false,
    hotelName: "",
    hotelLocation: "",
    roomType: "",
    destinations: day.destinations ?? [],
    thingsToDo: day.thingsToDo ?? [],
  }));
}

/** Map static Tour to API-shaped TourDetail for fallback when API 404s. */
function staticToDetail(tour: Tour): TourDetail {
  const totalDays = parseTotalDaysFromTour(tour);

  return {
    id: parseInt(tour.id, 10) || 0,
    name: tour.title,
    slug: tour.slug,
    heroImage: tour.image,
    shortDescription: tour.shortDescription,
    description:
      tour.tourOverview ||
      tour.packageDescription ||
      tour.description ||
      "",
    price: tour.price ? Number(tour.price) || 0 : 0,
    packageType: tour.packageType || "",
    minPeople: tour.minPeople ? Number(tour.minPeople) || 0 : 0,
    totalDays,
    packageDuration: tour.duration || `${totalDays || ""} Days`,
    tourRefNumber: tour.tourRefNo || "",
    extraDetails: tour.packageDescription || tour.description || "",
    includes: tour.includes ?? [],
    excludes: tour.excludes ?? [],
    tags: [],
    status: "published",
    days: staticItineraryToDetailDays(tour.itinerary),
  };
}

function mapDaysToItinerary(days: TourDetail["days"]): TourItineraryDay[] {
  if (!days || days.length === 0) return [];
  return days.map((day) => ({
    day: day.dayNumber,
    title: day.topic || day.subTopic || `Day ${day.dayNumber}`,
    items: day.description ? [day.description] : [],
    briefTitle: day.location || day.topic || undefined,
    location: day.location || undefined,
    image: day.image || undefined,
    destinations: day.destinations ?? [],
    thingsToDo: day.thingsToDo ?? [],
  }));
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  const { slug } = await params;

  let tour: TourDetail;
  try {
    tour = await toursService.getBySlug(slug);
  } catch (e) {
    if (e instanceof ClientError && e.status === 404) {
      const staticTour = getTourBySlug(slug);
      if (staticTour) {
        tour = staticToDetail(staticTour);
      } else {
        notFound();
      }
    } else {
      throw e;
    }
  }

  const itinerary = mapDaysToItinerary(tour.days);
  const durationLabel = tour.packageDuration || `${tour.totalDays} Days`;

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </section>

        {/* Title Section */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 max-w-7xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center leading-tight">
              {tour.name}
            </h1>
            {tour.shortDescription && (
              <p className="mt-3 text-center text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                {tour.shortDescription}
              </p>
            )}
          </div>
        </section>

        {/* Main content */}
        <section className="py-8 md:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-6 max-w-7xl">
            <div className="mb-6 md:mb-8">
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 md:gap-2 bg-white border border-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm hover:bg-gray-50 hover:border-brand-orange/50 transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Back to Tour packages</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8">
                {itinerary.length > 0 && <ItineraryBrief itinerary={itinerary} />}

                {(tour.extraDetails || tour.description) && (
                  <div className="rounded-xl md:rounded-2xl border border-gray-100 bg:white shadow-sm overflow-hidden">
                    <div className="px-5 py-5 md:px-6 md:py-6">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5">
                        Package Description
                      </h2>
                      <div className="text-gray-600 text-sm md:text-base leading-relaxed prose prose-gray max-w-none whitespace-pre-line">
                        {tour.extraDetails || tour.description}
                      </div>
                    </div>
                  </div>
                )}

                {tour.includes && tour.includes.length > 0 && (
                  <div className="rounded-xl md:rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="px-5 py-5 md:px-6 md:py-6">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5">
                        What&apos;s Included
                      </h2>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                        {tour.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {tour.excludes && tour.excludes.length > 0 && (
                  <div className="rounded-xl md:rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="px-5 py-5 md:px-6 md:py-6">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5">
                        What&apos;s Not Included
                      </h2>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                        {tour.excludes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20 md:top-24 space-y-4 md:space-y-5">
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-md border border-gray-100">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-4 md:mb-5">
                      Tour details
                    </h3>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start gap-2.5 md:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-orange" />
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Duration</h4>
                          <p className="text-gray-500 text-xs md:text-sm">{durationLabel}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 md:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-blue" />
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Package type</h4>
                          <p className="text-gray-500 text-xs md:text-sm">{tour.packageType}</p>
                        </div>
                      </div>

                      <div className="text-xs md:text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">From ${tour.price}</span>
                        {tour.minPeople ? ` · Min ${tour.minPeople} people` : null}
                      </div>

                      {tour.tourRefNumber && (
                        <div className="text-[11px] md:text-xs text-gray-500">
                          Ref: {tour.tourRefNumber}
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/booking/${slug}`}
                      className="mt-5 md:mt-6 w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-xs sm:text-xs md:text-sm py-2.5 sm:py-3 md:py-3.5 px-3 sm:px-4 md:px-5 rounded-lg md:rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Book this package</span>
                      <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rotate-180" />
                    </Link>
                  </div>
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-md border border-gray-200">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      More tours
                    </h3>
                    <Link
                      href="/tours"
                      className="text-brand-orange hover:text-brand-orange/80 font-medium text-xs sm:text-xs md:text-sm flex items-center gap-2 transition-all group"
                    >
                      <span>View all tour packages</span>
                      <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Day-by-day section: independent, full-width, after itinerary and tour details */}
            {itinerary.length > 0 && (
              <section className="mt-12 lg:mt-16 pt-10 lg:pt-14 border-t border-gray-200 w-full">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-6">
                  <DayByDayDetails itinerary={itinerary} />
                </div>
              </section>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
