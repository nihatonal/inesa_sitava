// Sidebar/SearchBox.jsx
export default function SearchBox({ search, setSearch, className }) {
    return (
        <div className={`${className} bg-white p-4 rounded-xl shadow-sm`}>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск статей..."
                className="w-full px-3 py-2 border rounded-md text-sm"
            />
        </div>
    );
}
