import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom"; // CRA için, Next.js için Link değiştirilebilir
import RefreshLink from "./RefreshLink";

/**
 * props:
 * title: string
 * subtitle: string
 * buttons: Array<{ label: string, href: string, variant?: "primary" | "secondary" | "outline" }>
 * bg: { type: "image" | "gradient", value: string }
 */
const CTA = ({ title, subtitle, subtitle2, buttons = [], bg }) => {
    const bgStyle =
        bg?.type === "image"
            ? { backgroundImage: `url(${bg.value})` }
            : {};

    return (
        <section
            className={`relative py-20 text-white ${bg?.type === "gradient" ? bg.value : ""}`}
            style={
                bg?.type === "image"
                    ? {
                        backgroundImage: `url(${bg.value})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }
                    : undefined
            }
        >
            {/* Overlay */}
            {bg?.type === "image" && <div className="absolute inset-0 bg-black/40" />}

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-heading font-bold mb-8"
                >
                    {title}
                </motion.h2>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg mb-2 text-muted max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}
                {subtitle2 && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg mb-8 text-muted max-w-2xl mx-auto"
                    >
                        {subtitle2}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {buttons.map((btn, index) => (
                        <Button
                            key={index}
                            size="lg"
                            variant={btn.variant || "secondary"}
                            asChild
                            className={`rounded-full transition ${btn.variant === "secondary"
                                ? "bg-sunset-gradient text-white shadow shadow-xl shadow-black/10 hover:bg-beach-gradient hover:shadow-accent/20"
                                : btn.variant === "outline"
                                    ? "border-2 border-white bg-transparent shadow shadow-xl shadow-black/10  text-white hover:bg-white hover:text-primary"
                                    : ""
                                }`}
                        >
                            <RefreshLink
                                key={btn.href}
                                to={btn.href}
                                className={`inline-flex items-center justify-center gap-2
                                min-w-[44px] py-3 px-8`}
                            >
                                {btn.label}
                            </RefreshLink>
                            {/* <Link className="inline-flex items-center justify-center gap-2
                            min-w-[44px] min-h-[44px] p-3" to={btn.href}>{btn.label}</Link> */}
                        </Button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
