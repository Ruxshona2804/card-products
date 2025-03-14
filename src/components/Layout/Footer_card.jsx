import React from 'react';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';

const FooterCard = () => {
  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Каталог */}
        <div>
          <h3 className="font-bold text-lg mb-3">КАТАЛОГ</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white transition">Одежда</li>
            <li className="hover:text-white transition">Обувь</li>
            <li className="hover:text-white transition">Аксессуары</li>
            <li className="hover:text-white transition">Расчет стоимости</li>
          </ul>
        </div>

        {/* Информация */}
        <div>
          <h3 className="font-bold text-lg mb-3">ИНФОРМАЦИЯ</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white transition">Блог</li>
            <li className="hover:text-white transition">Контакты</li>
            <li className="hover:text-white transition">Доставка</li>
            <li className="hover:text-white transition">Оплата</li>
            <li className="hover:text-white transition">FAQ</li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="font-bold text-lg mb-3">КОНТАКТЫ</h3>
          <p className="mb-2 text-gray-400">info@grafus.info</p>
          <p className="mb-4 text-gray-400">+998 00 000 00 00</p>
          <h4 className="font-semibold mb-2">МЕССЕНДЖЕРЫ</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <FaTelegramPlane size={24} className="hover:text-blue-400 transition" />
          </div>
          <h4 className="font-semibold mt-4 mb-2">НАШИ СОЦ.СЕТИ</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <FaInstagram size={24} className="hover:text-pink-500 transition" />
          </div>
        </div>

        {/* Подписка */}
        <div>
          <h3 className="font-bold text-lg mb-3">ПОДПИСКА НА НОВОСТИ</h3>
          <p className="mb-4 text-gray-400">Будьте в курсе скидок и новостей</p>
          <div className="flex border border-gray-600 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Ваш email"
              className="bg-transparent text-white px-3 py-2 outline-none flex-grow"
            />
            <button className="bg-gray-700 px-4 py-2 hover:bg-gray-600 transition">→</button>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Подписываясь на рассылку, вы соглашаетесь с обработкой персональных данных
          </p>
          <p className="text-gray-500 text-sm mt-2 underline hover:text-white transition">
            Политика конфиденциальности
          </p>
          <p className="text-gray-500 text-sm underline hover:text-white transition">
            Пользовательское соглашение
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCard;