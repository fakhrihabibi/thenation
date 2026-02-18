"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    FaBars,
    FaTimes,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg shadow-neon-purple/5 border-b border-card-border"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="#home" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center font-black text-white text-lg group-hover:shadow-lg group-hover:shadow-neon-purple/40 transition-shadow">
                        TN
                    </div>
                    <span className="text-xl font-extrabold tracking-widest uppercase hidden sm:block">
                        <span className="gradient-text">The Nation</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold uppercase tracking-wider text-muted hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-blue group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                    <a href="#contact" className="btn-glow text-sm py-2.5 px-6">
                        Book Now
                    </a>
                </div>

                {/* Social Icons Desktop */}
                <div className="hidden lg:flex items-center gap-4 text-muted">
                    <a href="#" className="hover:text-neon-purple transition-colors">
                        <FaInstagram size={18} />
                    </a>
                    <a href="#" className="hover:text-neon-blue transition-colors">
                        <FaTwitter size={18} />
                    </a>
                    <a href="#" className="hover:text-neon-pink transition-colors">
                        <FaYoutube size={18} />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden text-white text-2xl z-50"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden fixed inset-0 bg-[#0a0a0f]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 z-40"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-2xl font-bold uppercase tracking-wider text-white hover:text-neon-purple transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="btn-glow mt-4 text-lg py-3 px-10"
                        >
                            Book Now
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
