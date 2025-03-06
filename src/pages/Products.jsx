import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../Utilits/apiservice';
import { Swiper, SwiperSlide } from 'swiper/react';
import sale from '../images/sale.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { product_url } from '../Utilits/urls';

const Products = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState(null)
  const getProducts = async () => {
    let res = await apiClient({
      url: category == null ? product_url : product_url + `/category/${category}`
    });
    if (res?.is_succes) {
      setData(res?.data?.products);
    }
  };
  useEffect(() => {
    getProducts();
  }, [category]);

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
      {/* Продукты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-span-3 gap-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className=" rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl h-full"
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
                <button className="w-full  py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                  Купить
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Загрузка продуктов...</p>
        )}
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