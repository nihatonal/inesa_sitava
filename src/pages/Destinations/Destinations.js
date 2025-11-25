import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Container from "../../components/Container";
import SectionHero from "../../components/SectionHero";

export default function Destinations() {
    const { t } = useTranslation('common');
    const { t: tlocation } = useTranslation("destinations");
    const [isMobile, setIsMobile] = useState(false);
    // i18n'den ülkeler listesi çekiyoruz
    const countriesObj = tlocation("countries", { returnObjects: true });
    const countriesArray = Object.values(countriesObj);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="w-full bg-muted">

            <SectionHero
                title={t("pages.destinations.title")}
                subtitle={t("pages.destinations.subtitle")}
                image="/assets/destinations.webp"
                nav={[
                    { label: t("countryDetail.navigation.home"), to: "/" },
                    { label: t("countryDetail.navigation.countries")}
                ]}
            />
            <Container className="py-16 md:py-24">

                {/* Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
                    {countriesArray.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="rounded-3xl group relative"
                        >
                            <div className="w-[400px] h-[450px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl bg-gray-200 relative">
                                <img
                                    src={item.heroImage}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute  inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute flex flex-col items-start bottom-4 left-0 px-5 text-white">
                                    {/* Country Name */}
                                    <div className="font-bold text-2xl">{item.name}</div>

                                    {/* Motto */}
                                    {item.motto && (
                                        <div className="text-sm opacity-80 mt-1">{item.motto}</div>
                                    )}

                                    {/* Best travel time */}
                                    {item.weather?.bestTime && (
                                        <div className="text-xs opacity-70 mt-2">
                                            🌤 Лучшее время: {item.weather.bestTime}
                                        </div>
                                    )}

                                    {/* Highlight beach */}
                                    {item.beaches?.[0] && (
                                        <div className="text-xs opacity-70">
                                            🏖 {item.beaches[0].name}
                                        </div>
                                    )}

                                    {/* Read more */}
                                    <Link
                                        to={`/destinations/${item.slug}`}
                                        className=" block glass-btn mt-3 text-white text-xs px-4 py-2 rounded-full"
                                    >
                                        {t("countryDetail.buttons.readMore")}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                    ))}
                </div>
            </Container>
        </section >
    );
}
