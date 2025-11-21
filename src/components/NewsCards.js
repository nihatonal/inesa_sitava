import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Container from './Container.js'

export default function NewsCards() {
    const { i18n } = useTranslation();
    const { t } = useTranslation("home");
    const { t: tblog } = useTranslation("common");
    const articles = [
        {
            id: 1,
            date: 'Jul 10, 2024',
            readTime: '3',
            title: 'Enrich Your Mind: Envision Your Future Education for Success',
            img: '/assets/thailand_card.webp',
            review: 3
        },
        {
            id: 2,
            date: 'Jul 12, 2024',
            readTime: '3',
            title: 'Exploring The Green Spaces Of Realar Residence Harmony',
            img: '/assets/thailand_card.webp',
            review: 5
        },
        {
            id: 3,
            date: 'Jul 09, 2024',
            readTime: '3',
            title: 'Living sustainability: A day in the life at realar residence',
            img: '/assets/thailand_card.webp',
            review: 1
        },
    ];


    return (
        <section
            className="bg-background"
        >
            <Container className="py-16 md:py-24">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div className='text-center md:text-left'>
                            <p className="text-secondary font-medium">{t("blog.tagline")}</p>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary my-2 md:leading-tight">
                                {t("blog.title")}
                            </h2>
                            <p className="relative z-10 text-secondary/70">
                            {t("blog.description")}
                        </p>
                        </div>

                        <Link to="/blogs" className="hidden lg:block mt-auto py-2 px-4 rounded-full border border-primary group hover:border-secondary transition text-sm font-medium shadow-sm">
                            {t("blog.cta")}
                            <span className="ml-1 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                                →
                            </span>
                        </Link>

                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 lg:mb-0">
                        {articles.map((a) => (
                            <article
                                key={a.id}
                                className="bg-background-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="h-64 w-full overflow-hidden">
                                    <img
                                        src={a.img}
                                        alt={a.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                        <span>{dayjs(a.date).locale(i18n.language).format('D MMM, YYYY')}</span>
                                        <span className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke={"#FFB85D"}
                                                strokeWidth={2}
                                            >
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                            {a.readTime}{tblog("blog.readTime")}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-semibold mb-4 text-secondary-light" >
                                        {a.title}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <button className="py-2 px-4 rounded-full border border-primary group hover:border-secondary transition text-sm font-medium shadow-sm">
                                            {tblog("blog.cta")}
                                            <span className="ml-1 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                                                →
                                            </span>
                                        </button>

                                        <div className="flex items-center space-x-2">
                                            {/* decorative bullets matching the design */}
                                            <span
                                                className="w-3 h-3 rounded-full bg-background-bullet"
                                            />
                                            <span className='text-secondary'>
                                                {a.review} {a.review > 4 ? tblog("blog.comment5") :
                                                    a.review > 1 ? tblog("blog.comment4") : tblog("blog.comment")}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <Link to="/blogs" className="lg:hidden mx-auto py-2 px-4 rounded-full border border-primary group hover:border-secondary transition text-sm font-medium shadow-sm">
                        {t("blog.cta")}
                        <span className="ml-1 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                            →
                        </span>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
