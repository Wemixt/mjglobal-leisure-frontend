"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ArrowRight, Send, Clock } from "lucide-react";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/utils";

const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", href: "/" },
            { name: "Tour packages", href: "/tours" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
        ],
    },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setIsSubmitted(true);
        setIsSubmitting(false);
        setEmail("");
        
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <footer className="relative bg-gradient-to-br from-brand-orange via-brand-orange to-[#D94A1F] pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
            {/* Enhanced Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 animate-pulse delay-300" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8 md:mb-10">
                    {/* Brand Info Section */}
                    <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-1">
                        <Link href="/" className="relative h-9 sm:h-10 w-36 sm:w-40 group">
                            <Image
                                src="/images/logo/mj_logo.png"
                                alt="MJ Global Leisure"
                                fill
                                className="object-contain object-left brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-xs sm:text-sm leading-relaxed text-white/95 max-w-sm font-light">
                            MJ Global Leisure is your premier partner for exploring the hidden
                            gems of Sri Lanka. From pristine beaches to emerald forests, we
                            curate experiences that last a lifetime.
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-2 sm:gap-3 mt-1">
                            <a
                                href={siteConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "group flex h-9 w-9 min-w-[36px] min-h-[36px] items-center justify-center rounded-lg",
                                    "bg-white/15 backdrop-blur-md text-white shadow-md border border-white/20",
                                    "transition-all duration-300 hover:bg-white hover:text-brand-orange",
                                    "hover:scale-110 hover:shadow-lg hover:border-white/40 active:scale-95",
                                    "hover:-translate-y-0.5"
                                )}
                                aria-label="Facebook"
                            >
                                <Facebook size={18} className="transition-transform duration-300 group-hover:scale-110" />
                            </a>
                            <a
                                href={siteConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "group flex h-9 w-9 min-w-[36px] min-h-[36px] items-center justify-center rounded-lg",
                                    "bg-white/15 backdrop-blur-md text-white shadow-md border border-white/20",
                                    "transition-all duration-300 hover:bg-white hover:text-brand-orange",
                                    "hover:scale-110 hover:shadow-lg hover:border-white/40 active:scale-95",
                                    "hover:-translate-y-0.5"
                                )}
                                aria-label="Instagram"
                            >
                                <Instagram size={18} className="transition-transform duration-300 group-hover:scale-110" />
                            </a>
                            <a
                                href={siteConfig.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "group flex h-9 w-9 min-w-[36px] min-h-[36px] items-center justify-center rounded-lg",
                                    "bg-white/15 backdrop-blur-md text-white shadow-md border border-white/20",
                                    "transition-all duration-300 hover:bg-white hover:text-brand-orange",
                                    "hover:scale-110 hover:shadow-lg hover:border-white/40 active:scale-95",
                                    "hover:-translate-y-0.5"
                                )}
                                aria-label="Twitter"
                            >
                                <Twitter size={18} className="transition-transform duration-300 group-hover:scale-110" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col gap-3 sm:gap-4">
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                                {section.title}
                            </h3>
                            <ul className="flex flex-row flex-wrap gap-2 sm:flex-col sm:gap-2.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "group flex items-center gap-2 text-xs sm:text-sm",
                                                "text-white/90 transition-all duration-300",
                                                "hover:text-white sm:hover:translate-x-1.5",
                                                "min-h-[36px] py-1.5 px-2 rounded-lg",
                                                "hover:bg-white/10 active:bg-white/15",
                                                "font-medium whitespace-nowrap"
                                            )}
                                        >
                                            <ArrowRight 
                                                size={14} 
                                                className={cn(
                                                    "opacity-0 transition-all duration-300 -translate-x-2",
                                                    "sm:group-hover:opacity-100 sm:group-hover:translate-x-0",
                                                    "shrink-0 hidden sm:block"
                                                )} 
                                            />
                                            <span className="break-words">{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info Section */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            Contact Us
                        </h3>
                        <ul className="flex flex-col gap-2.5 sm:gap-3">
                            <li className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/95 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
                                    <MapPin className="text-white min-w-[16px]" size={16} />
                                </div>
                                <span className="leading-relaxed break-words pt-0.5">{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/95 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
                                    <Mail className="text-white min-w-[16px]" size={16} />
                                </div>
                                <a 
                                    href={`mailto:${siteConfig.contact.email}`} 
                                    className={cn(
                                        "hover:text-white transition-colors duration-300",
                                        "underline-offset-2 hover:underline break-all",
                                        "min-h-[36px] flex items-center py-1 px-1 pt-0.5",
                                        "font-medium"
                                    )}
                                >
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/95 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
                                    <Phone className="text-white min-w-[16px]" size={16} />
                                </div>
                                <a 
                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} 
                                    className={cn(
                                        "hover:text-white transition-colors duration-300",
                                        "underline-offset-2 hover:underline break-words",
                                        "min-h-[36px] flex items-center py-1 px-1",
                                        "font-medium"
                                    )}
                                >
                                    {siteConfig.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/95 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
                                    <Clock className="text-white min-w-[16px]" size={16} />
                                </div>
                                <span className="pt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-1">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            Newsletter
                        </h3>
                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                            Subscribe to get special offers and travel updates.
                        </p>
                        
                        {isSubmitted ? (
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                        <Send size={14} className="text-white" />
                                    </div>
                                    <p className="text-xs text-white font-medium">Thank you for subscribing!</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                                <div className="flex flex-col gap-2">
                                    <div className="relative">
                                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/70">
                                            <Mail className="w-3.5 h-3.5" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className={cn(
                                                "w-full pl-9 pr-3 py-2 rounded-lg",
                                                "bg-white/15 backdrop-blur-sm border border-white/20",
                                                "text-white placeholder:text-white/60",
                                                "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40",
                                                "transition-all duration-300",
                                                "text-xs sm:text-sm"
                                            )}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={cn(
                                            "w-full px-3 py-2 rounded-lg",
                                            "bg-white text-brand-orange font-semibold",
                                            "hover:bg-white/95 transition-all duration-300",
                                            "shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
                                            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                                            "flex items-center justify-center gap-1.5",
                                            "text-xs uppercase tracking-wide"
                                        )}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-3.5 h-3.5 border-2 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" />
                                                <span>Subscribing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Subscribe</span>
                                                <Send size={14} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/25 pt-4 sm:pt-5 md:pt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-white/85 text-center sm:text-left font-medium">
                            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                        </p>
                        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/85">
                            <Link 
                                href="/privacy" 
                                className={cn(
                                    "hover:text-white transition-all duration-300",
                                    "underline-offset-2 hover:underline",
                                    "min-h-[36px] flex items-center justify-center px-2 py-1.5",
                                    "hover:bg-white/10 rounded-lg active:bg-white/15",
                                    "whitespace-nowrap font-medium"
                                )}
                            >
                                Privacy Policy
                            </Link>
                            <span className="text-white/30 hidden sm:inline">•</span>
                            <Link 
                                href="/terms" 
                                className={cn(
                                    "hover:text-white transition-all duration-300",
                                    "underline-offset-2 hover:underline",
                                    "min-h-[36px] flex items-center justify-center px-2 py-1.5",
                                    "hover:bg-white/10 rounded-lg active:bg-white/15",
                                    "whitespace-nowrap font-medium"
                                )}
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
