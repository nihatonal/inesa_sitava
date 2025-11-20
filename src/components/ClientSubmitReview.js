import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Textarea } from './ui/Textarea';
import { useToast } from '../hooks/use-toast';
import Container from './Container';
import Card from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export default function ReviewForm() {
    const { token } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null);
    const [validToken, setValidToken] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        rating: "",
        location: "",
        date: "",
        comment: "",
    });
    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setValidToken(false);
                return;
            }

            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reviews/check-token?token=${token}`);
                if (!res.ok) {
                    setValidToken(false);
                    return;
                }

                const data = await res.json();

                if (data && typeof data.valid === "boolean") {
                    setValidToken(data.valid);
                } else {
                    console.warn("Beklenmeyen yanıt formatı:", data);
                    setValidToken(false);
                }
            } catch (err) {
                console.error("Token kontrolü sırasında hata:", err);
                setValidToken(false);
            }
        };

        checkToken();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            setFile(null);
            setFileName(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validToken) {
            toast({
                title: "Ошибка",
                description: "Недействительная ссылка.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const bodyFormData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                bodyFormData.append(key, value);
            });
            bodyFormData.append("reviewDate", new Date().toISOString());
            bodyFormData.append("token", token);

            // Fotoğraf varsa
            if (file) {
                const fileData = new FormData();
                fileData.append("image", file);
                fileData.append("name", formData.name); // isim
                fileData.append("location", formData.location); // şehir
                fileData.append("date", formData.date); //  tarih
                const uploadRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/yandex/upload`, {
                    method: "POST",
                    body: fileData,
                });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) {
                    toast({
                        title: "Ошибка при загрузке изображения",
                        description: uploadData.message || "Не удалось загрузить фото",
                        variant: "destructive",
                    });
                    setLoading(false);
                    return;
                }
                bodyFormData.append("imageUrl", uploadData.fileName || "");
            }

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reviews/submit-review`, {
                method: "POST",
                body: bodyFormData,
            });

            const data = await res.json();

            if (res.ok) {
                toast({
                    title: "Спасибо!",
                    description: data.message || "Отзыв отправлен.",
                });
                setFormData({ name: "", rating: "", location: "", date: "", comment: "" });
                setFileName(null);
                setTimeout(() => navigate("/"), 2000);
            } else {
                toast({
                    title: "Произошла ошибка",
                    description: data.message || "Отзыв не отправлен.",
                    variant: "destructive",
                });
            }
        } catch (err) {
            console.error("Ошибка при отправке отзыва:", err);
            toast({
                title: "Ошибка",
                description: "Сервер недоступен. Попробуйте позже.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };




    if (validToken === null) {
        return <p className="text-center mt-20 text-gray-500">Проверка ссылки...</p>;
    }

    if (validToken === false) {
        return (
            <Container className="min-h-[350px] pt-14">
                <p className="text-center mt-20 text-red-600 font-semibold">
                    К сожалению, ссылка недоступна или её срок действия закончился. Пожалуйста, свяжитесь с администратором.
                </p>
            </Container>
        );
    }

    return (
        <Container>
            <Card className="my-4 max-w-md mx-auto mt-20 p-6 shadow-lg border border-gray-100">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">💬 Оставьте отзыв</h2>
                <p className="text-center text-gray-500 text-sm mb-4">
                    Поделитесь своим опытом, чтобы помочь другим путешественникам.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    {token && <Input type="hidden" name="token" value={token} />}

                    <Input
                        name="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        type="number"
                        name="rating"
                        placeholder="Оценка (1-5)"
                        min="1"
                        max="5"
                        step="0.5"
                        value={formData.rating}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        name="location"
                        placeholder="Город или страна"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        type="month"
                        name="date"
                        placeholder="Дата путешествия"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="border rounded px-2 py-1"
                    />

                    <Textarea
                        name="comment"
                        placeholder="Ваш отзыв"
                        value={formData.comment}
                        onChange={handleInputChange}
                        required
                        className="min-h-[100px]"
                    />

                    <div className="flex flex-col space-y-2">
                        <label className="block text-gray-700 font-medium">Фото (необязательно)</label>
                        <div className="flex items-center gap-3">
                            <label htmlFor="image" className="px-4 py-1 text-sm bg-sky-600 text-white rounded-lg cursor-pointer hover:bg-sky-700 transition">
                                Выбрать файл
                            </label>
                            <span className="text-gray-500 text-sm">{fileName || 'Файл не выбран'}</span>
                        </div>
                        <Input type="file" name="image" id="image" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full mt-2 cursor-pointer">
                        {loading ? 'Отправка...' : 'Отправить отзыв'}
                    </Button>
                </form>
            </Card>
        </Container>
    );
}
