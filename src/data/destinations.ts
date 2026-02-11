import { Destination } from "../types";

export const destinations: Destination[] = [
    {
        id: "1",
        slug: "down-south",
        name: "Down South",
        shortDescription: "Pristine beaches and coastal beauty",
        description: "Discover the breathtaking beauty of Sri Lanka's southern coast, where golden beaches meet turquoise waters. The Down South region offers a perfect blend of relaxation and adventure, with stunning sunsets, water sports, and charming coastal towns. Experience the laid-back lifestyle, fresh seafood, and the warm hospitality of the coastal communities.",
        image: "/images/destinations/Down south.png",
        location: "Southern Province, Sri Lanka",
        highlights: [
            "Golden beaches",
            "Surfing spots",
            "Whale watching",
            "Galle Fort",
            "Stunning sunsets",
            "Fresh seafood"
        ],
        bestTimeToVisit: "November to April",
        listingCount: "15 Listing"
    },
    {
        id: "2",
        slug: "udawalawa",
        name: "Udawalawa",
        shortDescription: "Wildlife sanctuary and elephant encounters",
        description: "Udawalawa National Park is a haven for wildlife enthusiasts, offering incredible opportunities to witness elephants in their natural habitat. The park's diverse ecosystem includes grasslands, scrub forests, and water bodies that attract a variety of wildlife. Experience thrilling safaris, bird watching, and the chance to see these majestic creatures up close.",
        image: "/images/destinations/Udawalawa.png",
        location: "Uva Province, Sri Lanka",
        highlights: [
            "Elephant watching",
            "Wildlife safaris",
            "Bird watching",
            "Udawalawa Reservoir",
            "Diverse flora and fauna",
            "Photography opportunities"
        ],
        bestTimeToVisit: "Year-round, best from May to September",
        listingCount: "2K Listing"
    },
    {
        id: "3",
        slug: "kandy",
        name: "Kandy",
        shortDescription: "Cultural heart and sacred city",
        description: "Kandy, the cultural capital of Sri Lanka, is nestled among lush hills and is home to the sacred Temple of the Tooth Relic. This UNESCO World Heritage city offers a rich blend of history, culture, and natural beauty. Explore ancient temples, enjoy traditional dance performances, and immerse yourself in the spiritual atmosphere of this enchanting hill city.",
        image: "/images/destinations/Kandy.png",
        location: "Central Province, Sri Lanka",
        highlights: [
            "Temple of the Tooth Relic",
            "Kandy Lake",
            "Royal Botanical Gardens",
            "Traditional Kandyan dance",
            "Spice gardens",
            "Scenic hill views"
        ],
        bestTimeToVisit: "December to April",
        listingCount: "9K Listing"
    },
    {
        id: "4",
        slug: "yala",
        name: "Yala",
        shortDescription: "Premier wildlife destination",
        description: "Yala National Park is Sri Lanka's most famous wildlife sanctuary, renowned for its high density of leopards and diverse wildlife. The park's varied terrain includes grasslands, forests, and coastal areas, creating a unique ecosystem. Embark on an unforgettable safari adventure to spot leopards, elephants, sloth bears, and numerous bird species in their natural habitat.",
        image: "/images/destinations/yala.png",
        location: "Southern & Uva Provinces, Sri Lanka",
        highlights: [
            "Leopard sightings",
            "Big game safaris",
            "Ancient rock caves",
            "Coastal lagoons",
            "Rich biodiversity",
            "Photography safaris"
        ],
        bestTimeToVisit: "February to July",
        listingCount: "5K Listing"
    },
    {
        id: "5",
        slug: "sigiriya",
        name: "Sigiriya",
        shortDescription: "Ancient rock fortress and UNESCO site",
        description: "Sigiriya, the ancient rock fortress, stands as a testament to Sri Lanka's rich history and architectural brilliance. This UNESCO World Heritage site features stunning frescoes, landscaped gardens, and breathtaking views from the summit. Climb the iconic rock fortress to witness one of the world's most impressive archaeological sites and enjoy panoramic views of the surrounding countryside.",
        image: "/images/destinations/Sigiriya.png",
        location: "Central Province, Sri Lanka",
        highlights: [
            "Ancient rock fortress",
            "Sigiriya frescoes",
            "Water gardens",
            "Mirror wall",
            "Panoramic views",
            "Archaeological museum"
        ],
        bestTimeToVisit: "December to May",
        listingCount: "3K Listing"
    }
];

export function getDestinationBySlug(slug: string): Destination | undefined {
    return destinations.find(dest => dest.slug === slug);
}
