import { countries } from "./countriesData.js"
const homeJSONLD = {
    ru: [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sitava Travel",
            "url": "https://www.sitava-travel.com",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.sitava-travel.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sitava Travel",
            "url": "https://www.sitava-travel.com",
            "logo": "https://www.sitava-travel.com/logo.png",
            "sameAs": [
                "https://instagram.com/sitavatravel",
                "https://facebook.com/sitavatravel",
                "https://t.me/sitavatravel"
            ],
            "description": "Sitava Travel — ваш эксперт по путешествиям. Индивидуальные туры, лучшие направления и премиальный сервис."
        },
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Популярные направления",
            "description": "Лучшие туристические направления от Sitava Travel.",
            "url": "https://www.sitava-travel.com"
        }
    ]
};

const contactInfo = [
    {
        title: "Электронная почта",
        value: "info@sitava-travel.com",
        link: "mailto:info@sitava-travel.com",
    },
    {
        title: "Телефон",
        value: "+7 900 000-00-00",
        link: "tel:+79000000000",
    },
    {
        title: "Адрес",
        value: "Москва, Россия",
        link: null,
    }
];

const jsonLD = {
    ru: {
        aboutJSONLD: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sitava Travel",
            "url": "https://www.sitava-travel.com",
            "logo": "https://www.sitava-travel.com/logo.png",
            "sameAs": [
                "https://instagram.com/sitavatravel",
                "https://facebook.com/sitavatravel"
            ],
            "description": "Sitava Travel — туристическая компания, предоставляющая индивидуальные и групповые туры по всему миру. Премиальный сервис и безопасные путешествия."
        },
        contactJSONLD: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sitava Travel",
            "url": "https://www.sitava-travel.com",
            "logo": "https://www.sitava-travel.com/logo.png",
            "contactPoint": contactInfo.map((item) => ({
                "@type": "ContactPoint",
                "contactType": item.title,
                "telephone": item.link?.startsWith("tel:") ? item.value : undefined,
                "email": item.link?.startsWith("mailto:") ? item.value : undefined,
                "areaServed": "RU",
                "availableLanguage": ["Russian"]
            })),
            "sameAs": [
                "https://instagram.com/sitavatravel",
                "https://facebook.com/sitavatravel",
                "https://t.me/sitavatravel"
            ]
        },
        destinationsJSONLD: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Sitava Travel — Направления",
            "url": "https://www.sitava-travel.com/destinations",
            "description": "Популярные направления для путешествий от Sitava Travel.",
            "itemListElement": Object.values(countries.ru).map((country, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": country.name,
                "url": `https://www.sitava-travel.com/destinations/${country.slug}`,
                "image": `https://www.sitava-travel.com${country.heroImage}`,
                "description": country.description
            }))
        },
        blogsJSONLD: {
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "Блог о путешествиях — Sitava Travel",
            "description": "Статьи, советы и путеводители для путешественников по всему миру.",
            "url": "https://www.sitava-travel.com/blogs",
        }
    }
}

export const seoData = {
    ru: {
        "/": {
            title: "Sitava Travel — Ваш эксперт в мире путешествий",
            description:
                "Премиальные туры, лучшие направления и индивидуальный сервис. Sitava Travel помогает планировать путешествия легко и комфортно.",
            jsonLD: homeJSONLD,
        },

        "/about": {
            title: "О компании | Sitava Travel",
            description:
                "Sitava Travel — туристическая компания, создающая индивидуальные путешествия и незабываемые впечатления по всему миру.",
            jsonLD: jsonLD.ru.aboutJSONLD,
        },

        "/contact": {
            title: "Контакты | Sitava Travel",
            description:
                "Свяжитесь с Sitava Travel, чтобы спланировать путешествие вашей мечты. Ответим на любые вопросы.",
            jsonLD: jsonLD.ru.contactJSONLD,
        },

        "/destinations": {
            title: "Лучшие направления мира | Sitava Travel",
            description:
                "Откройте лучшие направления для путешествий по всему миру вместе с Sitava Travel.",
            jsonLD: jsonLD.ru.destinationsJSONLD,
        },
        "/blogs": {
            title: "Блог о путешествиях — Sitava Travel",
            description: "Статьи, советы и путеводители.",
            jsonLD: jsonLD.ru.blogsJSONLD
        },

        "/privacy-policy": {
            title: "Политика конфиденциальности | Sitava Travel",
            description:
                "Узнайте, как Sitava Travel защищает и обрабатывает ваши персональные данные.",
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "PrivacyPolicy",
                "name": "Политика конфиденциальности | Sitava Travel",
                "description":
                    "Sitava Travel соблюдает правила обработки персональных данных и обеспечивает защиту ваших данных.",
                "url": "https://www.sitava-travel.com/privacy-policy",
                "publisher": {
                    "@type": "Organization",
                    "name": "Sitava Travel",
                    "url": "https://www.sitava-travel.com",
                    "logo": "https://www.sitava-travel.com/logo.png"
                }
            }
        },

        "/terms-of-service": {
            title: "Условия использования | Sitava Travel",
            description:
                "Правила использования сайта Sitava Travel и предоставления туристических услуг.",
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "TermsOfService",
                "name": "Условия использования | Sitava Travel",
                "description":
                    "Пользовательские условия, ответственность сторон и порядок работы сервиса Sitava Travel.",
                "url": "https://www.sitava-travel.com/terms-of-service",
                "publisher": {
                    "@type": "Organization",
                    "name": "Sitava Travel",
                    "url": "https://www.sitava-travel.com",
                    "logo": "https://www.sitava-travel.com/logo.png"
                }
            }
        },

        "/cookies": {
            title: "Политика cookie | Sitava Travel",
            description:
                "Как Sitava Travel использует cookie для улучшения пользовательского опыта.",
            jsonLD: {
                "@context": "https://schema.org",
                "@type": "CookiePolicy",
                "name": "Политика cookie | Sitava Travel",
                "description":
                    "Информация о файлах cookie, применяемых на сайте Sitava Travel.",
                "url": "https://www.sitava-travel.com/cookies",
                "publisher": {
                    "@type": "Organization",
                    "name": "Sitava Travel",
                    "url": "https://www.sitava-travel.com",
                    "logo": "https://www.sitava-travel.com/logo.png"
                }
            }
        },

        "/404": {
            title: "Страница не найдена | Sitava Travel",
            description: "Страница, которую вы ищете, не существует или была удалена."
        }
    }
};

