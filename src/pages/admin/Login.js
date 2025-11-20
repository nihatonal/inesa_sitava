import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import AdminPasswordResetModal from './AdminPasswordResetModal';
import { useNavigate } from "react-router-dom";
import { useToast } from '../../hooks/use-toast';
import { useAuth } from "../../context/AuthContext";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        login({ token: data.token, admin: data.admin });
        toast({ title: 'Успешно', description: 'Вы вошли в систему' });
        navigate("/admin/dashboard");
      } else {
        toast({ title: 'Ошибка', description: data.message || 'Неправильные учетные данные', variant: 'destructive' });
      }
    } catch (err) {
      console.error(err);
      toast({ title: 'Ошибка', description: 'Произошла ошибка на сервере', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen px-3 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md relative">
          <h1 className="text-xl font-bold mb-6 text-center">
            Добро пожаловать, <span className="text-primary-dark text-2xl pacifico-regular ">Татьяна</span>
            <br />
            {/* <span className="text-sm font-medium text-gray-500">
              Вход для администратора
            </span> */}
          </h1>

          <Input
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />

          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          <Button
            className="w-full mb-2"
            onClick={handleLogin}
            disabled={loading || !username || !password}
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>

          <div className="flex gap-4 justify-end mt-2 text-sm">
            <p
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setModalOpen(true)}
            >
              Забыли пароль?
            </p>

            <a
              href="/admin/change-password"
              className="text-blue-600 hover:underline"
            >
              Сменить пароль
            </a>
          </div>
        </div>
      </div>

      <AdminPasswordResetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
