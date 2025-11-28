import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutTimeline() {
    const timeline = [
        {
            year: "2009",
            title: "Founded",
            text: "The beginning of our journey into luxury and personalized travel."
        },
        {
            year: "2015",
            title: "Expanded Worldwide",
            text: "We partnered with leading resorts and travel providers globally."
        },
        {
            year: "2020",
            title: "Premium Services",
            text: "Introduced tailor-made luxury itineraries for our clients."
        },
        {
            year: "2024",
            title: "Sitava Travel Launch",
            text: "A modern brand built on 15+ years of travel expertise."
        }
    ];

    return (
        <div className="w-full py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-secondary text-center mb-12">
                    Our Journey
                </h2>

                <div className="relative border-l-2 border-primary-light ml-4">
                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="mb-12 ml-6"
                        >
                            <div className="absolute w-4 h-4 bg-primary rounded-full -left-2 top-2"></div>

                            <h3 className="text-xl font-semibold text-secondary">
                                {item.year} — {item.title}
                            </h3>

                            <p className="text-secondary-light mt-2">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
