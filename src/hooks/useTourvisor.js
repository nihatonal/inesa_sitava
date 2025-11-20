import { useEffect } from "react";

let scriptLoaded = false;

export const useTourvisor = (moduleId) => {
    useEffect(() => {
        const scriptId = "tourvisor-global-script";

        // Script daha önce yüklenmemişse yükle
        if (!scriptLoaded) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.type = "text/javascript";
            script.src = "//tourvisor.ru/module/init.js";
            script.defer = true;

            script.onload = () => {
                scriptLoaded = true;
                if (window.Tourvisor && typeof window.Tourvisor.init === "function") {
                    window.Tourvisor.init();
                }
            };

            document.body.appendChild(script);
        } else {
            // Script zaten yüklüyse sadece initialize et
            if (window.Tourvisor && typeof window.Tourvisor.init === "function") {
                window.Tourvisor.init();
            }
        }
    }, [moduleId]);
};
