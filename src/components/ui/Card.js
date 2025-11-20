import React from "react";
import { cn } from "../../lib/utils"; // CRA projesine göre yolunu ayarla

const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
