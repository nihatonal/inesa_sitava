// ArticleCard.jsx
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function ArticleCard({ article }) {
    return (
        <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
            <img src={article.imageUrl} className="h-44 w-full object-cover" />

            <div className="p-4">
                <div className="text-xs text-secondary/60 flex justify-between mb-2">
                    <span>{dayjs(article.date).format("D MMM, YYYY")}</span>
                    <span>{article.readingTime} мин</span>
                </div>

                <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
                <p className="text-secondary/70 text-sm mt-2 mb-3 line-clamp-2">
                    {article.excerpt}
                </p>

                <div className="flex justify-between items-center">
                    <Link to={`/blogs/${article.slug}`} className="text-primary text-sm hover:underline">
                        Читать
                    </Link>
                    <span className="text-xs text-secondary/60">{article.views} просмотров</span>
                </div>
            </div>
        </article>
    );
}
