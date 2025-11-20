// src/components/ui/Switch.js
import React from 'react';

export const Switch = ({ checked, onChange }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`cursor-pointer w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-300'
                }`}
        >
            <span
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'
                    }`}
            />
        </button>
    );
};
