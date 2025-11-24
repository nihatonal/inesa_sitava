// Sidebar/PopularList.jsx
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function PopularList({ popular }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold mb-3">Популярные</h4>
            <ul className="space-y-3">
                {popular.map((a, index) => (
                    <li key={a.id + "item" + index} className="flex items-start justify-center gap-3">
                        <img src={a.imageUrl} className="mt-auto mb-auto w-12 h-12 rounded-md object-cover" />

                        <div className="flex-1">
                            <Link className="text-sm font-medium hover:underline block" to={`/blogs/${a.slug}`}>
                                {a.title}
                            </Link>
                            <div className="text-xs text-secondary/60">{dayjs(a.publishedAt).fromNow()}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
