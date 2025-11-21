/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009FBA',
          light: '#78e0fa',
          dark: '#006D80',
        },
        secondary: {
          DEFAULT: '#0A3547',
          light: '#355C6A',
          dark: '#041E28',
        },
        accent: {
          DEFAULT: '#FFB85D',
          light: '#FFD9A5',
          dark: '#D98A2F',
        },
        background: {
          DEFAULT: "#ebf5fa",
          bullet:"#c3e6eb",
          card:"#F8F9FA",
        },
        muted: {
          DEFAULT: '#fff',
          light: '#FAFCFC',
          dark: '#D8E0E2',
        },
        info: {
          DEFAULT: '#4EB5D4',
        },
        destructive: {
          DEFAULT: "#d22727", // travel.destructive
          foreground: "#f9f7f2", // travel.destructiveForeground
        },
        popover: {
          DEFAULT: "#0e131a", // travel.popover
          foreground: "#f1ede6", // travel.popoverForeground
        },
        card: { DEFAULT: "#ffffff", foreground: "#111827" },
        chartGreen: "#7ABB7E",       // 122 39% 49%
        chartBlue: "#3BA3E8",        // 207 90% 54%
        chartAmber: "#EFC531",       // 45 100% 51%
        chartDeepOrange: "#FF4717",  // 14 100% 57%
        chartLightBlue: "#4BD1F5",   // 199 98% 48%
        chartLightGreen: "#83D687",  // 88 50% 53%
        chartPink: "#E556B1",        // 340 82% 52%
        chartDeepPurple: "#7E5BC0",  // 262 52% 47%
        chartCyan: "#00FFE1",        // 187 100% 42%
        chartOrange: "#FF9000",      // 36 100% 50%
        chartTeal: "#00817B",        // 174 100% 29%
        chartPurple: "#8D41AB",
        mutedForeground: "hsl(240 5% 50%)"
      },
      boxShadow: {
        large: "0 10px 40px -10px hsl(186 85% 45% / 0.2)",
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(135deg, hsl(186 55% 45%) 0%, hsl(195 92% 62%) 100%)",
        "sunset-gradient": "linear-gradient(135deg, hsl(14 91% 62%) 0%, hsl(43 74% 66%) 100%)",
        "sunset-gradient-reverse": "linear-gradient(135deg, hsl(43 74% 66%) 0%, hsl(14 91% 62%) 100%)",
        "beach-gradient": "linear-gradient(180deg, hsl(43 74% 66%) 0%, hsl(14 91% 62%) 100%)",
        "overlay-gradient": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
        "danger-gradient": "linear-gradient(-45deg, var(--color-destructive) 0% 50%, #fff 50% 100%)",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],   // global sans
        heading: ["Poppins", "sans-serif"],         // global heading
        montserrat: ["Montserrat", "sans-serif"],   // navbar veya özel kullanım
      },
    },
  },
  plugins: [],
};
