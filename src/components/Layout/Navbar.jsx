import { useState } from "react";
import { Search, ShoppingCart, User, Star } from "lucide-react";



export default function Navbar() {
    const [language, setLanguage] = useState("Русский");

    return (
        <nav className="bg-black  text-white h-[80px] flex items-center justify-between mb-10 ">
            <div className="container flex items-center justify-between">
                <ul className="flex items-center gap-7  text-[12px]  ">
                    <li>Сувениры</li>
                    <li>Красота и Здоровье</li>
                    <li>Электроника</li>
                    <li>Бренды</li>
                    <li>Обувь</li>
                    <li>Хоз.товары</li>
                    <li>Авто Товары</li>
                </ul>
                <div className="flex items-center gap-3 space-x-4">
                    <input
                        type="text"
                        placeholder="Поиск товаров"
                        className="bg-gray-800 text-white p-1 px-2 rounded"
                    />
                    <Search className="text-gray-400" />
                    <Star className="text-gray-400" />
                    <User className="text-gray-400" />
                    <ShoppingCart className="text-gray-400" />
                    <div className="relative">
                        <button onClick={() => setLanguage(language === "Русский" ? "O‘zbekcha" : "Русский")}>
                            {language}
                        </button>
                    </div>
                </div>
              
            </div>
        </nav>
    );
}
