export interface Destination {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    image: string;
    location: string;
    highlights: string[];
    bestTimeToVisit: string;
    listingCount?: string;
}
