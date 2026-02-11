export interface TourItineraryDay {
    day: number;
    title: string;
    items: string[];
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
    /** Full tour overview paragraph (optional, for detailed tour pages) */
    tourOverview?: string;
    /** Destinations & highlights long-form content (optional) */
    destinationsHighlights?: string;
    /** Day-by-day itinerary for Tour Plan section (optional) */
    itinerary?: TourItineraryDay[];
}
