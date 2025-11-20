import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import RefreshLink from "./RefreshLink";
import ModalForm from "./ModalForm";

export default function MobileMenu({ navLinks, isOpen, toggleMenu }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [open, setOpen] = useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* <div className="h-screen w-full bg-secondary-dark/50"></div> */}
          {/* Overlay */}
          <motion.div
            onClick={toggleMenu}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="relative h-screen -top-16 w-full bg-secondary-dark/50 backdrop-blur-sm z-60"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed top-0 left-0 h-full pt-12 pb-24 w-72 
            bg-secondary/80 backdrop-blur-xs rounded-r-2xl p-8 flex flex-col 
            justify-between z-50 shadow-lg overflow-hidden"
          >
            {/* Menu Items */}
            <nav className="flex flex-col gap-6 mt-6">
              {navLinks.map((item) => (
                <RefreshLink
                  key={item.page}
                  to={item.page}
                  onClick={toggleMenu}
                  className={`text-white text-lg font-medium transition-all duration-200 hover:text-accent ${pathname === item.page ? "text-accent font-semibold" : ""
                    }`}
                >
                  {item.label}
                </RefreshLink>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-6 space-y-6">
              <button
                onClick={() => setOpen(true)}
                className={`px-8 py-2 bg-secondary text-muted font-medium rounded-full shadow-large hover:scale-[1.05] transition`}
              >
                Оставить заявку
              </button>
              <ModalForm open={open} setOpen={setOpen} />

              <div className="border-t border-white/30 pt-6 flex flex-col gap-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <a href="tel:+79210282888" className="hover:text-accent transition-colors">
                    +7 921 028-28-88
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <a href="mailto:info@travel.com" className="hover:text-accent transition-colors">
                    info@travel.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Москва, Россия</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
