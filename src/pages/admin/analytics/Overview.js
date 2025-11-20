import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';

import { Users, Eye, Clock, TrendingUp } from "lucide-react";
import { StatCard } from '../../../components/ui/StatCard';
const Overview = ({ period }) => {
    const { token } = useAuth();
    const [stats, setStats] = useState([]);
    const [warning, setWarning] = useState(null);
    // Auth kontrolü
    useEffect(() => {
        if (!token) {
            window.location.href = '/admin';
        }
    }, [token]);

    const periodLabels = {
        daily: "с прошлого дня",
        weekly: "с прошлой недели",
        monthly: "с прошлого месяца",
        "6months": "с последних 6 месяцев",
        yearly: "с прошлого года",
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics/overview?period=${period}`)
            .then(res => res.json())
            .then(data => {
                setWarning(data.warning || null); // warning var mı kontrol et
                const formattedStats = [
                    {
                        title: "Всего посетителей",
                        value: data.totalVisitors.value.toLocaleString(),
                        change: data.totalVisitors.change
                            ? `${data.totalVisitors.change} ${periodLabels[period]}`
                            : null,
                        changeType: data.totalVisitors.change && data.totalVisitors.change.startsWith("-") ? "negative" : "positive",
                        icon: Users,
                        iconColor: "bg-chartBlue",
                    },
                    {
                        title: "Просмотры страниц",
                        value: data.pageViews.value.toLocaleString(),
                        change: data.pageViews.change
                            ? `${data.pageViews.change} ${periodLabels[period]}`
                            : null,
                        changeType: data.pageViews.change && data.pageViews.change.startsWith("-") ? "negative" : "positive",
                        icon: Eye,
                        iconColor: "bg-chartDeepPurple",
                    },
                    {
                        title: "Средняя длительность сессии",
                        value: convertSecondsToMinutes(data.avgSessionDuration.value),
                        change: data.avgSessionDuration.change
                            ? `${data.avgSessionDuration.change} ${periodLabels[period]}`
                            : null,
                        changeType: data.avgSessionDuration.change && data.avgSessionDuration.change.startsWith("-") ? "negative" : "positive",
                        icon: Clock,
                        iconColor: "bg-chartAmber",
                    },
                    {
                        title: "Показатель отказов",
                        value: (data.bounceRate.value * 100).toFixed(1) + "%",
                        change: data.bounceRate.change
                            ? `${data.bounceRate.change} ${periodLabels[period]}`
                            : null,
                        changeType: data.bounceRate.change && data.bounceRate.change.startsWith("-") ? "negative" : "positive",
                        icon: TrendingUp,
                        iconColor: "bg-chartGreen",
                    },
                ];

                setStats(formattedStats);
            });
    }, [period]);
    function convertSecondsToMinutes(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}m ${secs}s`;
    }

    return (
        <div>

            {/* Uyarı varsa göster */}
            {warning && (
                <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded">
                    {warning}
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </div>
    )
}

export default Overview