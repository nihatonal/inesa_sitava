import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import Container from "./Container";
import Logo from "./Logo";
import { useToast } from "../hooks/use-toast";

const Footer = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

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
        <footer className="bg-gradient-to-b from-primary-dark to-secondary text-muted border-t border-border py-12">
            <Container className="py-12">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 items-start">
                    {/* Brand */}
                    <div className="space-y-4 min-h-[80px]">
                        <Logo />
                        <p className="text-sm text-muted-foreground">
                            Ваш проводник в мире путешествий. Создаём незабываемые впечатления с 2012 года.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Навигация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Направления
                                </Link>
                            </li>
                            <li>
                                <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Отзывы
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Политика конфиденциальности
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Политика использования файлов cookie
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Условия использования
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-4">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4 text-primary" />
                                <a href="tel:+79210282888" className="hover:text-primary transition-colors">
                                    +7 (921) 028 28 88
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href="mailto:info@travel.com" className="hover:text-primary transition-colors">
                                    info@travel.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                                <a
                                    href="https://wa.me/79210282888"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FaTelegramPlane className="w-4 h-4 text-[#0088cc]" />
                                <a
                                    href="https://t.me/+79210282888"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Telegram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold mb-4">Подпишитесь на новости</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Ваш email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-2 border border-border rounded-md bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-primary text-muted rounded-md font-medium hover:opacity-90 transition disabled:opacity-50"
                            >
                                {loading ? "Подписка..." : "Подписаться"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Travel. Все права защищены.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
