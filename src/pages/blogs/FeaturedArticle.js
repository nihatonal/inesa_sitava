import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function FeaturedArticle({ article }) {
    if (!article) return null;

    return (
        <article className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-64 md:h-72 overflow-hidden">
                <img src={article.imageUrl} alt={article.imageAlt} className="w-full h-full object-cover" />
            </div>

            <div className="md:col-span-2 p-4 flex flex-col justify-between">
                <div>
                    <span className="text-xs text-secondary/60">
                        {dayjs(article.publishedAt).format("D MMMM YYYY")} • {article.readingTime} мин
                    </span>

                    <h2 className="text-2xl mt-2 font-bold text-secondary">{article.title}</h2>
                    <p className="text-secondary/70 mt-3">{article.excerpt}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-secondary/60">Автор: {article.author}</span>
                    <Link
                        to={`/blogs/${article.slug}`}
                        className="px-4 py-2 bg-primary text-white rounded-full text-sm shadow hover:opacity-95"
                    >
                        Читать
                    </Link>
                </div>
            </div>
        </article>
    );
}
