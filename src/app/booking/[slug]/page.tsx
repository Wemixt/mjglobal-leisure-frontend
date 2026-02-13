"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { getTourBySlug } from "@/data/tours";
import { ArrowLeft, Clock, Calendar, Users, CheckCircle2, Send, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
    { value: "", label: "Select your country" },
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "IT", label: "Italy" },
    { value: "ES", label: "Spain" },
    { value: "NL", label: "Netherlands" },
    { value: "BE", label: "Belgium" },
    { value: "CH", label: "Switzerland" },
    { value: "AT", label: "Austria" },
    { value: "SE", label: "Sweden" },
    { value: "NO", label: "Norway" },
    { value: "DK", label: "Denmark" },
    { value: "FI", label: "Finland" },
    { value: "IN", label: "India" },
    { value: "CN", label: "China" },
    { value: "JP", label: "Japan" },
    { value: "KR", label: "South Korea" },
    { value: "SG", label: "Singapore" },
    { value: "MY", label: "Malaysia" },
    { value: "TH", label: "Thailand" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "ZA", label: "South Africa" },
    { value: "NZ", label: "New Zealand" },
    { value: "BR", label: "Brazil" },
    { value: "MX", label: "Mexico" },
    { value: "AR", label: "Argentina" },
    { value: "OTHER", label: "Other" },
];

export default function BookingPage() {
    const params = useParams();
    const slug = params.slug as string;
    const tour = getTourBySlug(slug);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        passengers: "",
        arrivalDate: "",
        departureDate: "",
        specialRequests: "",
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    if (!tour) {
        notFound();
    }

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
        if (!formData.phone.trim()) errors.phone = "Phone number is required";
        if (!formData.country) errors.country = "Country is required";
        if (!formData.passengers) errors.passengers = "Number of passengers is required";
        else if (parseInt(formData.passengers) < 1) errors.passengers = "At least 1 passenger required";
        if (!formData.arrivalDate) errors.arrivalDate = "Arrival date is required";
        return errors;
    };

    const errors = validate();
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            name: true,
            email: true,
            phone: true,
            country: true,
            passengers: true,
            arrivalDate: true,
        });
        if (!isValid) return;

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Simulate API call – replace with your backend/API route
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                country: "",
                passengers: "",
                arrivalDate: "",
                departureDate: "",
                specialRequests: "",
            });
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
                <section className="relative w-full h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
                    <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                    <div className="absolute top-4 md:top-6 left-3 sm:left-4 md:left-6 z-20">
                        <Link
                            href={`/tours/${slug}`}
                            className="flex items-center gap-1.5 md:gap-2 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-full shadow-lg hover:bg-white transition-all group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-800 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-gray-800">Back to Tour</span>
                        </Link>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 lg:p-16 z-10">
                        <div className="container mx-auto max-w-6xl">
                            <div className="max-w-3xl">
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                                    Book: {tour.title}
                                </h1>
                                <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl">
                                    Complete your booking by filling out the form below
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking Section */}
                <section className="py-8 md:py-12 lg:py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                            {/* Tour Details Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-20 md:top-24 space-y-4 md:space-y-5">
                                    <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-4 md:p-5 lg:p-6 shadow-md border border-gray-100">
                                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-4 md:mb-5">Tour Summary</h3>
                                        
                                        <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden mb-4">
                                            <Image
                                                src={tour.image}
                                                alt={tour.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{tour.title}</h4>

                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex items-start gap-2.5 md:gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-orange" />
                                                </div>
                                                <div>
                                                    <h5 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Duration</h5>
                                                    <p className="text-gray-500 text-xs md:text-sm">{tour.duration}</p>
                                                </div>
                                            </div>
                                            {tour.bestTime && (
                                                <div className="flex items-start gap-2.5 md:gap-3">
                                                    <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand-blue" />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-xs md:text-sm font-semibold text-gray-900 mb-0.5">Best time</h5>
                                                        <p className="text-gray-500 text-xs md:text-sm">{tour.bestTime}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-10">
                                    {submitStatus === "success" ? (
                                        <div className="text-center py-10 sm:py-12 px-4">
                                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 mb-4">
                                                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                                            </div>
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Booking Request Submitted</h3>
                                            <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md mx-auto">
                                                Thank you for your booking request! We'll review your details and get back to you within 24 hours to confirm your reservation.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                <Link
                                                    href="/tours"
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white font-semibold text-sm sm:text-base hover:bg-brand-orange/90 transition-all"
                                                >
                                                    View More Tours
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => setSubmitStatus("idle")}
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-orange font-semibold text-sm sm:text-base border-2 border-brand-orange hover:bg-brand-orange/5 transition-all"
                                                >
                                                    Book Another Tour
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-6 md:mb-8">
                                                <p
                                                    className="text-brand-orange text-lg md:text-xl italic tracking-wide mb-2"
                                                    style={{ fontFamily: "cursive" }}
                                                >
                                                    Booking Form
                                                </p>
                                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
                                                    Complete Your Booking
                                                </h2>
                                                <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2">
                                                    Please fill in your details to proceed with the booking
                                                </p>
                                            </div>

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
                                                            Phone Number <span className="text-brand-orange">*</span>
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
                                                                "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400",
                                                                "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                                                                "text-sm md:text-base",
                                                                touched.phone && errors.phone ? "border-red-400" : "border-gray-200"
                                                            )}
                                                        />
                                                        {touched.phone && errors.phone && (
                                                            <p className="text-sm text-red-500">{errors.phone}</p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
                                                            Country <span className="text-brand-orange">*</span>
                                                        </label>
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            value={formData.country}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={cn(
                                                                "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900",
                                                                "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                                                                "text-sm md:text-base appearance-none cursor-pointer",
                                                                touched.country && errors.country ? "border-red-400" : "border-gray-200"
                                                            )}
                                                        >
                                                            {countries.map((country) => (
                                                                <option key={country.value || "empty"} value={country.value}>
                                                                    {country.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {touched.country && errors.country && (
                                                            <p className="text-sm text-red-500">{errors.country}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                                                    <div className="space-y-2">
                                                        <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700">
                                                            Number of Passengers <span className="text-brand-orange">*</span>
                                                        </label>
                                                        <input
                                                            id="passengers"
                                                            name="passengers"
                                                            type="number"
                                                            min="1"
                                                            max="20"
                                                            value={formData.passengers}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            placeholder="2"
                                                            className={cn(
                                                                "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900 placeholder:text-gray-400",
                                                                "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                                                                "text-sm md:text-base",
                                                                touched.passengers && errors.passengers ? "border-red-400" : "border-gray-200"
                                                            )}
                                                        />
                                                        {touched.passengers && errors.passengers && (
                                                            <p className="text-sm text-red-500">{errors.passengers}</p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label htmlFor="arrivalDate" className="block text-sm font-semibold text-gray-700">
                                                            Arrival Date <span className="text-brand-orange">*</span>
                                                        </label>
                                                        <input
                                                            id="arrivalDate"
                                                            name="arrivalDate"
                                                            type="date"
                                                            value={formData.arrivalDate}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            min={new Date().toISOString().split('T')[0]}
                                                            className={cn(
                                                                "w-full px-4 py-3 md:py-3.5 rounded-xl border bg-gray-50/50 text-gray-900",
                                                                "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                                                                "text-sm md:text-base",
                                                                touched.arrivalDate && errors.arrivalDate ? "border-red-400" : "border-gray-200"
                                                            )}
                                                        />
                                                        {touched.arrivalDate && errors.arrivalDate && (
                                                            <p className="text-sm text-red-500">{errors.arrivalDate}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="departureDate" className="block text-sm font-semibold text-gray-700">
                                                        Departure Date (Optional)
                                                    </label>
                                                    <input
                                                        id="departureDate"
                                                        name="departureDate"
                                                        type="date"
                                                        value={formData.departureDate}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
                                                        className={cn(
                                                            "w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900",
                                                            "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                                                            "text-sm md:text-base"
                                                        )}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700">
                                                        Special Requests or Notes
                                                    </label>
                                                    <textarea
                                                        id="specialRequests"
                                                        name="specialRequests"
                                                        value={formData.specialRequests}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder="Any dietary requirements, accessibility needs, or special requests..."
                                                        rows={4}
                                                        className={cn(
                                                            "w-full px-4 py-3 md:py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 resize-y min-h-[100px]",
                                                            "focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all",
                                                            "text-sm md:text-base"
                                                        )}
                                                    />
                                                </div>

                                                {submitStatus === "error" && (
                                                    <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
                                                        Something went wrong. Please try again or contact us directly.
                                                    </p>
                                                )}

                                                <div className="pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={cn(
                                                            "w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg",
                                                            "bg-brand-orange text-white font-semibold text-sm sm:text-base",
                                                            "shadow-md shadow-brand-orange/30 transition-all",
                                                            "hover:bg-brand-orange/90 hover:scale-[1.01] hover:shadow-lg",
                                                            "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
                                                            "min-h-[44px] sm:min-h-[48px]"
                                                        )}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                <span>Submitting...</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                Submit Booking Request
                                                                <Send className="w-4 h-4" />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
