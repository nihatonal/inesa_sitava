import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";

export default function PopularDestinations() {
    const [activeIndex, setActiveIndex] = useState(2);
    const { t } = useTranslation("home");
    const { t: tlocation } = useTranslation("destinations");

    const countriesObj = tlocation("countries", { returnObjects: true });
    const countriesArray = Object.values(countriesObj);

    const [isMobile, setIsMobile] = useState(false);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full flex flex-col bg-muted items-center text-center py-16 md:py-24 overflow-hidden">
            <p className="text-secondary font-medium px-12 md:px-0">
                {t("destinations.subtitle")}
            </p>

            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mt-2">
                {t("destinations.title")}
            </h2>

            <div className="relative flex justify-center items-center w-full md:max-w-6xl h-[450px]">
                {countriesArray.map((item, index) => (
                    <CountryCard
                        key={item.id}
                        item={item}
                        index={index}
                        activeIndex={activeIndex}
                        isMobile={isMobile}
                        dragging={dragging}
                        setDragging={setDragging}
                        setActiveIndex={setActiveIndex}
                        readMore={t('destinations.cta_card')}
                    />
                ))}
            </div>

            <div className="flex gap-2">
                {countriesArray.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-2 h-2 rounded-full transition ${activeIndex === i
                                ? "bg-primary-dark"
                                : "bg-background-bullet hover:bg-primary-dark"
                            }`}
                    ></button>
                ))}
            </div>

            <Button asChild variant="link" className="mt-8 md:mt-12">
                <Link to="/destinations" size="link" className="rounded-full px-8 py-3">
                    {t("destinations.cta")}
                </Link>
            </Button>
        </div>
    );
}
