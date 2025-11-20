import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common from "./ru/common.json";
import home from "./ru/home.json";
import about from "./ru/about.json";
import destinations from "./ru/destinations.json";
import contact from "./ru/contact.json";
import blog from "./ru/blog.json";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  resources: {
    ru: { common, home, about, destinations, contact, blog },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
