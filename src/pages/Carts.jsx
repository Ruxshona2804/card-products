import React, { useContext } from "react";
import { CartContext } from "../Context/CartList";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Carts = () => {
  const { cart, setCart, removeFromCart, incr, decr } = useContext(CartContext);

  if (cart.length === 0) {
    return <p className="container font-bold text-center mt-10">🛒 Корзина пустая</p>;
  }
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">КОРЗИНА ТОВАРОВ</h2>
        {cart.map((product) => (
          <div key={product.id} className="p-4 rounded-lg flex gap-4 bg-gray-50 shadow-md">
            
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-lg"
            />

            
            <div className="flex-1">
              <Link to={`/product-detail/${product?.id}`}><h3 className="block font-semibold hover:underline">{product.title}</h3></Link>

             
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded active:bg-gray-300"
                  onClick={() => decr(product.id)}
                >
                  -
                </button>
                <span className="text-lg font-medium">{product.count || 1}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded active:bg-gray-300"
                  onClick={() => incr(product.id)} 
                >
                  +
                </button>
              </div>
             
              <div className="mt-2">
                <p className="text-lg font-bold text-black">
                  {product.price.toLocaleString()} $
                </p>
              </div>
            </div>

            
            <div className="flex flex-col items-center space-y-2">
              <button onClick={() => removeFromCart(product.id)} className="text-red-500">
                <Trash />
              </button>
            </div>
          </div>
        ))}

        <div className="text-right text-lg font-bold">
          Итого: $
          {cart.reduce((total, product) => total + product.price * (product.count || 1), 0).toLocaleString()}
        </div>
      </div>

     
      <div className="border p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Оформление заказа</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Имя" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Фамилия" className="w-full p-2 border rounded" />
          <input type="tel" placeholder="Телефон" className="w-full p-2 border rounded" />
          <h3 className="font-semibold">Доставка</h3>
          <input type="text" placeholder="Населённый пункт" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Улица" className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <input type="text" placeholder="Дом" className="w-1/2 p-2 border rounded" />
            <input type="text" placeholder="Квартира/Офис" className="w-1/2 p-2 border rounded" />
          </div>
          <textarea placeholder="Комментарий для курьера" className="w-full p-2 border rounded"></textarea>
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Оформить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Carts;
