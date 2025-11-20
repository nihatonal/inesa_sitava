import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";

const HeroSection = ({
    title = "Заголовок по умолчанию",
    subtitle,
    buttonText,
    buttonLink = "#",
    buttonText2,
    buttonLink2 = "",
    classNameButtonLink2="",
    bgImage,
    bgVideo,
    overlay = "bg-gradient-to-b from-black/10 via-black/20 to-black/30",
    height = "h-screen md:h-[450px]",
    align = "center", // "left" | "center" | "right"
}) => {
    return (
        <section
            className={`relative ${height} pt-12 flex items-center justify-center overflow-hidden`}
        >
            {/* Background video or image */}
            {bgVideo ? (
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={bgVideo} type="video/mp4" />
                </video>
            ) : bgImage ? (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
            ) : null}

            {/* Overlay */}
            <div className={`absolute inset-0 ${overlay}`} />

            {/* Content */}
            <Container
                className={`z-10 px-6 text-${align} ${align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
                    }`}
            >
                {title && (
                    <h1
                        className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg"
                    >
                        {title}
                    </h1>
                )}

                {subtitle && (
                    <p
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white drop-shadow-md"
                    >
                        {subtitle}
                    </p>
                )}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3">

                    {buttonText && (
                        <motion.a
                            href={buttonLink}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full medium-shadow transition-colors hover:bg-secondary hover:text-muted"
                        >
                            {buttonText}
                        </motion.a>
                    )}

                    {buttonText2 && (
                        <motion.a
                            href={buttonLink2}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className={`inline-block  font-semibold 
                            px-8 py-3 rounded-full medium-shadow transition-colors 
                            ${classNameButtonLink2}`}
                        >
                            {buttonText2}
                        </motion.a>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default HeroSection;
