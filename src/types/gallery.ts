/** API: single gallery image item (GET api/v1/gallery/?page=1) */
export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
}

/** API: pagination meta for gallery list */
export interface GalleryListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** API: gallery list response (data only) */
export interface GalleryListData {
  items: GalleryItem[];
  meta: GalleryListMeta;
}

/** API: full wrapper for gallery list (NestJS-style) */
export interface GalleryListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GalleryListData;
  timestamp?: string;
  path?: string;
}
