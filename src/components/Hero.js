import React from "react";
import { MoveDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Hero = () => {
    const { t } = useTranslation('home');
    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div
                className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(/assets/hero_maldives.webp)` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-white/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[850px] mx-auto px-8 md:px-4 text-white">
                <p className="text-shadow-lg text-xl font-normal tracking-wider mb-4">{t("hero.subtitle")}</p>
                <h1 className="max-w-3xl text-shadow-lg text-4xl md:text-6xl tracking-wider font-semibold font-heading">{t("hero.title")}</h1>
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <button className="mr-auto md:mr-0 font-semibold tracking-wide glass-btn px-8 py-3">
                        <Link to={'/destinations'}>
                            {t("hero.cta1.label")}
                        </Link>
                    </button>
                    <button className="mr-auto md:mr-0 font-semibold tracking-wide glass-btn px-8 py-3">
                        <Link to="/contact">
                            {t("hero.cta2.label")}
                        </Link>

                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="glass-btn text-white px-2 py-4">
                    {/* <div className="w-1 h-3 bg-white rounded-full" /> */}
                    <MoveDown className="w-5 h-5" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
