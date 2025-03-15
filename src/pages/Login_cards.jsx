import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Авторизация и сохранение токена
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.accessToken);
        toast.success("Успешный вход!");
        fetchUserProfile(); // Загружаем данные профиля после входа
      } else {
        toast.error(data.message || "Ошибка входа");
      }
    } catch (error) {
      toast.error("Ошибка сети");
    }
  };

  // Получение данных профиля
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("https://dummyjson.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {user.username ? (
        // Профиль пользователя
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">ЛИЧНЫЙ КАБИНЕТ</h2>
          <p className="text-gray-600">Редактирование профиля</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-700">Ваш Login:</label>
              <input className="w-full px-4 py-2 border rounded-lg" value={user.username} disabled />
            </div>
            <div>
              <label className="text-sm text-gray-700">Ваше ФИО:</label>
              <input className="w-full px-4 py-2 border rounded-lg" value={`${user.firstName} ${user.lastName}`} disabled />
            </div>
            <div>
              <label className="text-sm text-gray-700">Email адрес:</label>
              <input className="w-full px-4 py-2 border rounded-lg" value={user.email} disabled />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <img className="w-32 h-32 rounded-full" src={user.image} alt="Аватар" />
          </div>
          <Link to={"/"} className="font-bold mx-auto border flex justify-center rounded-xl px-1 py-2 bg-black text-white active:bg-black/70 mt-3"> <div>Войти</div></Link>
        </div>
      ) : (
        // Форма входа
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-center text-2xl font-semibold mb-6">Войти</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Логин:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Пароль:</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              ВОЙТИ
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
