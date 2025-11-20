import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Button } from '../../components/ui/Button';
import Container from '../../components/Container';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';
import AdminPageHeader from './AdminPageHeader';
import { Trash2, Copy } from 'lucide-react';
export default function AdminReviewLinks() {
    const { token } = useAuth();
    const { toast } = useToast();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    // Fetch links
    const fetchLinks = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/review-links`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setLinks(data.links || []);
        } catch (err) {
            console.error(err);
            toast({
                title: 'Ошибка',
                description: 'Не удалось загрузить ссылки',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [token, toast]);

    useEffect(() => {
        if (token) fetchLinks();
    }, [fetchLinks, token]);

    const copyToClipboard = async (token) => {
        const url = `${window.location.origin}/submit-review/${token}`;
        await navigator.clipboard.writeText(url);
        toast({ title: 'Ссылка скопирована 📋' });
    };

    const getRemainingTime = (expiresAt) => {
        const now = dayjs();
        const end = dayjs(expiresAt);
        if (end.isBefore(now)) return 'Срок действия истёк';

        let diff = end.diff(now); // ms
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * 1000 * 60 * 60 * 24;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(diff / (1000 * 60));

        const parts = [];
        if (days > 0) parts.push(`${days}д`);
        if (hours > 0 || days > 0) parts.push(`${hours}ч`);
        if (minutes > 0) parts.push(`${minutes}м`);

        return parts.join(' ');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить ссылку?')) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews-link/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.success) {
                toast({ title: 'Ссылка удалена 🗑️' });
                // Link'i state'den anında çıkar
                setLinks((prev) => prev.filter((link) => link._id !== id));
            } else {
                toast({
                    title: 'Ошибка',
                    description: data.message || 'Не удалось удалить ссылку',
                    variant: 'destructive',
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                title: 'Ошибка',
                description: 'Не удалось удалить ссылку',
                variant: 'destructive',
            });
        }
    };

    const truncateToken = (token, length = 15) =>
        token.length > length ? token.slice(0, length) + '...' : token;

    // Filtrelenmiş linkler
    const filteredLinks = useMemo(() => {
        return links.filter((link) =>
            link.guestName?.toLowerCase().includes(filter.toLowerCase()) || false
        );
    }, [links, filter]);

    return (
        <div className='bg-[#F9F9FA] h-screen'>
            <Container className={"pb-24 md:pb-12"}>
                <AdminPageHeader />
                <div>
                    <h1 className="text-2xl font-semibold mb-6">Ссылки для отзывов</h1>

                    <input
                        type="text"
                        placeholder="Поиск по гостю..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded-md w-full max-w-sm mb-4 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none"
                    />

                    {loading ? (
                        <p>Загрузка...</p>
                    ) : (
                        <div className="w-full mt-6">
                            {/* Desktop */}
                            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50 border-b">
                                        <tr className="text-left text-gray-600">
                                            <th className="px-4 py-3">Гость</th>
                                            <th className="px-4 py-3">Токен</th>
                                            <th className="px-4 py-3">Использовано?</th>
                                            <th className="px-4 py-3">Создано</th>
                                            <th className="px-4 py-3">Срок действия</th>
                                            <th className="px-4 py-3 text-center">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLinks.map((link) => (
                                            <tr key={link._id} className="border-t hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2 font-medium text-gray-700">{link.guestName || 'Не указано'}</td>
                                                <td className="px-4 py-2 font-mono text-gray-700">{truncateToken(link.token)}</td>
                                                <td className="px-4 py-2">
                                                    {link.used ? (
                                                        <span className="text-green-600 font-semibold">Да ✅</span>
                                                    ) : (
                                                        <span className="text-red-500 font-semibold">Нет ❌</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-gray-600">
                                                    {dayjs(link.createdAt).locale('ru').format('DD MMM YYYY, HH:mm')}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span className={`px-2 py-1 rounded-md text-xs ${link.used ? 'bg-gray-100 text-gray-500' : 'bg-sky-100 text-sky-700'}`}>
                                                        {getRemainingTime(link.expiresAt)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 space-x-2 text-center">
                                                    <Button className='border-none bg-transparent' size="sm" variant="outline" onClick={() => copyToClipboard(link.token)}>
                                                        <Copy className="w-4 h-4" />
                                                    </Button>
                                                    <Button className='border-none bg-transparent text-rose-600 hover:bg-rose-500' size="sm" variant="outline" onClick={() => handleDelete(link._id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredLinks.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                                    Нет ссылок для отображения
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile */}
                            <div className="md:hidden space-y-4">
                                {filteredLinks.map((link) => (
                                    <div key={link._id} className=" flex flex-col border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-600">Гость:</span>
                                            <span className="text-sm text-gray-800">{link.guestName || 'Не указано'}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-600">Токен:</span>
                                            <span className="font-mono text-gray-800 text-sm truncate">{truncateToken(link.token)}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-600">Использовано:</span>
                                            <span className={`text-sm font-semibold ${link.used ? 'text-green-600' : 'text-red-500'}`}>
                                                {link.used ? 'Да ✅' : 'Нет ❌'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-600">Создано:</span>
                                            <span className="text-sm text-gray-700">
                                                {dayjs(link.createdAt).locale('ru').format('DD MMM YYYY, HH:mm')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-4">
                                            <span className="text-sm font-medium text-gray-600">Срок:</span>
                                            <span className={`text-xs px-2 py-1 rounded-md ${link.used ? 'bg-gray-100 text-gray-500' : 'bg-sky-100 text-sky-700'}`}>
                                                {getRemainingTime(link.expiresAt)}
                                            </span>
                                        </div>
                                        <div className='flex gap-4 ml-auto'>
                                            <Button className='border bg-transparent' size="sm" variant="outline" onClick={() => copyToClipboard(link.token)}>
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                            <Button className='border bg-transparent text-rose-600 hover:bg-rose-500' size="sm" variant="outline" onClick={() => handleDelete(link._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
