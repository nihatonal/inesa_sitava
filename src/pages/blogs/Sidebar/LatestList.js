// Sidebar/LatestList.jsx
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function LatestList({ latest }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold mb-3">Последние</h4>
            <ul className="space-y-3">
                {latest.map((a,index) => (
                    <li key={a.id+"item"+index} className="flex items-start gap-3">
                        <img src={a.imageUrl} className="mt-auto mb-auto w-12 h-12 rounded-md object-cover" />

                        <div className="flex-1">
                            <Link to={`/blogs/${a.slug}`} className="text-sm font-medium hover:underline">
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
