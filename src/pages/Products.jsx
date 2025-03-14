import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../Utilits/apiservice';
import { Swiper, SwiperSlide } from 'swiper/react';
import sale from '../images/sale.png';
import sale2 from '../images/sale2.png'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { product_url } from '../Utilits/urls';
import { CartContext } from '../Context/CartList';
import { categories_url } from '../Utilits/urls';


const Products = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(0)
  const [skip, setSkip] = useState(1)

  const { pushCart } = useContext(CartContext)

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
    <div className='container mx-auto flex flex-col gap-8'>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        className="mySwiper h-[80vh] mt-10"
      >
        <SwiperSlide className="flex justify-center items-end h-[600px]">
          <img src="https://i.ytimg.com/vi/8xGcxpYSzko/maxresdefault.jpg" alt="logo" className="h-[400px] w-auto object-contain rounded-[30px]" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-end h-[600px]">
          <img src='https://avatars.mds.yandex.net/i?id=1c608e3dfb529fb70ed74ad1574fd1b84f2f0355-8497209-images-thumbs&n=13' alt="logo" className="h-[400px] w-auto object-cover rounded-[30px]" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-end h-[600px]">
          <img src='https://nyakaza.org.za/wp-content/uploads/sites/19/2024/06/Sales-20240618-175256.jpg' alt="logo" className="h-[400px] w-auto object-contain rounded-[30px]" />
        </SwiperSlide>
      </Swiper>
      <p className='font-bold text-center text-[30px] mt-5'>Список продуктов</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Категории */}
        

        {/* Продукты */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-span-4 gap-4">
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
      <div className='h-[100vh] flex justify-center items-center'>
        <div className='relative flex justify-center items-center h-[300px] md:h-[400px] w-full bg-blue-500 rounded-2xl p-5 overflow-hidden'>
          <img className='relative z-10 flex flex-col md:flex-row bg-red-500 rounded-2xl p-5 md:p-10 shadow-lg w-[90%] md:w-[80%]' src={sale} alt="sale" />
        </div>
      </div>

    </div>
  );
};

export default Products;