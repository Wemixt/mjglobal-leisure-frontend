"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { siteConfig } from "@/data/config";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const subjectOptions = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General Inquiry" },
  { value: "booking", label: "Booking & Reservations" },
  { value: "custom", label: "Custom Tour Request" },
  { value: "partnership", label: "Partnership & B2B" },
  { value: "feedback", label: "Feedback & Support" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("idle");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call – replace with your backend/API route
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTouched({});
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative w-full h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/images/hero/eveningbeach.jpg"
            alt="Contact MJ Global Leisure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </section>

        {/* Contact Details Cards */}
        <section className="relative -mt-16 md:-mt-20 z-20 px-4 sm:px-6 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-lg bg-white shadow-md border border-gray-100",
                  "transition-all duration-300 hover:shadow-lg hover:border-brand-orange/20 hover:-translate-y-0.5"
                )}
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Address</h3>
                  <p className="text-gray-900 font-semibold text-sm leading-tight">
                    {siteConfig.contact.address}
                  </p>
                  <p className="text-brand-orange text-xs font-medium mt-1">
                    Open in Maps →
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className={cn(
                  "group flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-lg bg-white shadow-md border border-gray-100",
                  "transition-all duration-300 hover:shadow-lg hover:border-brand-orange/20 hover:-translate-y-0.5"
                )}
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Email</h3>
                  <p className="text-gray-900 font-semibold text-sm break-all leading-tight">
                    {siteConfig.contact.email}
                  </p>
                  <p className="text-brand-orange text-xs font-medium mt-1">
                    Send an email →
                  </p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className={cn(
                  "group flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-lg bg-white shadow-md border border-gray-100",
                  "transition-all duration-300 hover:shadow-lg hover:border-brand-orange/20 hover:-translate-y-0.5"
                )}
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0.5">Phone</h3>
                  <p className="text-gray-900 font-semibold text-sm leading-tight">
                    {siteConfig.contact.phone}
                  </p>
                  <p className="text-brand-orange text-xs font-medium mt-1">
                    Call us →
                  </p>
                </div>
              </a>
            </div>

            {/* Office Hours + Social Row - enhanced */}
            <div className="mt-6 md:mt-8 rounded-2xl border-2 border-brand-orange/20 bg-gradient-to-r from-brand-orange/5 via-white to-brand-orange/5 shadow-xl shadow-gray-200/50 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-orange/15 flex items-center justify-center shadow-inner ring-2 ring-brand-orange/20">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-orange/90">Office Hours</p>
                    <p className="text-gray-900 font-bold text-sm sm:text-base md:text-lg mt-0.5">Mon – Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-gray-500 text-sm mt-1">We’re here to help plan your trip.</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200" aria-hidden />
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-orange/90">Follow us</p>
                    <p className="text-gray-600 text-xs sm:text-sm mt-0.5">Stay updated with offers & travel tips</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:scale-110 transition-all shadow-sm"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                    </a>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:scale-110 transition-all shadow-sm"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                    </a>
                    <a
                      href={siteConfig.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20 hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:scale-110 transition-all shadow-sm"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 md:py-20 lg:py-24 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-4xl">
            <div className="text-center mb-8 md:mb-12 space-y-2">
              <p
                className="text-brand-orange text-lg md:text-xl italic tracking-wide"
                style={{ fontFamily: "cursive" }}
              >
                Send a Message
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
                We’ll Get Back to You Soon
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Fill in the form below and our team will respond within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-10">
              {submitStatus === "success" ? (
                <div className="text-center py-10 sm:py-12 px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto">
                    Thank you for reaching out. We’ll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus("idle")}
                    className="text-brand-orange font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                        Full Name <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={cn(
                          "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400",
                          "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                          "text-sm md:text-base",
                          touched.name && errors.name ? "border-red-400" : "border-gray-200"
                        )}
                      />
                      {touched.name && errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Email <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com"
                        className={cn(
                          "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400",
                          "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                          "text-sm md:text-base",
                          touched.email && errors.email ? "border-red-400" : "border-gray-200"
                        )}
                      />
                      {touched.email && errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="+94 77 123 4567"
                        className={cn(
                          "w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400",
                          "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                          "text-sm md:text-base"
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cn(
                          "w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900",
                          "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                          "text-sm md:text-base appearance-none cursor-pointer"
                        )}
                      >
                        {subjectOptions.map((opt) => (
                          <option key={opt.value || "empty"} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                      Message <span className="text-brand-orange">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your travel plans, questions, or how we can help..."
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400 resize-y min-h-[120px]",
                        "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                        "text-sm md:text-base",
                        touched.message && errors.message ? "border-red-400" : "border-gray-200"
                      )}
                    />
                    {touched.message && errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl",
                        "bg-brand-orange text-white font-bold text-sm sm:text-base md:text-lg",
                        "shadow-lg shadow-brand-orange/30 transition-all",
                        "hover:bg-brand-orange/90 hover:scale-[1.02] hover:shadow-xl",
                        "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
                        "min-h-[48px] sm:min-h-[52px]"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Quick Response Strip */}
        <section className="py-10 md:py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 p-4 md:p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange/10">
                <MessageCircle className="w-6 h-6 text-brand-orange" />
              </div>
              <div className="text-left sm:text-center">
                <p className="text-gray-900 font-semibold text-base md:text-lg">
                  Prefer to talk? Call us at{" "}
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="text-brand-orange font-bold hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </p>
                <p className="text-gray-600 text-sm mt-0.5">We’re happy to help with bookings and custom itineraries.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
