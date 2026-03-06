/**
 * Central API endpoint paths (public routes, no auth).
 * Base URL is set in the API client; these are path segments only.
 */

const BASE = "";

export const endpoints = {
  // Tours
  tours: {
    list: `${BASE}/tours`,
    /** Tour package detail by slug: GET api/v1/tour-packages/:slug */
    bySlug: (slug: string) => `api/v1/tour-packages/${slug}`,
    /** Paginated summary list: GET api/v1/tour-packages/package/summary?page=1 */
    summaryList: (page: number) =>
      `api/v1/tour-packages/package/summary?page=${page}`,
  },

  // Destinations
  destinations: {
    list: `${BASE}/destinations`,
    bySlug: (slug: string) => `${BASE}/destinations/${slug}`,
    /** Paginated summary list: GET api/v1/destinations/summary/list?page=1 */
    summaryList: (page: number) => `api/v1/destinations/summary/list?page=${page}`,
    /** Published destination by slug: GET api/v1/destinations/published/:slug */
    publishedBySlug: (slug: string) => `api/v1/destinations/published/${slug}`,
  },

  // Blog
  blog: {
    list: `${BASE}/blog`,
    bySlug: (slug: string) => `${BASE}/blog/${slug}`,
    /** Paginated summary list: GET api/v1/blogs/summary/list?page=1 */
    summaryList: (page: number) => `api/v1/blogs/summary/list?page=${page}`,
    /** Published post by slug: GET api/v1/blogs/published/:slug */
    publishedBySlug: (slug: string) => `api/v1/blogs/published/${slug}`,
  },

  // Contact
  contact: {
    /** Form submission: POST api/v1/contact/message */
    submit: `api/v1/contact/message`,
    /** Newsletter subscribe: POST api/v1/contact/subscribe */
    subscribe: `api/v1/contact/subscribe`,
  },

  // Bookings
  bookings: {
    /** Create booking: POST api/v1/bookings */
    create: `api/v1/bookings`,
  },

  // Reviews (testimonials): GET api/v1/reviews?page=1, limit 3
  reviews: {
    list: (page: number) => `api/v1/reviews?page=${page}`,
  },

  // Gallery: GET api/v1/gallery/?page=1
  gallery: {
    list: (page: number) => `api/v1/gallery/?page=${page}`,
  },
} as const;
