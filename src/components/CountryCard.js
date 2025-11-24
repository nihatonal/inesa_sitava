import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CountryCard({
  item,
  index,
  activeIndex,
  isMobile,
  dragging,
  setDragging,
  setActiveIndex,
  readMore
}) {
  const isActive = index === activeIndex;

  return (
    <motion.div
      className="absolute cursor-pointer"
      key={item.id}
      initial={{
        x: (index - activeIndex) * (isMobile ? 45 : 140),
      }}
      animate={{
        x: (index - activeIndex) * (isMobile ? 45 : 140),
        scale:
          Math.abs(index - activeIndex) === 0
            ? 1
            : Math.abs(index - activeIndex) === 1
            ? 0.9
            : Math.abs(index - activeIndex) === 2
            ? 0.8
            : Math.abs(index - activeIndex) === 3
            ? 0.7
            : 0.6,
        opacity: 1,
        zIndex: isActive ? 10 : 10 - Math.abs(index - activeIndex),
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={(e, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -30 || velocity < -300) {
          setActiveIndex((prev) => prev + 1);
        } else if (offset > 30 || velocity > 300) {
          setActiveIndex((prev) => prev - 1);
        }

        setTimeout(() => setDragging(false), 50);
      }}
      onTap={() => {
        if (!dragging) setActiveIndex(index);
      }}
    >
      <div className="w-[240px] h-[380px] rounded-3xl overflow-hidden shadow-xl bg-gray-200 relative">
        <img
          src={item.heroImage}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        <div
          className={`absolute bottom-4 text-white px-4 ${
            index === 4 || activeIndex < index ? "right-0" : "left-0"
          }`}
        >
          <div className="font-semibold text-lg">{item.name}</div>
          <div className="text-sm opacity-80">{item.stays}</div>

          {isActive && (
            <Link
              to={`/destinations/${item.slug}`}
              className="block glass-btn mt-2 text-white text-xs font-regular px-4 py-2 rounded-full"
            >
             {readMore}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
