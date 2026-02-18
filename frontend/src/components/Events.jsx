"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { seedEvents } from "@/data/seed";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Events() {
    const events = seedEvents;

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <section id="events" className="py-24 px-6 relative">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-purple/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Upcoming Events</span>
                    </h2>
                    <p className="section-subtitle">
                        Discover our next electrifying experiences. Get your tickets before
                        they sell out.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={cardVariants}
                            className="group glass-card overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={event.image_url}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
                                {/* Date Badge */}
                                <div className="absolute top-4 right-4 bg-neon-purple/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                                    Upcoming
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-neon-purple transition-colors">
                                    {event.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-muted mb-2">
                                    <FaCalendarAlt className="text-neon-blue" size={12} />
                                    {formatDate(event.date)}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted mb-4">
                                    <FaMapMarkerAlt className="text-neon-pink" size={12} />
                                    {event.location}
                                </div>

                                <p className="text-sm text-muted/80 line-clamp-2 mb-4">
                                    {event.description}
                                </p>

                                <div className="flex items-center gap-2 text-neon-purple text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                                    Get Tickets <FaArrowRight size={12} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
