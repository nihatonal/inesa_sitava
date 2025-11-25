// Pages/SingleBlogPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "../../lib/dayjsConfig.js";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/ru";
import { useTranslation } from "react-i18next";
import { PortableText } from "@portabletext/react";
import { fetchSingleBlog, fetchRelatedBlogs, fetchPublishedBlogs, incrementBlogView, shouldIncreaseView, fetchBlogViews } from "../../hooks/useRecommended";
import { urlFor } from "../../lib/sanityClient";
import PopularList from "./Sidebar/PopularList";
import Container from "../../components/Container";
import Spinner from "../../components/ui/Spinner";
import SectionHero from "../../components/SectionHero.js";
import LatestList from "./Sidebar/LatestList";
import SEO from "../../components/SEO.js";
dayjs.extend(localizedFormat);
dayjs.locale("ru");

const generateBlogJSONLD = (blog) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.metaDescription || "",
    "image": blog.mainImage ? blog.mainImage.asset.url : "",
    "author": {
        "@type": "Organization",
        "name": "Sitava Travel"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Sitava Travel",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.sitava-travel.com/logo.png"
        }
    },
    "datePublished": blog.publishedAt,
    "dateModified": blog._updatedAt,
    "url": `https://www.sitava-travel.com/blogs/${blog.slug.current}`
});
export default function SingleBlogPage() {
    const { bid } = useParams();
    const { t } = useTranslation("common");

    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [related, setRelated] = useState([]);
    const [views, setViews] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetchPublishedBlogs()
            .then((data) => {
                setBlogs(data);

            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [bid]);

    useEffect(() => {
        setLoading(true);

        fetchSingleBlog(bid)
            .then((data) => {
                setBlog(data);


                // 🟢 1) Önce Sanity'den güncel view sayısını çek
                const loadViews = async () => {
                    const v = await fetchBlogViews(bid);
                    setViews(v ?? 0);
                };
                loadViews();
                // View +1
                // 👇 LOCALSTORAGE BURADA KONTROL VE OLUŞTURULUR
                // 🟢 2) Gerekirse view artır (5 dk cooldown)
                if (shouldIncreaseView(bid, 300_000)) {
                    incrementBlogView(bid).then(async () => {
                        const v = await fetchBlogViews(bid); // artırdıktan sonra tekrar çek
                        setViews(v);
                    });
                }
                return fetchRelatedBlogs({
                    categories: data?.categories || [],
                    destination: data?.destination || null,
                    excludeId: data?._id,
                });
            })
            .then((relatedBlogs) => {
                setRelated(relatedBlogs || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [bid]);

    const popular = useMemo(() => {
        return [...(blogs || [])].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
    }, [blogs]);
    const latest = useMemo(() => {
        return [...(blogs || [])].sort((a, b) => new Date(b.publishedAt || b._createdAt || 0) - new Date(a.publishedAt || a._createdAt || 0)).slice(0, 5);
    }, [blogs]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }
    const jsonLD = blog ? generateBlogJSONLD(blog) : null;
    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                <p>Статья не найдена</p>
            </div>
        );
    }

    const publishedDate = dayjs(blog.publishedAt).format("D MMMM YYYY");

    return (
        <>
            <SEO
                title={blog.title}
                description={blog.excerpt || blog.metaDescription || ""}
                jsonLD={jsonLD}
            />

            <section className="relative bg-background py-16 min-h-screen">
                <SectionHero
                    title={blog.title}
                    // subtitle={t("pages.blog.subtitle")}
                    image={blog.imageUrl}
                    nav={[
                        { label: t("nav.home"), to: "/" },
                        { label: t("nav.blogs"), to: "/blogs" },
                        { label: blog.destination.title, to: `/destinations/${blog.destination.slug}` },
                        {
                            label: <span className="block max-w-[125px] truncate md:max-w-none">
                                {blog.title}
                            </span>
                        }
                    ]}
                />
                <Container className="relative py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 max-w-4xl">
                            {/* Title */}
                            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

                            {/* Meta */}
                            <div className="text-secondary/60 text-sm mb-6">
                                {publishedDate} • {blog.readingTime} мин • Автор:{" "}
                                <b>{blog.author}</b>
                            </div>

                            {/* Image */}
                            <div className="rounded-2xl overflow-hidden shadow-[0_15px_15px_rgba(0,0,0,0.45)] mb-10">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.imageAlt}
                                    className="w-full h-[420px] object-cover"
                                />
                            </div>

                            {/* Categories & Destination */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                {blog.categories?.map((c) => (
                                    <span
                                        key={c.slug}
                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                                    >
                                        {c.title}
                                    </span>
                                ))}

                                {blog.destination && (
                                    <span className="px-3 py-1 bg-secondary/10 rounded-full text-xs">
                                        {blog.destination.title}
                                    </span>
                                )}
                                {blog.views && (
                                    <span className="px-3 py-1 bg-secondary/10 rounded-full text-xs">
                                        {blog.views} просмотров
                                    </span>
                                )}
                            </div>

                            {/* CONTENT */}
                            {/* <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                /> */}

                            <PortableText value={blog.body} components={{
                                block: {
                                    normal: ({ children }) => (
                                        <p className="my-6 text-base leading-relaxed text-[hsl(var(--foreground))]">
                                            {children}
                                        </p>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="my-8 text-2xl font-bold text-[hsl(var(--primary))] tracking-tight">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="my-6 text-xl font-semibold text-[hsl(var(--primary-light))] tracking-tight">
                                            {children}
                                        </h3>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="my-6 pl-6 border-l-4 border-[hsl(var(--accent))] italic text-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] rounded-md py-2">
                                            {children}
                                        </blockquote>
                                    ),
                                },
                                types: {
                                    image: ({ value }) => (
                                        <img
                                            alt={value.alt || ""}
                                            src={urlFor(value).width(800).height(400).url()}
                                            width={1600}
                                            height={900}
                                            className="rounded-xl shadow-[0_15px_15px_rgba(0,0,0,0.45)] my-8"
                                        />
                                    ),
                                    separator: ({ value }) => {
                                        if (value.style === "line") {
                                            return <hr className="my-10 border-t border-[hsl(var(--border))]" />
                                        }
                                        if (value.style === "space") {
                                            return <div className="my-10" />
                                        }
                                        return null
                                    },
                                },
                                list: {
                                    bullet: ({ children }) => (
                                        <ul className="list-disc pl-6 space-y-2 text-base text-[hsl(var(--foreground))]">
                                            {children}
                                        </ul>
                                    ),
                                    number: ({ children }) => (
                                        <ol className="list-decimal pl-6 space-y-2 text-base text-[hsl(var(--foreground))]">
                                            {children}
                                        </ol>
                                    ),
                                },
                                listItem: {
                                    bullet: ({ children }) => <li className="pl-1">{children}</li>,
                                    number: ({ children }) => <li className="pl-1">{children}</li>,
                                },
                                marks: {
                                    strong: ({ children }) => (
                                        <strong className="font-semibold text-[hsl(var(--foreground))]">
                                            {children}
                                        </strong>
                                    ),
                                    code: ({ children }) => (
                                        <code className="bg-[hsl(var(--secondary))] px-2 py-1 text-sm rounded-md font-mono text-[hsl(var(--foreground))]">
                                            {children}
                                        </code>
                                    ),
                                    link: ({ value, children }) => (
                                        <Link
                                            href={value.href}
                                            target={value.href.startsWith("http") ? "_blank" : undefined}
                                            rel={value.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="underline underline-offset-4 text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))]"
                                        >
                                            {children}
                                        </Link>
                                    ),
                                },
                            }} />

                            {/* RELATED */}
                            {related.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-2xl font-bold mb-6">Похожие статьи</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {related.map((r) => (
                                            <Link
                                                key={r._id}
                                                to={`/blogs/${r.slug}`}
                                                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
                                            >
                                                <img
                                                    src={r.imageUrl}
                                                    alt={r.imageAlt}
                                                    className="h-40 w-full object-cover"
                                                />
                                                <div className="p-4">
                                                    <h4 className="font-semibold text-sm">{r.title}</h4>
                                                    <p className="text-xs text-secondary/60 mt-1">
                                                        {dayjs(r.publishedAt).format("D MMM YYYY")}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 space-y-10">
                                <PopularList popular={popular} />
                                <LatestList latest={latest} />
                            </div>

                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
}
