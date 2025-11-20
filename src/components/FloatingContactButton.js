import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";

const FloatingContactButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Scroll sonrası butonun görünmesi
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) setIsVisible(true);
            else setIsVisible(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    {/* Ana buton */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
                    >
                        <IoChatbubbleEllipses className="text-2xl" />
                    </button>

                    {/* Popup kutusu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                className="absolute bottom-16 right-0 bg-white shadow-xl rounded-2xl p-4 flex flex-col gap-3 border border-gray-100"
                            >
                                <a
                                    href="https://wa.me/79210282888"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:bg-green-50 px-3 py-2 rounded-xl transition"
                                >
                                    <FaWhatsapp className="text-green-600 text-xl" />
                                    <span className="text-gray-700 font-medium">WhatsApp</span>
                                </a>

                                <a
                                    href="https://t.me/79210282888"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:bg-blue-50 px-3 py-2 rounded-xl transition"
                                >
                                    <FaTelegramPlane className="text-blue-500 text-xl" />
                                    <span className="text-gray-700 font-medium">Telegram</span>
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingContactButton;
