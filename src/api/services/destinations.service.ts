import { apiGet } from "../client";
import { endpoints } from "../endpoints";
import type {
  Destination,
  DestinationDetail,
  DestinationDetailResponse,
  DestinationSummaryListData,
  DestinationSummaryListResponse,
} from "@/types";

export const destinationsService = {
  getAll(): Promise<Destination[]> {
    return apiGet<Destination[]>(endpoints.destinations.list);
  },

  getBySlug(slug: string): Promise<Destination | null> {
    return apiGet<Destination | null>(endpoints.destinations.bySlug(slug));
  },

  /** Paginated summary list for destinations listing page */
  getSummaryList(page: number): Promise<DestinationSummaryListData> {
    return apiGet<DestinationSummaryListResponse>(
      endpoints.destinations.summaryList(page)
    ).then((res) => res.data);
  },

  /** Published destination by slug (NestJS: GET api/v1/destinations/published/:slug) */
  async getPublishedBySlug(slug: string): Promise<DestinationDetail> {
    const res = await apiGet<DestinationDetailResponse>(
      endpoints.destinations.publishedBySlug(slug)
    );
    return res.data;
  },
};
