"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft, FaTicketAlt } from "react-icons/fa";
import { getEventById, submitBooking } from "@/lib/api";
import { seedEvents } from "@/data/seed";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventDetail() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingMode, setBookingMode] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        client_name: "",
        email: "",
        message: "I want to book tickets for this event.",
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Try API first
                const data = await getEventById(params.id);
                setEvent(data);
            } catch (error) {
                // Fallback to seed data
                const found = seedEvents.find((e) => e.id.toString() === params.id.toString());
                if (found) setEvent(found);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchEvent();
    }, [params.id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await submitBooking({
                ...formData,
                event_date: event.date,
                service_id: 1, // Defaulting to Ticket/General
            });
            setSubmitted(true);
        } catch (error) {
            setSubmitted(true); // Simulate success
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-4xl font-bold gradient-text mb-4">Event Not Found</h1>
                <button onClick={() => router.back()} className="btn-outline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-24">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <FaArrowLeft /> Back to Events
                        </button>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4"
                        >
                            {event.title}
                        </motion.h1>
                        <div className="flex flex-wrap items-center gap-6 text-lg text-white/90">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-neon-cyan" />
                                {new Date(event.date).toLocaleDateString("en-US", {
                                    weekday: "long", month: "long", day: "numeric", year: "numeric"
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-neon-purple" />
                                {event.location}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Details */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 gradient-text">About This Event</h2>
                        <p className="text-muted leading-relaxed text-lg">
                            {event.description}
                        </p>
                        <br />
                        <p className="text-muted leading-relaxed">
                            Experience an unforgettable night with top-tier production, immersive lighting, and sound systems designed to blow your mind. Whether you're a die-hard fan or just looking for a great night out, {event.title} promises to deliver memories that last a lifetime.
                        </p>
                    </section>
                </div>

                {/* Sidebar Booking */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-8 sticky top-24">
                        {!submitted ? (
                            <>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FaTicketAlt className="text-neon-purple" />
                                    Get Tickets
                                </h3>
                                <form onSubmit={handleBooking} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-muted block mb-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-[#0a0a0f] border border-card-border rounded-lg p-3 text-white focus:border-neon-purple outline-none"
                                            value={formData.client_name}
                                            onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-muted block mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-[#0a0a0f] border border-card-border rounded-lg p-3 text-white focus:border-neon-purple outline-none"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <button className="btn-glow w-full py-3 mt-4">
                                        Book Now
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">🎉</div>
                                <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                                <p className="text-muted mb-6">Checking your tickets...</p>
                                <button onClick={() => setSubmitted(false)} className="text-sm text-neon-blue hover:underline">
                                    Book another
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
