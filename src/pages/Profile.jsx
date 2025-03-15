import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Получение данных профиля
    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">ЛИЧНЫЙ КАБИНЕТ</h2>
                <p className="text-gray-600">Редактирование профиля</p>

                {loading ? (
                    <p className="text-center text-gray-500">Загрузка...</p>
                ) : user ? (
                    <div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="text-sm text-gray-700">Ваш Login:</label>
                                <input className="w-full px-4 py-2 border rounded-lg bg-gray-100" value={user.username} readOnly />
                            </div>
                            <div>
                                <label className="text-sm text-gray-700">Ваше ФИО:</label>
                                <input className="w-full px-4 py-2 border rounded-lg bg-gray-100" value={`${user.firstName} ${user.lastName}`} readOnly />
                            </div>
                            <div>
                                <label className="text-sm text-gray-700">Email адрес:</label>
                                <input className="w-full px-4 py-2 border rounded-lg bg-gray-100" value={user.email} readOnly />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <img className="w-32 h-32 rounded-full" src={user.image} alt="Аватар" />
                        </div>
                       
                    </div>
                ) : (
                    <p className="text-center text-red-500">Не удалось загрузить профиль</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
