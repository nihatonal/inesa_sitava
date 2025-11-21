import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";

const images = [
    {
        id: 1,
        title: "ОАЭ",
        stays: "18 проживаний",
        src: "/assets/dubai_card.webp"
    },
    {
        id: 2,
        title: "Турция",
        stays: "27 проживаний",
        src: "/assets/turkey_card.webp"
    },
    {
        id: 3,
        title: "Таиланд",
        stays: "33 проживания",
        src: "/assets/thailand_card.webp"
    },
    {
        id: 4,
        title: "Мальдивы",
        stays: "46 проживаний",
        src: "/assets/maldives_card.webp"
    },
    {
        id: 5,
        title: "Египет",
        stays: "22 проживания",
        src: "/assets/egypt_card.webp"
    }
];


export default function PopularDestinations() {
    const [activeIndex, setActiveIndex] = useState(2); // default center card
    const { t } = useTranslation('home');
    const [isMobile, setIsMobile] = useState(false);
    const [dragging, setDragging] = useState(false);
    let startX = 0;

    // Mobil kontrolü
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // ilk render için
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDragEnd = (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        // Hangi yöne gidildiğine karar ver:
        if (offset < -30 || velocity < -300) {
            // sola sürüklendi → bir sonraki kart
            setActiveIndex(prev => Math.min(prev + 1, images.length - 1));
        } else if (offset > 30 || velocity > 300) {
            // sağa sürüklendi → önceki kart
            setActiveIndex(prev => Math.max(prev - 1, 0));
        }
    };

    return (
        <div className="w-full flex flex-col bg-muted items-center text-center py-16 md:py-24 overflow-hidden">
            <p className="text-secondary font-medium  px-12 md:px-0 leading-tight">{t("destinations.subtitle")}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mt-2 leading-tight">{t("destinations.title")}</h2>

            <div className=" relative flex justify-center items-center 
            w-full md:max-w-6xl h-[450px]">
                {images.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute cursor-pointer"
                            initial={false}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragStart={() => setDragging(true)}
                            onDragEnd={handleDragEnd}

                            onPointerDown={(e) => {
                                startX = e.clientX;
                                setDragging(false);
                            }}

                            onPointerMove={(e) => {
                                if (Math.abs(e.clientX - startX) > 5) {
                                    setDragging(true);
                                }
                            }}

                            onPointerUp={() => {
                                if (!dragging) setActiveIndex(index);
                            }}

                            animate={{
                                x: (index - activeIndex) * (isMobile ? 45 : 140),
                                scale:
                                    Math.abs(index - activeIndex) === 0 ? 1 :
                                        Math.abs(index - activeIndex) === 1 ? 0.9 :
                                            Math.abs(index - activeIndex) === 2 ? 0.8 :
                                                Math.abs(index - activeIndex) === 3 ? 0.7 :
                                                    0.6,
                                opacity: 1,
                                zIndex: isActive ? 10 : 10 - Math.abs(index - activeIndex)
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >

                            <div className="w-[240px] h-[380px] rounded-3xl overflow-hidden 
                            shadow-xl bg-gray-200 relative">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />

                                <div
                                    className={`absolute bottom-4 text-white px-4 
                                ${index === 4 || activeIndex < index ? "right-0" : "left-0"}`}
                                >
                                    <div className="font-semibold text-lg">{item.title}</div>
                                    <div className="text-sm opacity-80">{item.stays}</div>
                                    {isActive && (
                                        <button className="glass-btn mt-2 text-white text-xs font-regular px-4 py-2 rounded-full">
                                            {t("destinations.cta_card")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

            </div>
            <div className="flex gap-2">
                {
                    [0, 1, 2, 3, 4].map((dot, i) => {
                        return (
                            <button
                                key={dot + i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-2 h-2 rounded-full hover:bg-primary-dark transition
                                ${activeIndex === i ? "bg-primary-dark" : "bg-background-bullet"}
                                `}></button>
                        )

                    })
                }


            </div>
            <Button className="mt-8 md:mt-12">
                {t("destinations.cta")}
            </Button>
        </div >
    );
}
