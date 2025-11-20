import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/use-toast';
import { useNavigate } from 'react-router-dom'; // Eğer React Router kullanıyorsan
// import { useRouter } from 'next/navigation'; // Eğer Next.js kullanıyorsan

export default function AdminPasswordResetModal({ isOpen, onClose }) {
    const { toast } = useToast();
    const navigate = useNavigate(); // React Router için
    // const router = useRouter(); // Next.js için
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestCode = async () => {
        if (!email) {
            toast({ title: 'Внимание', description: 'Введите адрес электронной почты', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/request-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                toast({ title: 'Код отправлен', description: 'Проверьте вашу электронную почту', variant: 'premium' });
                setStep(2);
            } else {
                toast({ title: 'Ошибка', description: data.message || 'Произошла ошибка', variant: 'destructive' });
            }
        } catch (err) {
            console.error(err);
            toast({ title: 'Ошибка', description: 'Произошла непредвиденная ошибка', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!code || !newPassword || !confirmPassword) {
            toast({ title: 'Внимание', description: 'Заполните все поля', variant: 'destructive' });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast({ title: 'Ошибка', description: 'Пароли не совпадают', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, newPassword }),
            });

            const data = await res.json();

            if (data.success) {
                toast({ title: 'Успешно', description: 'Пароль успешно изменён. Теперь вы можете войти.', variant: 'premium' });
                onClose();
                navigate('/admin/login'); // React Router
                // router.push('/admin'); // Next.js kullanıyorsan bunu aç
            } else {
                toast({ title: 'Ошибка', description: data.message || 'Произошла ошибка', variant: 'destructive' });
            }
        } catch (err) {
            console.error(err);
            toast({ title: 'Ошибка', description: 'Произошла ошибка при сбросе пароля', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>

                        {step === 1 ? (
                            <>
                                <h2 className="text-2xl font-bold text-center mb-6">
                                    Восстановление пароля
                                </h2>
                                <Input
                                    type="email"
                                    placeholder="Введите ваш адрес электронной почты"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mb-4"
                                />
                                <Button onClick={handleRequestCode} disabled={loading} className="w-full">
                                    {loading ? 'Отправляется...' : 'Отправить код'}
                                </Button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-center mb-6">
                                    Новый пароль
                                </h2>
                                <Input
                                    type="text"
                                    placeholder="Введите код из письма"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="mb-4"
                                />
                                <Input
                                    type="password"
                                    placeholder="Введите новый пароль"
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
                                <Button onClick={handleResetPassword} disabled={loading} className="w-full">
                                    {loading ? 'Сохраняется...' : 'Сбросить пароль'}
                                </Button>

                                <p
                                    className="text-sm text-center text-blue-600 mt-4 cursor-pointer hover:underline"
                                    onClick={() => setStep(1)}
                                >
                                    Назад
                                </p>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
