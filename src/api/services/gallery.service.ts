import { apiGet } from "../client";
import { endpoints } from "../endpoints";
import type {
  GalleryListData,
  GalleryListResponse,
} from "@/types";

export const galleryService = {
  /** Paginated gallery images list for gallery page */
  getList(page: number): Promise<GalleryListData> {
    return apiGet<GalleryListResponse>(endpoints.gallery.list(page)).then(
      (res) => res.data
    );
  },
};
