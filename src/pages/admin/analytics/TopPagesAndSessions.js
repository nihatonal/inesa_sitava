import React, { useEffect, useState } from "react";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from "recharts";
import Card from "../../../components/ui/Card";

const TopPagesAndSessions = ({ period }) => {
    const [topPagesData, setTopPagesData] = useState([]);
    const [sessionData, setSessionData] = useState([]);


    useEffect(() => {
        const fetchCharts = async () => {
            try {
                // Top Pages
                const topPagesRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/top-pages?period=${period}`);
                const topPagesJson = await topPagesRes.json();
                setTopPagesData(topPagesJson); // [{ path, views }]

                // Session Duration
                const sessionRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/session-duration?period=${period}`);
                const sessionJson = await sessionRes.json();
                setSessionData(sessionJson); // [{ day, seconds }]

            } catch (err) {
                console.error("Ошибка загрузки графиков:", err);
            }
        };

        fetchCharts();
    }, [period]);


    return (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
            {/* Top Pages */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Популярные страницы</h3>
                <ResponsiveContainer width="100%" height={Math.max(topPagesData.length * 60, 300)}>
                    <BarChart data={topPagesData} layout="vertical" margin={{ left: 0, right: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E6E6F2" />
                        <XAxis type="number" stroke="#828385" />
                        <YAxis
                            dataKey="path"
                            type="category"
                            stroke="#828385"
                            width={88}
                            tick={{ fontSize: 13, fill: "#828385" }}
                            interval={0} // показать все подписи
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "1px solid #E6E6F2",
                                borderRadius: "0.75rem"
                            }}
                            cursor={false}
                            formatter={(value) => [value, "Просмотры"]}
                        />
                        <Bar dataKey="views" fill="#7E5BC0" radius={[0, 8, 8, 0]} animationDuration={1000} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Session Duration */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Длительность сессии (секунды)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sessionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E6E6F2" />
                        <XAxis dataKey="day" stroke="#828385" />
                        <YAxis stroke="#828385" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "#E6E6F2",
                                borderRadius: "0.75rem"
                            }}
                            cursor={false}
                            formatter={(value) => [value, "Cекунды"]}
                        />
                        <Line
                            type="monotone"
                            dataKey="seconds"
                            stroke="#00FFE1"
                            strokeWidth={3}
                            dot={{ fill: "#00FFE1", r: 4 }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default TopPagesAndSessions;
