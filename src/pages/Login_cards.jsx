import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LoginCards = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("https://dummyjson.com/auth/login", 
        { username, password, expiresInMins: 30 }, 
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Успешный вход:", data);
      localStorage.setItem("token", data.token); // Сохраняем токен
      toast.success("Успешный вход!");
      navigate("/"); // Перенаправляем на главную
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Ошибка входа";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-center text-2xl font-semibold mb-6">Войти</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Логин:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Пароль:</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            ВОЙТИ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCards;

