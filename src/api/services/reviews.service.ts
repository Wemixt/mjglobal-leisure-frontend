import { apiGet } from "../client";
import { endpoints } from "../endpoints";
import type {
  ReviewListData,
  ReviewListResponse,
} from "@/types";

export const reviewsService = {
  /** Paginated list (limit 3 per page) */
  getList(page: number): Promise<ReviewListData> {
    return apiGet<ReviewListResponse>(endpoints.reviews.list(page)).then(
      (res) => res.data
    );
  },
};
