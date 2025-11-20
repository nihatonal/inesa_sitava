import React from 'react';
import { motion } from 'framer-motion';

export default function Spinner({ size = 40, color = '#3498db' }) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <motion.div
        className="rounded-full border-4 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderTopColor: 'transparent',
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 1,
        }}
      />
    </div>
  );
}
