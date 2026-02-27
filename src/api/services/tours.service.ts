import { apiGet } from "../client";
import { endpoints } from "../endpoints";
import type {
  Tour,
  TourDetail,
  TourDetailResponse,
  TourSummaryListData,
  TourSummaryListResponse,
} from "@/types";

export const toursService = {
  getAll(): Promise<Tour[]> {
    return apiGet<Tour[]>(endpoints.tours.list);
  },

  /** Tour package detail by slug */
  getBySlug(slug: string): Promise<TourDetail> {
    return apiGet<TourDetailResponse>(endpoints.tours.bySlug(slug)).then(
      (res) => res.data
    );
  },

  /** Paginated summary list for tour packages listing page */
  getSummaryList(page: number): Promise<TourSummaryListData> {
    return apiGet<TourSummaryListResponse>(endpoints.tours.summaryList(page)).then(
      (res) => res.data
    );
  },
};
