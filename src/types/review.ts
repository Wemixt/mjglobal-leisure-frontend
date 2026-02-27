/** API: single review item */
export interface ReviewItem {
  id: number;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/** API: pagination meta for reviews list */
export interface ReviewListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** API: reviews list response (data only) */
export interface ReviewListData {
  items: ReviewItem[];
  meta: ReviewListMeta;
}

/** API: full wrapper for reviews list */
export interface ReviewListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewListData;
  timestamp?: string;
  path?: string;
}
