import { apiGet } from "../client";
import { endpoints } from "../endpoints";
import type {
  BlogPost,
  BlogPostDetail,
  BlogPostDetailResponse,
  BlogSummaryListData,
  BlogSummaryListResponse,
} from "@/types";

export const blogService = {
  getAll(): Promise<BlogPost[]> {
    return apiGet<BlogPost[]>(endpoints.blog.list);
  },

  getBySlug(slug: string): Promise<BlogPost | null> {
    return apiGet<BlogPost | null>(endpoints.blog.bySlug(slug));
  },

  /** Paginated summary list for blog listing page */
  getSummaryList(page: number): Promise<BlogSummaryListData> {
    return apiGet<BlogSummaryListResponse>(endpoints.blog.summaryList(page)).then(
      (res) => res.data
    );
  },

  /** Published blog post by slug (NestJS: GET api/v1/blogs/published/:slug) */
  async getPublishedBySlug(slug: string): Promise<BlogPostDetail> {
    const res = await apiGet<BlogPostDetailResponse>(
      endpoints.blog.publishedBySlug(slug)
    );
    return res.data;
  },
};
