import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGoogleAnalytics = (trackingId, enabled = true) => {
    const location = useLocation();

    useEffect(() => {
        if (!enabled) return; // ❗ GA admin route'larda çalışmasın

        if (typeof window.gtag !== "function") return;

        window.gtag('config', trackingId, {
            page_path: location.pathname + location.search,
        });
    }, [location, trackingId, enabled]);
};

export default useGoogleAnalytics;
