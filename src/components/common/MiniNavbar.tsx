"use client";

import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function MiniNavbar() {
    return (
        <div className="absolute top-0 left-0 right-0 z-50 hidden border-b border-white/20 bg-transparent py-2 text-white md:block">
            <div className="container mx-auto flex items-center justify-between px-4 text-xs font-medium">
                <div className="flex items-center gap-6">
                    <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="flex items-center gap-2 transition-colors hover:text-brand-gold"
                    >
                        <Mail size={14} />
                        <span>{siteConfig.contact.email}</span>
                    </a>
                    <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 transition-colors hover:text-brand-gold"
                    >
                        <Phone size={14} />
                        <span>{siteConfig.contact.phone}</span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110 hover:text-brand-gold"
                    >
                        <Facebook size={14} />
                    </a>
                    <a
                        href={siteConfig.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110 hover:text-brand-gold"
                    >
                        <Instagram size={14} />
                    </a>
                    <a
                        href={siteConfig.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-110 hover:text-brand-gold"
                    >
                        <Twitter size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
}
