"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { seedPartners } from "@/data/seed";

export default function Partners() {
    const partners = seedPartners;

    return (
        <section className="py-20 px-6 bg-surface/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-2xl">
                        <span className="gradient-text">Our Partners</span>
                    </h2>
                    <p className="section-subtitle text-sm">
                        Trusted by leading brands and organizations worldwide.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={40}
                        slidesPerView={2}
                        loop={true}
                        speed={3000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                            1280: { slidesPerView: 6 },
                        }}
                        className="partner-carousel"
                    >
                        {[...partners, ...partners].map((partner, index) => (
                            <SwiperSlide key={`${partner.id}-${index}`}>
                                <div className="flex items-center justify-center h-20 px-6 py-4 rounded-xl border border-card-border/50 bg-card-bg/50 hover:border-neon-purple/30 transition-all duration-300 group cursor-pointer">
                                    <span className="text-lg font-bold text-muted/50 group-hover:text-white tracking-wider uppercase transition-colors duration-300">
                                        {partner.name}
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
}
