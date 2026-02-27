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
