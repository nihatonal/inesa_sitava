import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutCTA() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-secondary">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto text-center px-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Ready for Your Next Journey?
                </h2>

                <p className="mt-4 text-white/80 text-lg">
                    Let us plan your dream vacation with expert guidance and personalized service.
                </p>

                <Link
                    to="/contact"
                    className="inline-block mt-8 bg-primary-dark text-white px-10 py-4 rounded-full font-semibold hover:bg-primary transition"
                >
                    Start Planning
                </Link>
            </motion.div>
        </section>
    );
}
