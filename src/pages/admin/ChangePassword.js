import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            toast({ title: "Внимание", description: "Заполните все поля" });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast({
                title: "Ошибка",
                description: "Пароли не совпадают",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin/change-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, oldPassword, newPassword }),
                }
            );
            const data = await res.json();

            if (data.success) {
                toast({ title: "Успешно", description: "Пароль обновлён" });
                setEmail("");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                navigate("/admin/login");
            } else {
                toast({
                    title: "Ошибка",
                    description: data.message || "Не удалось изменить пароль",
                    variant: "destructive",
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                title: "Ошибка",
                description: "Произошла ошибка на сервере",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md relative">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Смена пароля
                    <br />
                    <span className="text-base font-medium text-gray-500">
                        Введите email, старый и новый пароль
                    </span>
                </h1>

                <Input
                    type="email"
                    placeholder="Email администратора"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                />

                <Input
                    type="password"
                    placeholder="Старый пароль"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mb-4"
                />

                <Input
                    type="password"
                    placeholder="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mb-4"
                />

                <Input
                    type="password"
                    placeholder="Повторите новый пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-4"
                />

                <Button
                    className="w-full"
                    onClick={handleChangePassword}
                    disabled={loading}
                >
                    {loading ? "Сохраняется..." : "Сменить пароль"}
                </Button>

                <div className="flex justify-end mt-4 text-sm">
                    <a
                        href="/admin/login"
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Вернуться к входу
                    </a>
                </div>
            </div>
        </div>
    );
}
