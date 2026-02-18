"use client";
import {
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaSpotify,
    FaHeart,
    FaArrowUp,
} from "react-icons/fa";

const footerLinks = {
    Navigation: [
        { name: "Home", href: "#home" },
        { name: "Events", href: "#events" },
        { name: "Gallery", href: "#gallery" },
        { name: "Services", href: "#services" },
    ],
    Company: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Privacy Policy", href: "#" },
    ],
};

const socials = [
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: FaSpotify, href: "#", label: "Spotify" },
];

export default function Footer() {
    return (
        <footer className="border-t border-card-border bg-[#08080d]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center font-black text-white text-lg">
                                TN
                            </div>
                            <span className="text-xl font-extrabold tracking-widest uppercase gradient-text">
                                The Nation
                            </span>
                        </div>
                        <p className="text-muted text-sm leading-relaxed max-w-sm mb-6">
                            Premium event organizer creating world-class concerts, festivals,
                            and unforgettable experiences across Indonesia and Southeast Asia.
                        </p>
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-muted hover:text-white hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-muted hover:text-neon-purple transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-card-border">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted">
                        © 2026 The Nation Events. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted">
                        Made with <FaHeart className="text-neon-pink mx-1" size={10} />
                        by The Nation Team
                    </div>
                    <a
                        href="#home"
                        className="w-9 h-9 rounded-lg bg-card-bg border border-card-border flex items-center justify-center text-muted hover:text-neon-purple hover:border-neon-purple transition-all"
                        aria-label="Back to top"
                    >
                        <FaArrowUp size={12} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
