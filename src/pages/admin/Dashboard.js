import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Link2, MessageSquare, KeyRound, Mail, BarChart3 } from "lucide-react";
import LogoutButton from "../../components/LogoutButton";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      navigate("/admin/login");
    }
  }, [token, loading, navigate]);

  if (loading || !token)
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner size={60} color="#ff6347" />
      </div>
    );

  const cards = [
    { title: "Сгенерировать ссылку", href: "/admin/generate-review-link", icon: <Link2 className="w-6 h-6" /> },
    { title: "Отзывы", href: "/admin/reviews", icon: <MessageSquare className="w-6 h-6" /> },
    { title: "Ссылки отзывов", href: "/admin/review-links", icon: <KeyRound className="w-6 h-6" /> },
    { title: "Рассылка", href: "/admin/newsletter", icon: <Mail className="w-6 h-6" /> },
    { title: "Google Аналитика", href: "/admin/analytics", icon: <BarChart3 className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4 md:px-16 relative">
      <div className="absolute right-3 top-3">
        <LogoutButton redirectTo="/admin/login" />
      </div>

      <h1 className="text-gray-900 text-2xl md:text-3xl font-bold mb-8 text-center">
        Панель администратора
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.href}
            className="flex md:flex-col gap-4 items-center justify-start bg-white shadow-md rounded-2xl p-6 md:p-8 hover:scale-105 transition-transform duration-300 border border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 inline-flex p-3 md:p-4 rounded-full text-white md:mb-4">
              {c.icon}
            </div>
            <h2 className="text-gray-900 text-sm md:text-lg font-semibold">{c.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
