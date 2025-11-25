import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, Send } from "lucide-react";
const NewsletterBanner = () => {
    const { t } = useTranslation('home');
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Ошибка при подписке");
            }
            toast({
                title: "Спасибо за подписку!",
            });
            setEmail("");
        } catch (err) {
            toast({
                title: "Ошибка",
                description: err.message,
                variant: 'destructive',
            });
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row justify-between item-center">
            <h2 className="mb-4 lg:mb-0 font-heading text-2xl md:text-4xl font-bold text-secondary">
                {t("newsletter.title")}
            </h2>

            <form onSubmit={handleSubmit}
                className="my-auto flex items-center gap-3">
                <input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-72 px-4 py-2 border border-2 border-secondary/30 rounded-full bg-background text-sm text-secondary-light focus:outline-none focus:border-secondary/60"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="hidden md:block min-w-64 px-4 py-2 bg-secondary text-muted rounded-full font-medium hover:bg-secondary-light transition disabled:opacity-50"
                >
                    {loading ? "Подписка..." : "Подписаться"}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="md:hidden w-10 h-10 bg-secondary rounded-full font-medium hover:bg-secondary-light transition disabled:opacity-50"
                >
                    {loading ? "Подписка..." : <Send className="w-4 h-4 mx-auto text-muted" />}
                </button>
            </form>
        </div>
    )
}

export default NewsletterBanner