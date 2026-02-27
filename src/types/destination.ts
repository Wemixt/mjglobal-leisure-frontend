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

/** API: destination summary list item (list endpoint) */
export interface DestinationSummaryItem {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    coverImage: string;
    tags: string[];
    location: string;
    specificName: string;
    bestTime: string;
    tourCount: number;
    views: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

/** API: pagination meta for destination summary list */
export interface DestinationSummaryMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/** API: destination summary list response (data only) */
export interface DestinationSummaryListData {
    items: DestinationSummaryItem[];
    meta: DestinationSummaryMeta;
}

/** API: full wrapper for destination summary list */
export interface DestinationSummaryListResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: DestinationSummaryListData;
    timestamp: string;
    path: string;
}

/** API: key highlight item in destination detail */
export interface DestinationKeyHighlight {
    title: string;
    description: string;
}

/** API: published destination detail (single destination by slug) */
export interface DestinationDetail {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    images: string[];
    tags: string[];
    location: string;
    specificName: string;
    bestTime: string;
    tourCount: number;
    explorerNote: string;
    keyHighlights: DestinationKeyHighlight[];
    status: string;
    publishedAt: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

/** API: full wrapper for destination detail */
export interface DestinationDetailResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: DestinationDetail;
    timestamp: string;
    path: string;
}
