// Pagination.jsx
export default function Pagination({ page, totalPages, onPage }) {
    return (
        <div className="flex gap-2 justify-center mt-6">
            <button
                onClick={() => onPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded-full"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => onPage(p)}
                    className={`px-3 py-1 rounded-full ${page === p ? "bg-primary text-white" : "border"
                        }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded-full"
            >
                Next
            </button>
        </div>
    );
}
