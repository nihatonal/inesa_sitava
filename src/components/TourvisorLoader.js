import { useEffect } from "react";

export default function TourvisorLoader() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tourvisor.ru/module/init.js";
    script.async = true;
    script.defer = true;
    script.onload = () => console.log("Tourvisor script loaded ✅");
    script.onerror = () => console.warn("Tourvisor script failed ❌");
    document.body.appendChild(script);

    return () => {
      // cleanup (isteğe bağlı)
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null;
}
