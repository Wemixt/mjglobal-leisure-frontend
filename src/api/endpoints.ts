/**
 * Central API endpoint paths (public routes, no auth).
 * Base URL is set in the API client; these are path segments only.
 */

const BASE = "";

export const endpoints = {
  // Tours
  tours: {
    list: `${BASE}/tours`,
    bySlug: (slug: string) => `${BASE}/tours/${slug}`,
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

  // Contact form submission (NestJS: POST api/v1/contact/message)
  contact: {
    submit: `api/v1/contact/message`,
  },

  // Testimonials (if needed)
  testimonials: {
    list: `${BASE}/testimonials`,
  },
} as const;
