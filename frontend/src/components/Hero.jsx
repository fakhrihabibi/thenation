"use client";
import { motion } from "framer-motion";
import { FaPlay, FaCalendarAlt } from "react-icons/fa";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80')",
                }}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/60 to-[#0a0a0f]" />
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10" />

            {/* Animated Particles / Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="inline-block px-5 py-2 rounded-full border border-neon-purple/40 text-neon-purple text-sm font-semibold tracking-widest uppercase backdrop-blur-sm">
                        ✦ Premium Event Organizer ✦
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none mb-6"
                >
                    <span className="block text-white">We Create</span>
                    <span className="block neon-glow gradient-text">
                        Unforgettable
                    </span>
                    <span className="block text-white">Experiences</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    From electrifying concerts to premium festivals, we deliver
                    world-class production with an unmatched cinematic experience.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="#events" className="btn-glow flex items-center gap-3 text-base">
                        <FaCalendarAlt />
                        Explore Events
                    </a>
                    <a href="#gallery" className="btn-outline flex items-center gap-3 text-base">
                        <FaPlay />
                        View Gallery
                    </a>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
                >
                    {[
                        { value: "150+", label: "Events" },
                        { value: "50K+", label: "Attendees" },
                        { value: "98%", label: "Satisfaction" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-black gradient-text">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted uppercase tracking-wider mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 rounded-full border-2 border-muted/40 flex items-start justify-center pt-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                </motion.div>
            </motion.div>
        </section>
    );
}
