import { apiGet } from "../client";
import { endpoints } from "../endpoints";
import type { Tour } from "@/types";

export const toursService = {
  getAll(): Promise<Tour[]> {
    return apiGet<Tour[]>(endpoints.tours.list);
  },

  getBySlug(slug: string): Promise<Tour | null> {
    return apiGet<Tour | null>(endpoints.tours.bySlug(slug));
  },
};
