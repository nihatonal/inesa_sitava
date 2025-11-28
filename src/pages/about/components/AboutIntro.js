import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function AboutIntro() {
    const { t } = useTranslation("home");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
        >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary">
                {t("about.title")}
            </h2>

            <p className="text-secondary-light mt-6 leading-relaxed">
                {t("about.text")}
            </p>
        </motion.div>
    );
}
