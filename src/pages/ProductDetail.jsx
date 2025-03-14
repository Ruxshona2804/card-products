import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../Utilits/apiservice";
import { Star } from "lucide-react";
import sale1 from "../images/sale1.png";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductDetail = async () => {
    try {
      let res = await apiClient({ url: `products/${id}` });
      if (res?.is_succes) setProduct(res?.data);
    } catch (error) {
      console.error("Ошибка загрузки продукта:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  return (
    <div className="mx-auto py-16 flex flex-col gap-10 justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      {loading ? (
        <p className="text-xl text-gray-700 dark:text-gray-300">Загрузка...</p>
      ) : product ? (
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 transition-all">
          <div className="flex flex-col gap-6 md:flex-row">

            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full md:w-1/2 h-80 object-contain bg-gray-200 rounded-lg shadow-md"
            />

            <div className="md:w-1/2 md:pl-6 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                {product.description}
              </p>


              <div className="mt-6">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
              </div>


              <div className="mt-6 flex items-center space-x-2">
                <Star className="text-yellow-500 cursor-pointer transition-transform transform hover:scale-125" />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl text-gray-700 dark:text-gray-300">Продукт не найден</p>
      )}

      <div className="mt-10">
        <img src={sale1} alt="sale" className="w-full max-w-xl rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default ProductDetail;