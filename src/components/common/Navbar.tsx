"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Tours", href: "/tours" },
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
                    : "bg-transparent py-5 md:py-0"
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
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isScrolled ? "text-gray-800" : "text-white"} />
                    ) : (
                        <Menu className={isScrolled ? "text-gray-800" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 top-0 z-[110] flex flex-col bg-white p-8 transition-transform duration-300 md:hidden",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex justify-end">
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={32} className="text-gray-800" />
                    </button>
                </div>
                <div className="mt-12 flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xl font-bold text-gray-800"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="mt-4 rounded-full bg-brand-orange py-3 text-center text-lg font-bold text-white shadow-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
