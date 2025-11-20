import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

// Basit class birleştirme fonksiyonu
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef(
    ({ className, ...props }, ref) => (
        <ToastPrimitives.Viewport
            ref={ref}
            className={cn(
                "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-4 sm:right-4 sm:flex-col md:max-w-[420px]",
                className
            )}
            {...props}
        />
    )
);
ToastViewport.displayName = "ToastViewport";

const toastVariants = {
    default: "bg-white text-black border shadow-lg",
    destructive: "bg-red-500 text-white border-red-700",
    premium: "bg-ocean-gradient text-white shadow-xl",
};

export const Toast = React.forwardRef(
    ({ className, variant = "default", ...props }, ref) => (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(
                "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 transition-all data-[state=open]:animate-in data-[state=closed]:animate-out",
                toastVariants[variant],
                className
            )}
            {...props}
        />
    )
);
Toast.displayName = "Toast";

export const ToastAction = ToastPrimitives.Action;
export const ToastClose = ToastPrimitives.Close;

export const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        className={cn("text-sm font-semibold", className)}
        {...props}
    />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef(
    ({ className, ...props }, ref) => (
        <ToastPrimitives.Description
            ref={ref}
            className={cn("text-sm opacity-90", className)}
            {...props}
        />
    )
);
ToastDescription.displayName = "ToastDescription";
