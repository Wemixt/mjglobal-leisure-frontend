import { apiPost } from "../client";
import { endpoints } from "../endpoints";

export interface CreateBookingPayload {
  tourPackageId: number;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  whatsapp: string;
  arrivalDate: string;
  passengers: number;
  clientMessage: string;
}

export interface CreateBookingResponse {
  success?: boolean;
  message?: string;
}

export const bookingsService = {
  create(payload: CreateBookingPayload): Promise<CreateBookingResponse> {
    return apiPost<CreateBookingResponse>(endpoints.bookings.create, payload);
  },
};

