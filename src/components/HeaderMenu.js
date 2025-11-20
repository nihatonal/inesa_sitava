import React from "react";
import { useLocation } from "react-router-dom";
import RefreshLink from "./RefreshLink"; // Yeni component

const HeaderMenu = ({ navLinks }) => {
  const location = useLocation();
  const pathname = location.pathname;


  console.log(pathname);

  return (
    <nav className="hidden md:flex space-x-8">
      <div className="hidden lg:flex items-center space-x-8 min-w-[400px]">
        {navLinks.map((item) => (
          <RefreshLink
            key={item.page}
            to={item.page}
            className={`relative group font-bold font-montserrat tracking-wider transition-colors duration-200 ${pathname === item.page
              ? "text-primary-light"
              : "text-muted hover:text-primary-light"
              }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-primary-light transition-all ${pathname === item.page ? "w-full" : "w-0 group-hover:w-full"
                }`}
            />
          </RefreshLink>
        ))}
      </div>
    </nav>
  );
};

export default HeaderMenu;
