export default function Destinations({ destinations, selectedDestination, onFilterDestination, className }) {
    return (
        <div className={`${className} bg-white p-4 rounded-xl shadow-sm`}>
            <h4 className="font-semibold mb-3">Направления</h4>

            <div className="flex flex-wrap gap-2">

                <button
                    onClick={() => onFilterDestination(null)}
                    className={`text-sm ${!selectedDestination ? "font-bold" : ""}`}
                >
                    Все
                </button>

                {destinations.map((d) => (
                    <button
                        key={d.slug}
                        onClick={() => onFilterDestination(d.slug)}
                        className={`text-sm ${selectedDestination === d.slug ? "font-bold" : "text-secondary/70"}`}
                    >
                        {d.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
