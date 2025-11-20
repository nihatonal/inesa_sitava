import React from "react";

// Basit cn fonksiyonu JSX/React için
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Container = ({ children, className }) => {
    return <div className={cn("max-w-screen-xl mx-auto px-4", className)}>{children}</div>;
};

export default Container;
