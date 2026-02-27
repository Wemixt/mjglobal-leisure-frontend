export interface TourItineraryDay {
    day: number;
    title: string;
    items: string[];
    /** Short label for "Itinerary In Brief" table (e.g. "Airport → Colombo"). Falls back to title if not set. */
    briefTitle?: string;
    /** Show "Safe & professional driver" badge on this day (typically transfer days) */
    hasDriver?: boolean;
    /** Paragraph description for day-by-day section (optional; falls back to items if not set) */
    dayDescription?: string;
    /** Primary location for this day (e.g. "Colombo") */
    location?: string;
    /** Image URL for the day card (optional) */
    image?: string;
    /** Destination names for DESTINATIONS subsection (optional) */
    destinations?: string[];
    /** Activities for THINGS TO DO subsection (optional) */
    thingsToDo?: string[];
}

export interface Tour {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    image: string;
    duration: string;
    highlights: string[];
    bestTime?: string;
    price?: string;
    tourRefNo?: string;
    packageType?: string;
    minPeople?: string;
    includes?: string[];
    excludes?: string[];
    /** Full tour overview paragraph (optional, for detailed tour pages) */
    tourOverview?: string;
    /** Destinations & highlights long-form content (optional) */
    destinationsHighlights?: string;
    /** Package description – supports variable-length content, multiple paragraphs (optional) */
    packageDescription?: string;
    /** Day-by-day itinerary for Tour Plan section (optional) */
    itinerary?: TourItineraryDay[];
}

/** API: tour package detail day item */
export interface TourDetailDay {
    id: number;
    dayNumber: number;
    location: string;
    topic: string;
    subTopic: string;
    image: string;
    description: string;
    mealPlan: string | null;
    accommodation: boolean;
    hotelName: string;
    hotelLocation: string;
    roomType: string;
    destinations: string[];
    thingsToDo: string[];
}

/** API: tour package detail (GET api/v1/tour-packages/:slug) */
export interface TourDetail {
    id: number;
    name: string;
    slug: string;
    heroImage: string;
    shortDescription: string;
    description: string;
    price: number;
    packageType: string;
    minPeople: number;
    totalDays: number;
    packageDuration: string;
    tourRefNumber: string;
    extraDetails: string;
    includes: string[];
    excludes: string[];
    tags: string[];
    status: string;
    days: TourDetailDay[];
}

/** API: full wrapper for tour package detail */
export interface TourDetailResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: TourDetail;
    timestamp: string;
    path: string;
}

/** API: tour package summary list item (list endpoint) */
export interface TourSummaryItem {
    id: number;
    name: string;
    slug: string;
    heroImage: string;
    shortDescription: string;
    totalDays: number;
    price: number;
}

/** API: pagination meta for tour package summary list */
export interface TourSummaryMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/** API: tour package summary list response (data only) */
export interface TourSummaryListData {
    items: TourSummaryItem[];
    meta: TourSummaryMeta;
}

/** API: full wrapper for tour package summary list */
export interface TourSummaryListResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: TourSummaryListData;
    timestamp: string;
    path: string;
}
