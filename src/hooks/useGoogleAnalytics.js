import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGoogleAnalytics = (trackingId) => {
    const location = useLocation();

    useEffect(() => {
        // Sayfa yüklenince ve route değişince GA page_view gönder
        window.gtag('config', trackingId, {
            page_path: location.pathname + location.search,
        });
    }, [location, trackingId]);
};

export default useGoogleAnalytics;
