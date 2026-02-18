"use client";
import { motion } from "framer-motion";
import {
    FaMusic,
    FaCalendarAlt,
    FaBriefcase,
    FaHeart,
    FaGlassCheers,
    FaBolt,
} from "react-icons/fa";
import { seedServices } from "@/data/seed";

const iconMap = {
    FaMusic: FaMusic,
    FaCalendarAlt: FaCalendarAlt,
    FaBriefcase: FaBriefcase,
    FaHeart: FaHeart,
    FaGlassCheers: FaGlassCheers,
    FaBolt: FaBolt,
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
    const services = seedServices;

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <section id="services" className="py-24 px-6 bg-surface/50 relative">
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Our Services</span>
                    </h2>
                    <p className="section-subtitle">
                        Premium event solutions tailored to your vision. Every detail
                        matters.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon] || FaMusic;
                        return (
                            <motion.div
                                key={service.id}
                                variants={cardVariants}
                                className="group glass-card p-8 hover:border-neon-purple/50 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Background glow on hover */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-neon-purple/20 transition-shadow">
                                        <IconComponent className="text-neon-purple text-2xl" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-neon-purple transition-colors">
                                        {service.name}
                                    </h3>

                                    <p className="text-muted text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted">Starting from</span>
                                        <span className="text-lg font-bold gradient-text">
                                            {formatPrice(service.price)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
