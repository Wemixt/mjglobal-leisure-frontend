"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/utils";

const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", href: "/" },
            { name: "Destinations", href: "/destinations" },
            { name: "Tours", href: "/tours" },
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Support",
        links: [
            { name: "FAQs", href: "/faqs" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms & Conditions", href: "/terms" },
            { name: "Support Center", href: "/support" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative bg-brand-orange pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            
            <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
                <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="relative h-12 w-48">
                            <Image
                                src="/images/logo/mj_logo.png"
                                alt="MJ Global Leisure"
                                fill
                                className="object-contain object-left brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm md:text-base leading-relaxed text-white/90 max-w-xs">
                            MJ Global Leisure is your premier partner for exploring the hidden
                            gems of Sri Lanka. From pristine beaches to emerald forests, we
                            curate experiences that last a lifetime.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href={siteConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "flex h-11 w-11 items-center justify-center rounded-full",
                                    "bg-white/10 backdrop-blur-sm text-white shadow-lg",
                                    "transition-all duration-300 hover:bg-white hover:text-brand-orange",
                                    "hover:scale-110 hover:shadow-xl"
                                )}
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href={siteConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "flex h-11 w-11 items-center justify-center rounded-full",
                                    "bg-white/10 backdrop-blur-sm text-white shadow-lg",
                                    "transition-all duration-300 hover:bg-white hover:text-brand-orange",
                                    "hover:scale-110 hover:shadow-xl"
                                )}
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href={siteConfig.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "flex h-11 w-11 items-center justify-center rounded-full",
                                    "bg-white/10 backdrop-blur-sm text-white shadow-lg",
                                    "transition-all duration-300 hover:bg-white hover:text-brand-orange",
                                    "hover:scale-110 hover:shadow-xl"
                                )}
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col gap-6">
                            <h3 className="text-lg md:text-xl font-bold text-white">{section.title}</h3>
                            <ul className="flex flex-col gap-3 md:gap-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "group flex items-center gap-2 text-sm md:text-base",
                                                "text-white/90 transition-all duration-300",
                                                "hover:text-white hover:translate-x-1"
                                            )}
                                        >
                                            <ArrowRight 
                                                size={14} 
                                                className={cn(
                                                    "opacity-0 transition-all duration-300 -translate-x-2",
                                                    "group-hover:opacity-100 group-hover:translate-x-0"
                                                )} 
                                            />
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg md:text-xl font-bold text-white">Contact Us</h3>
                        <ul className="flex flex-col gap-4 md:gap-5">
                            <li className="flex gap-3 md:gap-4 text-sm md:text-base text-white/90">
                                <MapPin className="shrink-0 text-white mt-0.5" size={20} />
                                <span className="leading-relaxed">{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-sm md:text-base text-white/90">
                                <Mail className="shrink-0 text-white" size={20} />
                                <a 
                                    href={`mailto:${siteConfig.contact.email}`} 
                                    className={cn(
                                        "hover:text-white transition-colors duration-300",
                                        "underline-offset-2 hover:underline"
                                    )}
                                >
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 md:gap-4 text-sm md:text-base text-white/90">
                                <Phone className="shrink-0 text-white" size={20} />
                                <a 
                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} 
                                    className={cn(
                                        "hover:text-white transition-colors duration-300",
                                        "underline-offset-2 hover:underline"
                                    )}
                                >
                                    {siteConfig.contact.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 md:mt-16 border-t border-white/20 pt-6 md:pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm md:text-base text-white/80 text-center md:text-left">
                            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm md:text-base text-white/80">
                            <Link 
                                href="/privacy" 
                                className="hover:text-white transition-colors duration-300 underline-offset-2 hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            <span className="text-white/40">|</span>
                            <Link 
                                href="/terms" 
                                className="hover:text-white transition-colors duration-300 underline-offset-2 hover:underline"
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
