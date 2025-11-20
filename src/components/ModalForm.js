import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePhone } from "react-icons/ai";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import Spinner from './ui/Spinner'
const ModalForm = ({ open, setOpen }) => {
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
        contactMethod: "Телефон",
        agree: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "phone"
                        ? formatPhone(value)
                        : value,
        }));
    };

    const handleContactMethod = (method) => {
        setFormData((prev) => ({ ...prev, contactMethod: method }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/forms/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // formData içindeki tüm alanları gönderiyoruz
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Ошибка при отправке формы");
            }

            // Başarılıysa
            toast({
                title: "Заявка успешно отправлена!",
            });

            setFormData({
                name: "",
                phone: "",
                message: "",
                contactMethod: "Телефон",
                agree: false,
            });
            setOpen(false);

        } catch (err) {
            setError(err.message);
            toast({
                title: "Ошибка",
                description: err.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };


    const contactOptions = [
        { id: "phone", label: "Телефон", icon: <AiOutlinePhone size={20} className='' /> },
        { id: "telegram", label: "Telegram", icon: <SiTelegram size={20} className='text-[#1d98dc]' /> },
        { id: "whatsapp", label: "WhatsApp", icon: <SiWhatsapp size={20} className='text-[#27d061]' /> },
    ];

    const formatPhone = (value) => {
        // Sadece rakamları al
        let digits = value.replace(/\D/g, "");

        // Eğer +7 ile başlıyorsa, +7’yi koruyalım
        let prefix = "";
        if (digits.startsWith("7") || digits.startsWith("8")) {
            prefix = digits.startsWith("7") ? "+7" : "8";
            digits = digits.slice(1); // ilk rakamı kaldır
        } else if (digits.startsWith("9")) {
            // 9 ile başlıyorsa otomatik +7 ekle
            prefix = "+7";
        } else {
            prefix = "+7";
        }

        // Maksimum 10 hane (ülke kodu hariç)
        digits = digits.slice(0, 10);

        let result = prefix;

        if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
        if (digits.length >= 4) result += `) ${digits.slice(3, 6)}`;
        if (digits.length >= 7) result += `-${digits.slice(6, 8)}`;
        if (digits.length >= 9) result += `-${digits.slice(8, 10)}`;

        return result;
    };

    return (
        <>
            {/* Açma Butonu */}
            {/* <button
                onClick={() => setOpen(true)}
                className={`${className} px-8 py-2 bg-secondary text-muted font-medium rounded-full shadow-large hover:scale-[1.05] transition`}
            >
                Оставить заявку
            </button> */}

            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed h-screen inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => {
                                setOpen(false)
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7, y: -40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: -40 }}
                            transition={{ type: "spring", stiffness: 120, damping: 15 }}
                            className="fixed max-w-lg mx-auto h-[620px] top-16 inset-0 flex items-start justify-center z-50"
                        >
                            <div className="w-full max-w-md rounded-2xl bg-muted text-secondary shadow-large p-8 relative">
                                <h2 className="text-3xl font-serif text-heading text-secondary text-center mb-2">
                                    Оставить заявку
                                </h2>
                                <p className="text-center text-secondary text-sm mb-6">
                                    Введите свои контакты в поля ввода
                                </p>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    {/* İsim Soyisim */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">
                                            Имя Фамилия
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
                                            placeholder="Введите имя"
                                        />
                                    </div>

                                    {/* Telefon */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">
                                            Телефон
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
                                            placeholder="+7 (000) 000-00-00"
                                        />
                                    </div>

                                    {/* İletişim Metodu */}
                                    <div>
                                        <p className="text-sm font-medium text-secondary mb-2">
                                            Где с Вами удобно связаться?
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {contactOptions.map((method) => (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    onClick={() => handleContactMethod(method.id)}
                                                    className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-1 transition
                            ${formData.contactMethod === method.id
                                                            ? "bg-primary/20 text-secondary border-secondary"
                                                            : "border-input text-secondary hover:bg-muted hover:text-primary-dark"
                                                        }`}
                                                >
                                                    {method.icon}  <span className="hidden md:block">{method.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mesaj */}
                                    <div>
                                        {/* <label className="block text-sm font-medium text-muted-foreground mb-1">
                                            Ваши пожелания по отдыху
                                        </label> */}
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition resize-none"
                                            placeholder="Опишите ваши пожелания..."
                                        />
                                    </div>

                                    {/* Onay Kutusu */}
                                    <label className="flex items-center gap-2 text-xs text-secondary">
                                        <input
                                            type="checkbox"
                                            name="agree"
                                            checked={formData.agree}
                                            onChange={handleChange}
                                            className="accent-primary/50 w-4 h-4"
                                            required
                                        />
                                        <span>
                                            Я ознакомлен и согласен с{" "}
                                            <Link
                                                to="/privacy-policy"
                                                className="text-primary underline hover:text-accent"
                                            >
                                                условиями обработки персональных данных
                                            </Link>{" "}
                                            и{" "}
                                            <Link
                                                to="/privacy-policy"
                                                className="text-primary underline hover:text-accent"
                                            >
                                                политики конфиденциальности
                                            </Link>
                                            .
                                        </span>
                                    </label>

                                    {/* Gönder Butonu */}
                                    <button
                                        type="submit"
                                        className="w-full bg-primary flex items-center justify-center text-muted rounded-lg py-2 font-medium hover:bg-primary-dark transition"
                                    >
                                        {!loading ? "Отправить заявку" : <Spinner size={24} color="#fff" />}
                                    </button>
                                </form>

                                {/* Kapatma Butonu */}
                                <button
                                    onClick={() => setOpen(false)}
                                    className="absolute top-3 right-4 text-secondary/50 text-2xl hover:text-secondary/80 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ModalForm;
