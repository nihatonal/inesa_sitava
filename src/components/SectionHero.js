import React from "react";
import { Link } from "react-router-dom";

export default function SectionHero({
    title,
    subtitle,
    image,
    nav = [] // breadcrumb array: [{ label: "Главная", to: "/" }, ...]
}) {
    return (
        <div
            className="w-full h-[60vh] bg-cover bg-center relative flex items-end"
            style={{ backgroundImage: `url("${image}")` }}
        >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

            <div className="relative z-10 p-8 md:p-16">
                {/* Page Title */}
                <h1 className="text-white text-4xl md:text-6xl font-heading font-bold drop-shadow-lg">
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <h3 className="max-w-4xl text-white/80 text-xl md:text-2xl mt-2 font-medium drop-shadow-lg">
                        {subtitle}
                    </h3>
                )}

                {/* Breadcrumb Navigation */}
                {nav.length > 0 && (
                    <nav className="text-white/70 text-sm mt-2 flex gap-1">
                        {nav.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Link varsa tıklanabilir */}
                                {item.to ? (
                                    <Link
                                        to={item.to}
                                        className="hover:text-white transition"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-white/90">{item.label}</span>
                                )}

                                {/* Son elemana > koyma */}
                                {index < nav.length - 1 && <span>&gt;</span>}
                            </React.Fragment>
                        ))}
                    </nav>
                )}
            </div>
        </div>
    );
}
