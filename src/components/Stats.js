import React from "react";

export default function Stats() {
    const stats = [
        { value: "12", label: "Years Experience" },
        { value: "97%", label: "Retention Rate" },
        { value: "8k", label: "Tour Completed" },
        { value: "19k", label: "Happy Travellers" },
    ];

    return (
        <div className="w-full bg-muted py-16 flex flex-col items-center px-4">
            <div className="min-h-64 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 ">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className={`relative 
                        ${index === 0 ? "mb-auto mt-4" :
                                index === 1 ? "mt-auto" :
                                    index === 2 ? "mb-auto" : "mt-auto mb-4"}
                        flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-primary-light bg-white shadow-lg`}
                    >
                        <div className={`absolute w-4 h-4 rounded-full bg-primary-light/20 flex items-center justify-center
                        ${index === 0 ? "top-0 right-7 md:top-0 md:right-10" :
                                index === 1 ? "top-7 right-0 md:top-10 md:right-0" :
                                    index === 2 ? "bottom-7 left-0 md:bottom-10 md:left-0" : "top-7 left-0 md:top-10 md:left-0"}
                        `}>
                            <span className="block w-2 h-2 rounded-full bg-primary"></span>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-background w-28 h-28 md:w-36 md:h-36 rounded-full">
                            <span className="text-3xl font-bold text-secondary">{item.value}</span>
                            <span className="text-secondary-light text-xs md:text-sm mt-1 text-center">
                                {item.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}