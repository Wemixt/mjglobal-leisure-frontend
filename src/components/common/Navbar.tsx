"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Tour packages", href: "/tours" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed left-0 right-0 z-[100] transition-all duration-300 md:top-8",
                isScrolled
                    ? "bg-white shadow-md md:top-0 py-3"
                    : "bg-white md:bg-transparent py-3 md:py-5 md:py-0"
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="relative flex items-center gap-2 px-10">
                    <Image
                        src="/images/logo/mj_logo.png"
                        alt="MJ Global Leisure"
                        width={150}
                        height={50}
                        className="h-auto w-auto max-h-12"
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-semibold transition-colors hover:text-brand-orange",
                                isScrolled ? "text-gray-800" : "text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className={cn(
                            "rounded-full px-6 py-2 text-sm font-bold transition-all hover:scale-105",
                            isScrolled
                                ? "bg-brand-orange text-white"
                                : "bg-white text-brand-orange"
                        )}
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6 text-gray-800" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-800" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[105] md:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Sidebar */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-[85%] max-w-sm z-[110] bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden",
                    "flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image
                            src="/images/logo/mj_logo.png"
                            alt="MJ Global Leisure"
                            width={120}
                            height={40}
                            className="h-auto w-auto max-h-10"
                        />
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-6">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-4 py-3 rounded-lg text-base font-medium text-gray-700",
                                    "transition-all duration-200",
                                    "hover:bg-brand-orange/10 hover:text-brand-orange",
                                    "active:bg-brand-orange/20"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer CTA */}
                <div className="p-4 sm:p-5 border-t border-gray-100 bg-[#FAF9F6]">
                    <Link
                        href="/contact"
                        className={cn(
                            "w-full inline-flex items-center justify-center gap-2",
                            "px-5 py-3 rounded-xl",
                            "bg-brand-orange text-white font-semibold text-sm",
                            "shadow-md shadow-brand-orange/30",
                            "transition-all duration-200",
                            "hover:bg-brand-orange/90 hover:shadow-lg hover:scale-[1.02]",
                            "active:scale-[0.98]"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
