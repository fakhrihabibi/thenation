"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearchPlus } from "react-icons/fa";
import { seedGallery } from "@/data/seed";

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const gallery = seedGallery;

    // Varying heights for masonry look
    const heights = ["h-64", "h-80", "h-56", "h-72", "h-64", "h-80", "h-56", "h-72", "h-64"];

    return (
        <section id="gallery" className="py-24 px-6 relative">
            <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Gallery</span>
                    </h2>
                    <p className="section-subtitle">
                        Relive the energy. Browse through moments captured at our
                        unforgettable events.
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="masonry-grid">
                    {gallery.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`relative group cursor-pointer rounded-xl overflow-hidden ${heights[index % heights.length]}`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.image_url}
                                alt={item.caption}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm font-semibold text-white">
                                        {item.caption}
                                    </span>
                                    <FaSearchPlus className="text-neon-purple" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lightbox-overlay"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-4xl max-h-[85vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.image_url}
                                alt={selectedImage.caption}
                                className="w-full h-full object-contain rounded-xl"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-neon-purple flex items-center justify-center text-white hover:bg-neon-blue transition-colors"
                                aria-label="Close lightbox"
                            >
                                <FaTimes />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0a0f] to-transparent rounded-b-xl">
                                <p className="text-white font-semibold">{selectedImage.caption}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
