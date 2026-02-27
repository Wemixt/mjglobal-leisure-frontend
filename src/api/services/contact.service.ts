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

export const contactService = {
  submit(payload: ContactPayload): Promise<ContactResponse> {
    return apiPost<ContactResponse>(endpoints.contact.submit, payload);
  },
};
