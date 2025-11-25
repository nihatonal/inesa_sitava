// src/lib/seoSchemas.js
export const contactInfo = [
    { title: "Электронная почта", value: "info@ta-travel.com", link: "mailto:info@ta-travel.com" },
    { title: "Телефон", value: "+7 921 028-28-88", link: "tel:+79210282888" },
    { title: "Адрес", value: "Санкт-Петербург, Россия", link: null },
];

export const homeJSONLD = [
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TA-Travel",
        url: "https://www.ta-travel.ru",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://www.ta-travel.ru/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TA-Travel",
        url: "https://www.ta-travel.ru",
        logo: "https://www.ta-travel.ru/logo.png",
        sameAs: ["https://t.me/+79210282888"],
        description: "TA-Travel — ваш надёжный проводник..."
    }
];

export const aboutJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TA-Travel",
    url: "https://www.ta-travel.ru",
    logo: "https://www.ta-travel.ru/logo.png",
    sameAs: [
        "https://www.facebook.com/tatravel",
        "https://www.instagram.com/tatravel"
    ],
    description: "TA-Travel — ваш надёжный проводник..."
};

export const contactJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TA-Travel",
    url: "https://www.ta-travel.ru",
    logo: "https://www.ta-travel.ru/logo.png",
    contactPoint: contactInfo.map(item => ({
        "@type": "ContactPoint",
        contactType: item.title,
        telephone: item.link?.startsWith("tel:") ? item.value : undefined,
        email: item.link?.startsWith("mailto:") ? item.value : undefined,
        areaServed: "RU",
        availableLanguage: ["Russian"]
    })),
    sameAs: [
        "https://www.facebook.com/tatravel",
        "https://www.instagram.com/tatravel",
        "https://t.me/atravel"
    ]
};

export const staticSeoData = {
    "/": {
        title: "TA-Travel — Ваш проводник в мире путешествий",
        description: "Откройте лучшие направления и создайте незабываемые впечатления с TA-Travel.",
        jsonLD: homeJSONLD
    },
    "/about": {
        title: "О компании TA-Travel | Путешествия с комфортом",
        description: "TA-Travel — ваш надёжный проводник...",
        jsonLD: aboutJSONLD
    },
    "/contact": {
        title: "Контакты | TA-Travel",
        description: "Свяжитесь с нами, чтобы спланировать путешествие.",
        jsonLD: contactJSONLD
    }
};
