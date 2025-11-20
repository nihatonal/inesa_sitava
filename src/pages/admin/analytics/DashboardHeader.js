import { Calendar } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export const DashboardHeader = ({ period, onChange }) => {
    const periods = [
        { id: "daily", label: "Ежедневно" },
        { id: "weekly", label: "Еженедельно" },
        { id: "monthly", label: "Ежемесячно" },
        { id: "6months", label: "6 Месяцев" },
        { id: "yearly", label: "Ежегодно" }
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
            <div className="md:w-1/3">
                <h1 className="text-4xl font-bold text-foreground mb-2">Панель аналитики</h1>
                <p className="text-muted-foreground">Отслеживайте показатели вашего сайта и вовлеченность пользователей</p>
            </div>
            <div className="w-full md:w-2/3 md:justify-end flex flex-wrap gap-2 md:gap-3">
                {periods.map((item) => (
                    <Button
                        key={item.id}
                        id={item.id}
                        onClick={onChange}
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${period === item.id ? "bg-primary text-white" : ""}`}
                    >
                        <Calendar className="h-4 w-4" />
                        {item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};
