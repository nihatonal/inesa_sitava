import React, { useState, useEffect, useCallback } from 'react';

import { Trash2 } from 'lucide-react';
import { Switch } from '../../components/ui/Switch';

import { FaStar } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Masonry from 'react-masonry-css';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { CheckCircle, XCircle } from 'lucide-react'; // Onay / red ikonları


export default function ReviewsList() {
    const { token } = useAuth();
    const { toast } = useToast();

    const [reviews, setReviews] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterApproved, setFilterApproved] = useState('all');
    const [loading, setLoading] = useState(true);

    // Auth kontrolü
    useEffect(() => {
        if (!token) {
            window.location.href = '/admin';
        }
    }, [token]);

    // Reviews fetch
    const fetchReviews = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setReviews(data || []);
        } catch (err) {
            console.error(err);
            toast({ title: 'Ошибка', description: 'Не удалось загрузить отзывы', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleApprove = async (id, approved) => {
        // UI’da hemen değiştir
        setReviews(prev => prev.map(r => r._id === id ? { ...r, approved } : r));

        try {
            const endpoint = approved
                ? `${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews/${id}/approve`
                : `${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews/${id}/unapprove`;

            const res = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Ошибка обновления");

            toast({
                title: approved ? "Отзыв опубликован" : "Отзыв снят с публикации",
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Ошибка",
                description: err.message,
                variant: 'destructive',
            });

            // Hata olursa UI’yı geri al
            setReviews(prev => prev.map(r => r._id === id ? { ...r, approved: !approved } : r));
        }
    };

    const filteredReviews = reviews.filter(r => {
        const matchName = r.name.toLowerCase().includes(filterName.toLowerCase());
        const matchApproved =
            filterApproved === 'all'
                ? true
                : filterApproved === 'approved'
                    ? r.approved
                    : !r.approved;
        return matchName && matchApproved;
    });

    // Butonlarda gösterilecek review sayıları
    const approvedCount = reviews.filter(r => r.approved).length;
    const unapprovedCount = reviews.filter(r => !r.approved).length;

    const breakpointColumnsObj = { default: 4, 1024: 3, 768: 2, 500: 1 };

    if (loading || !token) {
        return (
            <div className="flex h-screen justify-center mt-18">
                <Spinner size={60} color="#ff6347" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <Input
                    placeholder="Фильтр по имени пользователя"
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                    className="flex-1"
                />

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterApproved('all')}
                        className={`flex items-center gap-1 px-5 py-1 rounded-full border ${filterApproved === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 border-gray-300'
                            }`}
                    >
                        Все
                    </button>
                    <button
                        onClick={() => setFilterApproved('approved')}
                        className={`flex items-center gap-1 px-5 py-1 rounded-full border ${filterApproved === 'approved' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                            }`}
                    >
                        <CheckCircle className="w-4 h-4" />
                        ({approvedCount})
                    </button>
                    <button
                        onClick={() => setFilterApproved('unapproved')}
                        className={`flex items-center gap-1 px-5 py-1 rounded-full border ${filterApproved === 'unapproved' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                            }`}
                    >
                        <XCircle className="w-4 h-4" />
                        ({unapprovedCount})
                    </button>
                </div>
            </div>


            {filteredReviews.length === 0 && <p className="text-gray-500">Нет отзывов для отображения</p>}

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-6 w-auto"
                columnClassName="pl-6 bg-clip-padding space-y-6"
            >
                {filteredReviews.map(r => (
                    <div key={r._id} className="flex flex-col rounded-2xl shadow-lg bg-white overflow-hidden group relative">
                        {/* Delete button */}
                        <button
                            onClick={async () => {
                                if (!window.confirm('Вы уверены, что хотите удалить этот отзыв?')) return;

                                try {
                                    // 1️⃣ Review sil
                                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/reviews/${r._id}`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${token}`,
                                        },
                                    });

                                    const data = await res.json();
                                    if (!res.ok) throw new Error(data.message || 'Ошибка удаления');

                                    // 2️⃣ İlgili Yandex dosyasını sil
                                    if (r.fileName) {
                                        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/yandex/images/${r.imageUrl}`, {
                                            method: 'DELETE',
                                        });
                                    }

                                    // 3️⃣ Local state güncelle
                                    setReviews(prev => prev.filter(rv => rv._id !== r._id));
                                    toast({ title: 'Отзыв удален' });
                                } catch (err) {
                                    console.error(err);
                                    toast({
                                        title: 'Ошибка',
                                        description: err.message || 'Не удалось удалить отзыв',
                                        variant: 'destructive',
                                    });
                                }
                            }}
                            className="cursor-pointer absolute top-3 right-3 bg-red-400/60 hover:bg-red-600 p-2 rounded-full text-white z-10"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>


                        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
                            {r.imageUrl
                                ? (
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_URL}/api/yandex/images/${r.imageUrl}`}
                                        alt={r.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-primary/40 via-primary/20 to-transparent">
                                        <span className="text-4xl font-bold text-white rounded-full w-14 h-14 flex items-center justify-center">
                                            {r.name[0].toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            {r.imageUrl && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>}

                            <div className="absolute top-3 right-12 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-sm text-yellow-400 flex items-center gap-1">
                                <FaStar className="text-yellow-400 text-base drop-shadow-md" />
                                <span className="text-white">{r.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="flex-grow relative flex flex-col justify-between p-5 text-gray-800">
                            <p className="text-sm text-gray-700 leading-relaxed">{r.comment}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-700">{r.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {r.location} / {dayjs(r.holidayDate).locale('ru').format('MMMM YYYY')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Switch checked={r.approved} onChange={checked => handleApprove(r._id, checked)} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Masonry>
        </div>
    );
}
