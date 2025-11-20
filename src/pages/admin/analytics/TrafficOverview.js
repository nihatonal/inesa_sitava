import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export const TrafficOverview = ({ period }) => {
    const [deviceData, setDeviceData] = useState([]);
    const [trafficSourceData, setTrafficSourceData] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/traffic-overview?period=${period}`);
                if (!res.ok) throw new Error("Не удалось получить данные о трафике");
                const data = await res.json();

                setDeviceData([
                    { name: "Десктоп", value: data.devices.desktop, color: "#7ABB7E" },
                    { name: "Мобильный", value: data.devices.mobile, color: "#3BA3E8" },
                    { name: "Планшет", value: data.devices.tablet, color: "#EFC531" },
                ]);

                setTrafficSourceData(mapTrafficSources(data.sources));
            } catch (err) {
                console.error(err);
            } finally {
            }
        };

        fetchAnalytics();
    }, [period]);

    // if (loading) {
    //     return <div className="p-6 text-center text-muted-foreground">Загрузка аналитики...</div>;
    // }

    return (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
            {/* Device Distribution */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Распределение устройств</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={800}
                        >
                            {deviceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip cursor={false} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>

            {/* Traffic Sources */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Источники трафика</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trafficSourceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E6E6F2" />
                        <XAxis dataKey="name" stroke="#828385" />
                        <YAxis stroke="#828385" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #E6E6F2",
                                borderRadius: "0.75rem",
                            }}
                            formatter={(value) => [value, "Сеансы"]}
                            cursor={false}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                            {trafficSourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};
