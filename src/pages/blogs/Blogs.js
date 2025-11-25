// Pages/Blogs.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ru";
import { useTranslation } from "react-i18next";

// Modular components (adjust paths if needed)
import FeaturedArticle from './FeaturedArticle.js';
import ArticleCard from './ArticleCard.js';
import Pagination from './Pagination.js';
import Sidebar from './Sidebar/Sidebar.js';
import SectionHero from "../../components/SectionHero.js";

// Sanity hooks / helpers (you should have these implemented)
import {
    fetchPublishedBlogs,
    fetchBlogCategories,
    fetchBlogDestinations,
} from "../../hooks/useRecommended.js"; // adjust path if different
import SearchBox from "./Sidebar/SearchBox.js";
import Categories from "./Sidebar/Categories.js";
import Destinations from "./Sidebar/Destinations.js";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("ru");

export default function Blogs() {
    const { t } = useTranslation("common");
    const { i18n } = useTranslation();

    // refs
    const summaryRef = useRef(null);
    const isFirstRender = useRef(true);

    // data
    const [blogs, setBlogs] = useState([]); // normalized blog list from Sanity
    const [categoriesList, setCategoriesList] = useState([]); // { title, slug }
    const [destinationsList, setDestinationsList] = useState([]); // { title, slug }

    // UI state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // filters / paging
    const [selectedCategory, setSelectedCategory] = useState(null); // slug string
    const [selectedDestination, setSelectedDestination] = useState(null); // slug string
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 6;

    // load data on mount
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        Promise.all([
            fetchPublishedBlogs(i18n.language),      // should return normalized blog objects (see note)
            fetchBlogCategories(),      // returns [{title, slug}]
            fetchBlogDestinations(),    // returns [{title, slug}]
        ])
            .then(([blogsData, cats, dests]) => {
                if (!mounted) return;
                // Normalize incoming blog entries defensively:
                const normalized = (blogsData || []).map((b) => {
                    // slug might be string or object
                    const slug =
                        typeof b.slug === "string" ? b.slug : b.slug?.current ?? null;

                    // categories might be array of refs with title/slug OR already populated
                    const categories =
                        (b.categories || []).map((c) =>
                            typeof c === "string"
                                ? { title: c, slug: c }
                                : {
                                    title: c?.title || c?.name || (c?.title === undefined ? "" : c.title),
                                    slug:
                                        typeof c?.slug === "string"
                                            ? c.slug
                                            : c?.slug?.current ?? c?.slug ?? null,
                                }
                        ) || [];

                    // destination might be populated object or reference
                    const destination =
                        b.destination && typeof b.destination === "object"
                            ? {
                                title: b.destination.title ?? b.destination.name ?? "",
                                slug:
                                    typeof b.destination.slug === "string"
                                        ? b.destination.slug
                                        : b.destination.slug?.current ?? null,
                            }
                            : b.destination || null;

                    return {
                        ...b,
                        slug,
                        categories,
                        destination,
                    };
                });

                setBlogs(normalized);
                setCategoriesList(cats || []);
                setDestinationsList(dests || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed loading blogs:", err);
                if (!mounted) return;
                setError(err);
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    // debounce search
    useEffect(() => {
        const h = setTimeout(() => setSearchQuery(search.trim()), 300);
        return () => clearTimeout(h);
    }, [search]);

    // reset page + scroll on filter/search change (but skip first render)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setPage(1);
        if (summaryRef.current) {
            const top = summaryRef.current.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
        }
    }, [selectedCategory, selectedDestination, searchQuery]);

    // scroll to summary on page change (skip initial)
    useEffect(() => {
        if (isFirstRender.current) return;
        if (summaryRef.current) {
            const top = summaryRef.current.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
        }
    }, [page]);

    // filtered blogs based on new schema (categories array of {title,slug}, destination {title,slug})
    const filtered = useMemo(() => {
        return (blogs || []).filter((b) => {
            if (selectedCategory) {
                const has = (b.categories || []).some((c) => c.slug === selectedCategory);
                if (!has) return false;
            }

            if (selectedDestination) {
                if (!b.destination || b.destination.slug !== selectedDestination) return false;
            }

            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const inTitle = (b.title || "").toLowerCase().includes(q);
                const inExcerpt = (b.excerpt || "").toLowerCase().includes(q);
                if (!inTitle && !inExcerpt) return false;
            }

            return true;
        }).sort((a, b) => new Date(b.publishedAt || b._createdAt || 0) - new Date(a.publishedAt || a._createdAt || 0));
    }, [blogs, selectedCategory, selectedDestination, searchQuery]);

    // pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

    // sidebar lists
    const popular = useMemo(() => {
        return [...(blogs || [])].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
    }, [blogs]);

    const latest = useMemo(() => {
        return [...(blogs || [])].sort((a, b) => new Date(b.publishedAt || b._createdAt || 0) - new Date(a.publishedAt || a._createdAt || 0)).slice(0, 5);
    }, [blogs]);

    const featured = useMemo(() => {
        // choose highest views from filtered list (or overall)
        const source = filtered.length ? filtered : blogs;
        if (!source || !source.length) return null;
        return [...source].sort((a, b) => (b.views || 0) - (a.views || 0))[0];
    }, [filtered, blogs]);

    // UI helpers
    const handleResetFilters = () => {
        setSelectedCategory(null);
        setSelectedDestination(null);
        setSearch("");
    };

    // render
    const pageTitle = t("pages.blog.title") || "Блог — путешествия";
    const pageDescription = t("pages.blog.subtitle") || "Статьи о направлениях, отелях и советах для путешествий.";

    return (
        <section className="bg-background min-h-screen">
            <SectionHero
                title={t("pages.blog.title")}
                subtitle={t("pages.blog.subtitle")}
                image="/assets/blogs.webp"
                nav={[
                    { label: t("nav.home"), to: "/" },
                    { label: t("nav.blogs") },
                ]}
            />

            <div className="max-w-7xl mx-auto px-6 py-10 md:py-20">
                {/* Loading / Error */}
                {loading && <div className="text-center py-20">Загрузка...</div>}
                {error && <div className="text-center text-red-600 py-20">Ошибка загрузки статей.</div>}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <main className="lg:col-span-2 flex flex-col">
                                <div ref={summaryRef} />
                                {/* Summary */}
                                <div className="bg-white mb-6 md:mb-0 flex justify-between items-center p-3 rounded-lg shadow text-sm text-secondary/70">
                                    <div>
                                        {filtered.length} статей найдено
                                        {selectedCategory && (
                                            <> • Категория: <b>{selectedCategory}</b></>
                                        )}
                                        {selectedDestination && (
                                            <> • Направление: <b>{selectedDestination}</b></>
                                        )}
                                        {searchQuery && (
                                            <> • Поиск: <b>{searchQuery}</b></>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button onClick={handleResetFilters} className="text-sm text-primary underline">
                                            Сбросить
                                        </button>
                                    </div>
                                </div>

                                <div className="order-first md:order-none my-6">
                                    <FeaturedArticle article={featured} />
                                </div>
                                <div className="grid gap-6 mb-6">
                                    <SearchBox
                                        search={search}
                                        setSearch={setSearch}
                                        className={"md:hidden"}
                                    />
                                    <Categories
                                        categories={categoriesList}
                                        selectedCategory={selectedCategory}
                                        onFilterCategory={(slug) => setSelectedCategory(slug)}
                                        className={"md:hidden"}
                                    />
                                    <Destinations
                                        destinations={destinationsList}
                                        selectedDestination={selectedDestination}
                                        onFilterDestination={(slug) => setSelectedDestination(slug)}
                                        className={"md:hidden"}
                                    />
                                </div>
                                <div ref={summaryRef} />
                                {/* Articles grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {paged.length ? (
                                        paged.map((article) => (
                                            <ArticleCard key={article._id || article.slug || article.id} article={article} />
                                        ))
                                    ) : (
                                        <div className="col-span-full p-8 bg-white rounded-xl text-center text-secondary/70">
                                            Ничего не найдено.
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
                                <Pagination page={page} totalPages={totalPages} onPage={(p) => setPage(p)} />
                            </main>

                            {/* Sidebar */}
                            <aside className="lg:col-span-1">
                                <Sidebar
                                    popular={popular}
                                    latest={latest}
                                    categories={categoriesList}
                                    destinations={destinationsList}
                                    selectedCategory={selectedCategory}
                                    selectedDestination={selectedDestination}
                                    onFilterCategory={(slug) => setSelectedCategory(slug)}
                                    onFilterDestination={(slug) => setSelectedDestination(slug)}
                                    search={search}
                                    setSearch={setSearch}
                                />
                            </aside>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
