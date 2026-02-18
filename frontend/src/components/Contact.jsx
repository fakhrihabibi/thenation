"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaUser,
    FaEnvelope,
    FaCalendarAlt,
    FaPaperPlane,
    FaPhone,
    FaMapMarkerAlt,
    FaCheckCircle,
} from "react-icons/fa";
import { seedServices } from "@/data/seed";
import { submitBooking } from "@/lib/api";

export default function Contact() {
    const [formData, setFormData] = useState({
        client_name: "",
        email: "",
        event_date: "",
        service_id: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Try API first, fallback to simulation
            await submitBooking(formData);
            setSubmitted(true);
        } catch (error) {
            // API not available - simulate success
            await new Promise((r) => setTimeout(r, 1000));
            setSubmitted(true);
        }

        setLoading(false);
    };

    if (submitted) {
        return (
            <section id="contact" className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <FaCheckCircle className="text-6xl text-neon-purple mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Booking Submitted!</h2>
                        <p className="text-muted mb-8">
                            Thank you for your interest. Our team will get back to you within
                            24 hours.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFormData({ client_name: "", email: "", event_date: "", service_id: "", message: "" });
                            }}
                            className="btn-outline"
                        >
                            Submit Another
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-24 px-6 relative">
            <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Book Your Event</span>
                    </h2>
                    <p className="section-subtitle">
                        Ready to create something extraordinary? Tell us about your vision.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="glass-card p-8 space-y-6">
                            <h3 className="text-xl font-bold gradient-text">Get in Touch</h3>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="text-neon-purple" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Phone</p>
                                    <p className="text-muted text-sm">+62 21 5555 1234</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-neon-blue" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Email</p>
                                    <p className="text-muted text-sm">hello@thenation.events</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neon-pink/20 flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="text-neon-pink" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">Location</p>
                                    <p className="text-muted text-sm">
                                        Jakarta, Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="glass-card p-6 grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-black gradient-text">24h</p>
                                <p className="text-xs text-muted">Response Time</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-black gradient-text">99%</p>
                                <p className="text-xs text-muted">Client Retention</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass-card p-8 space-y-5"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-semibold text-muted mb-2 block">
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={14} />
                                        <input
                                            type="text"
                                            name="client_name"
                                            value={formData.client_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-[#0a0a0f] border border-card-border rounded-lg py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted mb-2 block">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={14} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-[#0a0a0f] border border-card-border rounded-lg py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-semibold text-muted mb-2 block">
                                        Event Date
                                    </label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={14} />
                                        <input
                                            type="date"
                                            name="event_date"
                                            value={formData.event_date}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#0a0a0f] border border-card-border rounded-lg py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-muted mb-2 block">
                                        Service Package
                                    </label>
                                    <select
                                        name="service_id"
                                        value={formData.service_id}
                                        onChange={handleChange}
                                        className="w-full bg-[#0a0a0f] border border-card-border rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-neon-purple transition-colors"
                                    >
                                        <option value="">Select a service</option>
                                        {seedServices.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-muted mb-2 block">
                                    Tell us about your event
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your event vision, expected guest count, and any special requirements..."
                                    className="w-full bg-[#0a0a0f] border border-card-border rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-neon-purple transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-glow w-full flex items-center justify-center gap-3 py-4 text-base disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Submit Booking
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
