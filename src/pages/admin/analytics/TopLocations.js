import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import Card from "../../../components/ui/Card";

export const TopLocations = ({ period }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/analytics/cities?period=${period}`
                );
                if (!res.ok) throw new Error("Не удалось получить данные о городах");
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError("Данные не удалось загрузить 😕");
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, [period]);

    // Mobil kontrolü
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // ilk render için
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Card className="w-full p-0 animate-fade-in">
            <h3 className="pl-6 pt-6">Топ городов по пользователям</h3>
            <div className="h-[350px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Загрузка...
                    </div>
                ) : error ? (
                    <p className="text-destructive text-center">{error}</p>
                ) : data.length === 0 ? (
                    <p className="text-muted-foreground text-center">Данные отсутствуют</p>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout={isMobile ? "vertical" : "horizontal"}
                            margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            {isMobile ? (
                                <>
                                    <XAxis type="number" stroke="#828385" />
                                    <YAxis
                                        type="category"
                                        dataKey="city"
                                        width={60}
                                        stroke="#828385"
                                        tick={{ fontSize: 12 }}
                                    />
                                </>
                            ) : (
                                <>
                                    <XAxis
                                        dataKey="city"
                                        angle={-30}
                                        textAnchor="end"
                                        interval={0}
                                        height={60}
                                    />
                                    <YAxis />
                                </>
                            )}
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #E6E6F2",
                                    borderRadius: "0.75rem",
                                }}
                                cursor={false}
                                formatter={(value) => [value, "Пользователи"]}
                            />
                            <Legend
                                layout="horizontal"
                                align="center"
                                verticalAlign={isMobile ? "bottom" : "top"}
                                wrapperStyle={isMobile ? { marginBottom: 0 } : { marginBottom: 20 }}
                            />
                            <Bar
                                dataKey="users"
                                fill="#6366f1"
                                radius={isMobile ? [0, 6, 6, 0] : [6, 6, 0, 0]}
                                name="Пользователи"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Card>
    );
};
