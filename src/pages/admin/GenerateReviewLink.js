import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input'; // kendi Input komponentin
import { Button } from '../../components/ui/Button'; // kendi Button komponentin
import { useToast } from '../../hooks/use-toast';
import Container from '../../components/Container';
import AdminPageHeader from './AdminPageHeader';

export default function GenerateReviewLink() {
    const [guestName, setGuestName] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();
    const token = localStorage.getItem('token'); // Auth token

    const handleGenerate = async () => {
        if (!guestName.trim()) {
            toast({ title: 'Ошибка', description: 'Введите имя клиента перед созданием ссылки.', variant: 'destructive' });
            return;
        }

        if (!token) {
            toast({ title: 'Ошибка', description: 'Вы не авторизованы.', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/review-links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    guestName,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 gün geçerli
                }),
            });

            const data = await res.json();
            if (data._id) {
                setLink(`${window.location.origin}/submit-review/${data.token}`);
                toast({ title: 'Ссылка успешно создана!', variant: 'premium' });
            } else {
                toast({ title: 'Ошибка', description: data.message || 'Не удалось создать ссылку.', variant: 'destructive' });
            }
        } catch (err) {
            console.error(err);
            toast({ title: 'Ошибка сети', description: 'Проверьте подключение к интернету.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };


    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        toast({ title: 'Ссылка скопирована 📋' });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className='bg-[#F9F9FA] h-screen'>
            <Container className={"max-w-xl relative"}>

                <AdminPageHeader />

                <motion.div
                    className="max-w-md mx-auto text-center space-y-8 bg-white shadow-md p-8 rounded-2xl border border-gray-100"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Создать ссылку для отзыва
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Укажите имя клиента, чтобы отправить ему персональную ссылку для отзыва.
                    </p>

                    <div className="space-y-4">
                        <Input
                            placeholder="Имя клиента"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                        />

                        <Button
                            className="w-full cursor-pointer"
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? 'Создание...' : 'Создать ссылку'}
                        </Button>
                    </div>

                    {link && (
                        <motion.div
                            className="space-y-2 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Input value={link} readOnly className="text-sm" />
                            <Button
                                variant="outline"
                                className="w-full cursor-pointer"
                                onClick={copyToClipboard}
                            >
                                {copied ? 'Скопировано ✅' : 'Копировать'}
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </Container>
        </div>
    );
}
