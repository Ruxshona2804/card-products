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
      <div className=' gap-5'>
        <div className='grid grid-cols-3  gap-3'>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <div className='border border-gray-300 rounded-md shadow-lg overflow-hidden h-full' key={item.id}>
                <img className='w-full object-contain h-[200px]' src={item.thumbnail} alt={item.title} />
                <Link to={`/product-detail/${item?.id}`}>
                  <p className='hover:shadow'>Название продукта: {item.title}</p>
                </Link>
                <p className='p-3'>Стоимость: {item.price} $</p>
                <button className='  rounded-md font-bold bg-orange-400 px-2 py-1'>Купить</button>
              </div>
            ))
          ) : (
            <p>Загрузка продуктов...</p>
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