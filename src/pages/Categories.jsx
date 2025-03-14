import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../Utilits/apiservice';
import sale from '../images/sale.png';
import sale2 from '../images/sale2.png'
import { Search } from 'lucide-react';
import { product_url, searchHandle_url } from '../Utilits/urls';
import { categories_url } from '../Utilits/urls';
import { CartContext } from '../Context/CartList';

const Categories = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [page, setPage] = useState(0)
    const [skip, setSkip] = useState(1)

    const {pushCart} = useContext(CartContext)

    const getCategories = async () => {
        let res = await apiClient({
            url: categories_url,
            method: "GET"
        });

        console.log("Категории с API:", res?.data);
        if (res?.is_succes) {
            setCategories(res?.data);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const getProducts = async () => {
        let res = await apiClient({
            url: category == null ? product_url + `?limit=20&skip=${(skip - 1) * 20}&` : product_url + `/category/${category}?limit=20&skip=${(skip - 1) * 20}&`
        });
        if (res?.is_succes) {
            setData(res?.data?.products);
            createPagination(res?.data?.total)

        }
    };

    useEffect(() => {
        getProducts();
    }, [category, skip]);

    const searchHandle = async (search) => {
        if (search.length > 3) {
            let res = await apiClient({
                url: searchHandle_url + `${search}`,
                method: "GET"
            })
            if (res?.is_succes) {
                setData(res?.data?.products);
                createPagination(res?.data?.total)

            }
        }
    }
    const createPagination = (total) => {
        let current_page = []
        for (let i = 1; i <= Math.ceil(total / 20); i++) {
            current_page.push(i)
        }
        setPage(current_page)
    }


    return (
        <div className="container mx-auto flex flex-col gap-8 px-4">
            <p className="font-bold text-center text-2xl md:text-3xl mt-5">Список продуктов</p>

            {/* Поле поиска */}
            <div className="relative w-full max-w-md mx-auto">
                <input
                    onChange={(val) => searchHandle(val?.target?.value)}
                    type="text"
                    placeholder="Поиск..."
                    className="pl-10 pr-4 py-2 border border-orange-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {/* Категории */}
                <div className="p-4  rounded-lg shadow-md">
                    <ul className="space-y-4">
                        <li className="uppercase font-bold text-lg">Категории</li>
                        <li
                            onClick={() => {
                                setCategory(null);
                                setSkip(1);
                            }}
                            className={` border rounded-lg cursor-pointer p-3 text-center transition ${category === null ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                                }`}
                        >
                            Все продукты
                        </li>
                        {categories?.map((res) => (
                            <li
                                key={res.slug}
                                className={`border rounded-lg cursor-pointer p-3 text-center transition ${category === res.slug ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                                    }`}
                                onClick={() => {
                                    setCategory(res.slug);
                                    setSkip(1);
                                }}
                            >
                                {res.name}
                            </li>
                        ))}
                        <div className="flex flex-col gap-4">
                            <img className="rounded-lg shadow-md" src={sale2} alt="sale" />
                            <img className="rounded-lg shadow-md" src={sale2} alt="sale" />
                        </div>
                    </ul>
                </div>

                {/* Продукты */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-span-3 gap-4">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((item) => (
                            <div
                                key={item.id}
                                className=" rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl"
                            >
                                <img
                                    className="w-full object-contain h-48"
                                    src={item.thumbnail}
                                    alt={item.title}
                                />
                                <div className="p-4">
                                    <Link to={`/product-detail/${item?.id}`} className="block font-semibold hover:underline">
                                        {item.title}
                                    </Link>
                                    <p className="mt-2 text-lg font-bold text-gray-700">${item.price}</p>
                                    <button
                                        onClick={() => {
                                            pushCart(item)

                                        }}
                                        className="w-full mt-3 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                                        Купить
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">Загрузка продуктов...</p>
                    )}
                </div>

                {/* Пагинация */}
                <div className="col-span-full flex justify-center space-x-2 mt-6">
                    {Array.isArray(page) && page.length > 0 ? (
                        page.map((item) => (
                            <button
                                key={item}
                                className={`border-2 w-[23px]  px-4 py-2 rounded-md transition  ${skip === item
                                    ? "bg-orange-500 text-white border-orange-500 "
                                    : "border-gray-300 hover:bg-gray-100 "
                                    }`}
                                onClick={() => setSkip(item)}
                            >
                                {item}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500">Нет страниц</p>
                    )}
                </div>
            </div>

            {/* Баннер */}
            <div className="h-[50vh] flex justify-center items-center">
                <div className="relative flex justify-center items-center h-[250px] md:h-[350px] w-full bg-blue-500 rounded-2xl p-5 overflow-hidden">
                    <img
                        className="relative z-10 flex flex-col md:flex-row bg-red-500 rounded-2xl p-5 md:p-10 shadow-lg w-[90%] md:w-[80%]"
                        src={sale}
                        alt="sale"
                    />
                </div>
            </div>
        </div>
    );
}

export default Categories