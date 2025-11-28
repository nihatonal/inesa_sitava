import React from "react";
import { motion } from "framer-motion";

export default function AboutMissionVision() {
    return (
        <div className="w-full bg-muted py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl p-10 shadow-lg"
                >
                    <h3 className="text-3xl font-bold text-secondary mb-4">
                        Our Mission
                    </h3>
                    <p className="text-secondary-light leading-relaxed">
                        To create unforgettable journeys tailored uniquely
                        to each traveler — blending comfort, culture, and adventure.
                    </p>
                </motion.div>

                {/* Vision */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl p-10 shadow-lg"
                >
                    <h3 className="text-3xl font-bold text-secondary mb-4">
                        Our Vision
                    </h3>
                    <p className="text-secondary-light leading-relaxed">
                        To become the leading provider of premium, personalized travel
                        by combining innovation, luxury, and 15+ years of expertise.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
