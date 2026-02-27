export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    publishedAt: string;
    readTime: string;
    category: string;
    tags?: string[];
}

/** API: blog summary list item (list endpoint) */
export interface BlogSummaryItem {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    coverImage: string;
    tags: string[];
    readingTime: string;
    authorId: string;
    authorName: string;
    category: string;
    views: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

/** API: pagination meta for blog summary list */
export interface BlogSummaryMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/** API: blog summary list response (data only) */
export interface BlogSummaryListData {
    items: BlogSummaryItem[];
    meta: BlogSummaryMeta;
}

/** API: full wrapper for blog summary list */
export interface BlogSummaryListResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: BlogSummaryListData;
    timestamp: string;
    path: string;
}

/** API: published blog post detail (single post by slug) */
export interface BlogPostDetail {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    images: string[];
    tags: string[];
    readingTime: string;
    category: string;
    relatedBlogs: BlogRelatedItem[];
    status: string;
    publishedAt: string;
    views: number;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
}

/** API: related blog item in detail response */
export interface BlogRelatedItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: string;
    publishedAt?: string;
}

/** API: full wrapper for blog post detail */
export interface BlogPostDetailResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: BlogPostDetail;
    timestamp: string;
    path: string;
}
