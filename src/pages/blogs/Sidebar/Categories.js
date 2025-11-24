export default function Categories({ categories, selectedCategory, onFilterCategory, className }) {
    return (
        <div className={`${className} bg-white p-4 rounded-xl shadow-sm`}>
            <h4 className="font-semibold mb-3">Категории</h4>

            <div className="flex flex-wrap gap-2">

                <button
                    onClick={() => onFilterCategory(null)}
                    className={`text-sm ${!selectedCategory ? "font-bold" : ""}`}
                >
                    Все
                </button>

                {categories.map((c) => (
                    <button
                        key={c.slug}
                        onClick={() => onFilterCategory(c.slug)}
                        className={`text-sm ${selectedCategory === c.slug ? "font-bold" : "text-secondary/70"}`}
                    >
                        {c.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
