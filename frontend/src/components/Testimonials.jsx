"use client";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { seedTestimonials } from "@/data/seed";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Testimonials() {
    const testimonials = seedTestimonials;

    return (
        <section id="testimonials" className="py-24 px-6 relative">
            <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-neon-purple/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Testimonials</span>
                    </h2>
                    <p className="section-subtitle">
                        Hear from our clients. Their words are our greatest reward.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            variants={cardVariants}
                            className="glass-card p-8 relative group hover:border-neon-purple/30 transition-all duration-300"
                        >
                            {/* Quote icon */}
                            <FaQuoteLeft className="text-neon-purple/20 text-4xl absolute top-6 right-6" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={
                                            star <= t.rating ? "star-filled" : "star-empty"
                                        }
                                        size={16}
                                    />
                                ))}
                            </div>

                            {/* Message */}
                            <p className="text-muted text-sm leading-relaxed mb-6 italic">
                                &ldquo;{t.message}&rdquo;
                            </p>

                            {/* Client Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neon-purple/30">
                                    <img
                                        src={t.photo_url}
                                        alt={t.client_name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{t.client_name}</p>
                                    <p className="text-xs text-muted">Verified Client</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
