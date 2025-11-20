import React, { useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/ui/Spinner";
import { Input } from "../../components/ui/Input";
import Container from "../../components/Container";
import AdminPageHeader from "./AdminPageHeader";

export default function Newsletter() {
    const { token } = useAuth();
    const { toast } = useToast();

    const [subscribers, setSubscribers] = useState([]);
    const [filterEmail, setFilterEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedEmails, setSelectedEmails] = useState([]); // ✅ Seçilen emailler
    const [selectAll, setSelectAll] = useState(false); // ✅ Tümünü seç

    // Auth kontrolü
    useEffect(() => {
        if (!token) {
            window.location.href = "/admin";
        }
    }, [token]);

    const fetchSubscribers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter/admin`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Ошибка при получении подписчиков");
            const data = await res.json();
            setSubscribers(data.subscribers || []);
        } catch (err) {
            console.error(err);
            toast({ title: "Ошибка", description: err.message || "Не удалось загрузить подписчиков", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }, [token, toast]);

    useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

    const deleteSubscriber = async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить подписчика?")) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter/admin/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Ошибка при удалении");

            setSubscribers(subscribers.filter((s) => s._id !== id));
            setSelectedEmails(prev => prev.filter(email => email !== subscribers.find(s => s._id === id)?.email));
            toast({ title: "Подписчик удален" });
        } catch (err) {
            console.error(err);
            toast({ title: "Ошибка", description: err.message || "Не удалось удалить подписчика", variant: "destructive" });
        }
    };

    const filteredSubscribers = subscribers.filter((s) =>
        s.email.toLowerCase().includes(filterEmail.toLowerCase())
    );

    // ✅ Checkbox handler
    const toggleSelectEmail = (email) => {
        setSelectedEmails(prev =>
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
        );
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(filteredSubscribers.map(s => s.email));
        }
        setSelectAll(!selectAll);
    };

    // ✅ Send Mail
    const handleSendMail = () => {
        if (selectedEmails.length === 0) {
            toast({ title: "Выберите хотя бы один email", variant: "destructive" });
            return;
        }
        const mailtoLink = `mailto:${selectedEmails.join(",")}`;
        window.location.href = mailtoLink;
    };

    if (loading || !token) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Spinner size={60} color="#06b6d4" />
            </div>
        );
    }

    return (
        <div className='bg-[#F9F9FA]'>
            <Container className={'pb-24 md:pb-12'}>
                <AdminPageHeader />

                <div className="min-h-screen max-w-2xl mx-auto bg-muted p-4 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-heading mb-4">Newsletter Admin</h1>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
                        <Input
                            placeholder="Фильтр по email"
                            value={filterEmail}
                            onChange={(e) => setFilterEmail(e.target.value)}
                            className="flex-1"
                        />
                        <button
                            onClick={handleSendMail}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
                        >
                            Отправить email
                        </button>
                    </div>

                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                            className="mr-2"
                        />
                        <span>Выбрать все ({filteredSubscribers.length})</span>
                    </div>

                    {filteredSubscribers.length === 0 ? (
                        <p className="text-muted-foreground">Нет подписчиков для отображения</p>
                    ) : (
                        <div className="grid gap-4 md:gap-6">
                            {filteredSubscribers.map((sub) => (
                                <div key={sub._id} className="bg-card rounded-xl shadow-large p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 w-full">
                                        <input
                                            type="checkbox"
                                            checked={selectedEmails.includes(sub.email)}
                                            onChange={() => toggleSelectEmail(sub.email)}
                                            className="mr-2"
                                        />
                                        <div className="font-medium text-foreground break-all">{sub.email}</div>
                                        <div className="text-sm text-muted-foreground mt-1 md:mt-0">
                                            {new Date(sub.createdAt).toLocaleString("ru-RU")}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteSubscriber(sub._id)}
                                        className="mt-3 md:mt-0 p-2 rounded-md bg-destructive text-destructive-foreground hover:opacity-90 transition flex-shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
