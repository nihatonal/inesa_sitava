import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { FaStar } from "react-icons/fa";

const pastelColors = [
    "#FDE68A", "#FBCFE8", "#BFDBFE", "#C7D2FE", "#A7F3D0",
    "#FDE2E4", "#FEF3C7", "#DDD6FE", "#BAE6FD", "#F5D0FE",
];

const getPastelColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % pastelColors.length);
    return pastelColors[index];
};

const ReviewCard = ({ name, location, comment, imageUrl, date, rating, delay, className, disableAnimation = false, }) => {
    const bgColor = getPastelColor(name || "User");

    const Wrapper = disableAnimation ? 'div' : motion.div;
    console.log(date)
    return (
        <Wrapper
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay }}
            viewport={{ once: true }}
            className={`flex flex-col bg-white rounded-2xl ${className} group transition-shadow duration-300 overflow-hidden`}
        >
            <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/api/yandex/images/${imageUrl}`}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                            background: `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor}90 40%, transparent 100%)`,
                        }}
                    >
                        <span className="text-4xl font-bold text-gray-700 rounded-full bg-white/40 w-14 h-14 flex items-center justify-center backdrop-blur-sm">
                            {name[0].toUpperCase()}
                        </span>
                    </div>
                )}

                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full text-sm text-yellow-400 flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-base drop-shadow-md" />
                    <span className="text-white">{rating.toFixed(1)}</span>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-5 text-gray-800 relative">
                <p className="text-sm text-gray-500 leading-relaxed mb-12">{comment}</p>

                <div className="absolute bottom-5 right-5 flex flex-col items-end">
                    <h3 className="font-semibold text-md text-gray-600">{name}</h3>
                    <p className="text-xs text-gray-400">
                        {location} / {dayjs(date).locale("ru").format("MMM YYYY")}
                    </p>
                </div>
            </div>
        </Wrapper>
    );
};

export default ReviewCard;
