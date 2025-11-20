import React from "react";

const RefreshLink = ({ to, children, className }) => {
    const handleClick = (e) => {
        e.preventDefault(); // normal SPA navigasyonu iptal
        window.location.href = to; // sayfayı full reload ile aç
    };

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export default RefreshLink;
