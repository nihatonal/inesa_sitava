import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import ModalForm from "./ModalForm";
import MobileMenu from "./MobileMenu";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // sidebar state
  const { t } = useTranslation("common");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { page: "/", label: t("nav.home") },
    { page: "/about", label: t("nav.about") },
    { page: "/destinations", label: t("nav.destinations") },
    { page: "/blogs", label: t("nav.blogs") },
    { page: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-20 overflow-hidden text-white font-medium
        ${scrolled ? "bg-secondary/55" : "bg-white/15"} backdrop-blur-sm
        shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),
                inset_0_-2px_6px_rgba(0,0,0,0.65),
                0_4px_12px_rgba(0,0,0,0.35)] transition-colors duration-700 ease-in-out
      `}
      >
        <div className="px-8 flex items-center justify-between h-16">
          <Logo />
          <HeaderMenu navLinks={navLinks} scrolled={scrolled} />
          <div className="flex items-center gap-6">
            <button
              onClick={() => setOpen(true)}
              className={`hidden md:block px-8 py-2 bg-secondary text-muted font-medium rounded-full shadow-large hover:scale-[1.05] transition`}
            >
              Оставить заявку
            </button>


            {/* Hamburger Button */}
            <button
              onClick={toggleSidebar}
              aria-label="Open mobile menu"
              className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1 z-50"
            >
              <span
                className={`block w-8 h-0.5 bg-white rounded transform transition duration-300 ${isSidebarOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              />
              <span
                className={`block w-8 h-0.5 bg-white rounded transition duration-300 ${isSidebarOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`block w-8 h-0.5 bg-white rounded transform transition duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              />
            </button>
          </div>



        </div>
        {/* Mobile Sidebar */}

        <MobileMenu
          navLinks={navLinks}
          isOpen={isSidebarOpen}
          toggleMenu={toggleSidebar}
        />

      </header>
      <ModalForm className="hidden lg:block" open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
