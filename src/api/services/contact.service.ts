import { apiPost } from "../client";
import { endpoints } from "../endpoints";

/** API body: name, Phoneno (+country code), subject, email, message */
export interface ContactPayload {
  name: string;
  Phoneno: string;
  subject: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  message?: string;
}

/** API body for subscribe */
export interface SubscribePayload {
  email: string;
}

/** API response for subscribe (success / already subscribed) */
export interface SubscribeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: unknown;
  timestamp?: string;
  path?: string;
}

export const contactService = {
  submit(payload: ContactPayload): Promise<ContactResponse> {
    return apiPost<ContactResponse>(endpoints.contact.submit, payload);
  },

  subscribe(payload: SubscribePayload): Promise<SubscribeResponse> {
    return apiPost<SubscribeResponse>(endpoints.contact.subscribe, payload);
  },
};
