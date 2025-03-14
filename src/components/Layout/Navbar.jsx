import { useContext, useState } from "react";
import { Search, ShoppingCart, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartList";

export default function Navbar() {
    const { cart } = useContext(CartContext);

    const [language, setLanguage] = useState("Русский");

    return (
        <nav className="bg-black text-white h-[80px] flex items-center justify-between px-5 md:px-10 shadow-md sticky top-0 z-50">
            <div className="container flex items-center justify-between mx-auto w-full max-w-7xl">
                {/* Навигация */}
                <ul className="flex items-center gap-5 md:gap-7 text-sm md:text-base">
                    <Link to="/" className="hover:text-gray-300 transition">Главная</Link>
                    <Link to="/category-list" className="hover:text-gray-300 transition">Категории</Link>
                    <Link to="/profile" className="hover:text-gray-300 transition">Личный кабинет</Link>
                </ul>
                
                {/* Иконки и кнопки */}
                <div className="flex items-center gap-3 md:gap-5">
                    <Star className="text-gray-400 hover:text-white transition cursor-pointer" />
                    <User className="text-gray-400 hover:text-white transition cursor-pointer" />
                    
                    {/* Корзина */}
                    <Link to="/carts" className="relative flex items-center">
                        <ShoppingCart className="text-gray-400 hover:text-white transition cursor-pointer" />
                        {cart?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    
                    {/* Переключение языка */}
                    <div className="relative">
                        <button 
                            onClick={() => setLanguage(language === "Русский" ? "O‘zbekcha" : "Русский")}
                            className="text-sm md:text-base bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition"
                        >
                            {language}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}