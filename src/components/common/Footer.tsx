"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/config";

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
        <footer className="bg-gray-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="relative h-12 w-48">
                            <Image
                                src="/images/logo/mj_logo.png"
                                alt="MJ Global Leisure"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600">
                            MJ Global Leisure is your premier partner for exploring the hidden
                            gems of Sri Lanka. From pristine beaches to emerald forests, we
                            curate experiences that last a lifetime.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href={siteConfig.social.facebook}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition-all hover:bg-brand-blue hover:text-white"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href={siteConfig.social.instagram}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition-all hover:bg-brand-blue hover:text-white"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href={siteConfig.social.twitter}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition-all hover:bg-brand-blue hover:text-white"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="flex flex-col gap-6">
                            <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-brand-orange"
                                        >
                                            <ArrowRight size={14} className="opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                                            <span>{link.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>
                        <ul className="flex flex-col gap-4">
                            <li className="flex gap-3 text-sm text-gray-600">
                                <MapPin className="shrink-0 text-brand-orange" size={20} />
                                <span>{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Mail className="shrink-0 text-brand-orange" size={20} />
                                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-orange">
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <Phone className="shrink-0 text-brand-orange" size={20} />
                                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-brand-orange">
                                    {siteConfig.contact.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
