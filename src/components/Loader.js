import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex justify-center items-center pt-10">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-4 h-4 bg-primary rounded-full mx-1"
            />
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className="w-4 h-4 bg-primary rounded-full mx-1"
            />
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                className="w-4 h-4 bg-primary rounded-full mx-1"
            />
        </div>
    );
};

export default Loader;
