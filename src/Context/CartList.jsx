import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartList = ({ children }) => {
    const [cart, SetCart] = useState([]);

   
    const pushCart = (obj) => {
        SetCart((prev) => {
            const existingProduct = prev.find((product) => product.id === obj.id);
            if (existingProduct) {
                alert("Этот товар уже в корзине!");
                // toast.warning("Этот товар уже в корзине!")
                return prev;
            }
            return [...prev, { ...obj, count: 1 }];
        });
    };


    const incr = (id) => {
        let updatedCart = cart.map((product) => {
            if (product.id === id) {
                if (product.count < product.stock) {
                    return { ...product, count: product.count + 1 };
                } else {
                    // alert("Mahsulot tugadi");
                    toast.warning("Товара нет в наличии")
                    return product; 
                }
            }
            return product;
        });

        SetCart(updatedCart); 
    };

    const decr = (id) => {
        SetCart((prev) =>
            prev
                .map((product) =>
                    product.id === id && product.count > 1
                        ? { ...product, count: product.count - 1 }
                        : product
                )
                .filter((product) => product.count > 0) // Удаляем товар с count === 0
        );
    };

    const removeFromCart = (id) => {
        SetCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, SetCart, pushCart, incr, decr, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartList;
