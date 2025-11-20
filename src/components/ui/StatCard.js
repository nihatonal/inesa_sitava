import React from "react";
import Card from './Card.js'

export const StatCard = ({ title, value, change, changeType = "neutral", icon: Icon, iconColor }) => {
    const changeColor =
        changeType === "positive"
            ? "text-chartGreen"
            : changeType === "negative"
                ? "text-chartDeepOrange"
                : "text-mutedForeground";

    return (
        <Card className="p-6 hover:shadow-lg transition-all ">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold text-foreground">{value}</p>
                    {change && <p className={`text-sm font-medium ${changeColor}`}>{change}</p>}
                </div>
                <div className={`p-3 rounded-xl ${iconColor}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </Card>
    );
};
