import React from "react";
import { motion } from "framer-motion";

export default function AboutGallery() {
    const images = [
        "/assets/gallery/1.webp",
        "/assets/gallery/2.webp",
        "/assets/gallery/3.webp",
        "/assets/gallery/4.webp",
        "/assets/gallery/5.webp",
        "/assets/gallery/6.webp"
    ];

    return (
        <div className="w-full bg-white py-20">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary text-center mb-12">
                Moments From Our Travels
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
                {images.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="overflow-hidden rounded-2xl shadow-md"
                    >
                        <img
                            src={src}
                            alt="Travel"
                            className="w-full h-full object-cover hover:scale-110 transition duration-700"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
