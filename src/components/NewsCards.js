import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Container from './Container.js'
import ArticleCard from '../pages/blogs/ArticleCard.js';

export default function NewsCards({ blogs }) {
    const { i18n } = useTranslation();
    const { t } = useTranslation("home");
    const { t: tblog } = useTranslation("common");

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
                        {blogs.map((blog) => (
                            <ArticleCard article={blog} key={blog.title}/>
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
