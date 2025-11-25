// ArticleCard.jsx
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Clock, Calendar, Eye } from "lucide-react";
export default function ArticleCard({ article }) {
    return (
        <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
            <img src={article.imageUrl} className="h-44 w-full object-cover" />

            <div className="p-4">
                <div className="text-xs text-secondary/60 flex justify-between mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{dayjs(article.date).format("D MMM, YYYY")}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readingTime} мин</span>
                </div>

                <h3 className="text-lg text-primary-dark font-semibold line-clamp-2">{article.title}</h3>
                <p className="text-secondary/70 text-sm mt-2 mb-3 line-clamp-2">
                    {article.excerpt}
                </p>

                <div className="flex justify-between items-center">
                    <Link to={`/blogs/${article.slug}`} className="relative group text-primary text-sm">
                        Читать
                        <span
                            className={`absolute -bottom-1 left-0 h-0.5 bg-primary-light transition-all w-0 group-hover:w-full`}
                        />
                    </Link>
                    <span className="flex item-center gap-1 text-xs text-secondary/60"><Eye className="w-4 h-4" />{article.views} просмотров</span>
                </div>
            </div>
        </article>
    );
}
