import React from 'react'
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";

const Footer_card = () => {
  return (
    <footer className="bg-black text-white  mx-auto h-[250px] items-center justify-center flex flex-col">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        {/* Каталог */}
        <div>
          <h3 className="font-bold text-lg mb-3">КАТАЛОГ</h3>
          <ul className="space-y-1">
            <li>Одежда</li>
            <li>Обувь</li>
            <li>Аксессуары</li>
            <li>Расчет стоимости</li>
          </ul>
        </div>

        {/* Информация */}
        <div>
          <h3 className="font-bold text-lg mb-3">ИНФОРМАЦИЯ</h3>
          <ul className="space-y-2">
            <li>Блог</li>
            <li>Контакты</li>
            <li>Доставка</li>
            <li>Оплата</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="font-bold text-lg mb-3">КОНТАКТЫ</h3>
          <p className="mb-2 text-gray-300">info@grafus.info</p>
          <p className="mb-4 text-gray-300">+998 00 000 00 00</p>
          <h4 className="font-semibold mb-2">МЕССЕНДЖЕРЫ</h4>
          <div className="flex gap-3">
            <FaTelegramPlane size={20} />
          </div>
          <h4 className="font-semibold mt-4 mb-2">НАШИ СОЦ.СЕТИ</h4>
          <div className="flex gap-3">
            <FaInstagram size={20} />
          </div>
        </div>

        {/* Подписка */}
        <div>
          <h3 className="font-bold text-lg mb-3">ПОДПИСКА НА НОВОСТИ</h3>
          <p className="mb-4 text-gray-300">Будьте в курсе скидок и новостей</p>
          <div className="flex border border-gray-500 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Ваш email"
              className="bg-transparent text-white px-3 py-2 outline-none flex-grow"
            />
            <button className="bg-gray-700 px-4 py-2">→</button>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Подписываясь на рассылку, вы соглашаетесь с обработкой персональных данных
          </p>
          <p className="text-gray-500 text-sm mt-2 underline">Политика конфиденциальности</p>
          <p className="text-gray-500 text-sm underline">Пользовательское соглашение</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer_card;