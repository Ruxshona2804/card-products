import { useState } from "react";
import { Search, ShoppingCart, User, Star } from "lucide-react";
import { Link } from "react-router-dom";



export default function Navbar() {
    const [language, setLanguage] = useState("Русский");

    return (
        <nav className="bg-black  text-white h-[80px] flex items-center justify-between mb-10 ">
            <div className="container flex items-center justify-between">
                <ul className="flex items-center gap-7  text-[12px]  ">
                  <Link to={"/"}> <li>Главная</li></Link>
                  <Link to={"/category-list"}> <li>Категории</li></Link>
                </ul>
                <div className="flex items-center gap-3 space-x-4">
                   
                  
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
