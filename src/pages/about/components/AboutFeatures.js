import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutFeatures() {
    const { t } = useTranslation("about");

    const features = [
        {
            title: t("feature_1_title"),
            text: t("feature_1_text"),
        },
        {
            title: t("feature_2_title"),
            text: t("feature_2_text"),
        },
        {
            title: t("feature_3_title"),
            text: t("feature_3_text"),
        },
    ];

    return (
        <div className="w-full bg-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-4">
                {features.map((item, index) => (
                    <div
                        key={index}

                        className="p-8 rounded-3xl shadow-lg bg-background-card border border-primary-light/20 group hover:shadow-xl transition"
                    >
                        <h3 className="text-xl font-bold text-secondary group-hover:text-primary-dark transition">
                            {item.title}
                        </h3>
                        <p className="text-secondary-light mt-3 leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
