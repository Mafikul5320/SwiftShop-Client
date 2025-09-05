import { BaggageClaim, Trash2 } from 'lucide-react';
import React, {  useContext } from 'react';
import { CartContext } from '../Context/CartProvider ';
import { FaCcAmazonPay } from 'react-icons/fa';

const ShopCart = () => {
    // const getProduct = localStorage.getItem("cart")
    // const Product = JSON.parse(getProduct)
    const { removeFromCart, cart, subtotal } = useContext(CartContext)
    // const total = Product.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
    // console.log(Product)
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className=" bg-base-200 text-base-content w-80 ">
                <h1 className="flex items-center gap-2 text-xl font-bold justify-center bg-[#08aec3] py-2 text-white"><BaggageClaim />Cart</h1>
                <div className="min-h-[calc(100vh-112px)]">
                    <div>
                        {cart?.map(oneProduct => (
                            <div key={oneProduct._id} className="p-3 pt-4">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-semibold leading-snug text-gray-800">
                                        {oneProduct?.product_name}
                                    </p>
                                    <button onClick={() => removeFromCart(oneProduct._id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="text-right text-gray-700 text-sm font-medium mt-2">
                                    {oneProduct?.price} × {oneProduct?.quantity} = <span className="font-semibold">{oneProduct?.price * oneProduct?.quantity} Tk</span>
                                </div>
                                <hr className="mt-2" />
                            </div>))}
                    </div>
                </div>
                <div className="text-xl flex items-center justify-between px-3">
                    <h1>Total</h1>
                    <span>{subtotal}</span>
                </div>
                <div className="justify-center flex">
                    <button className="btn  bg-[#08aec3] w-full text-white text-xl">Checkout <FaCcAmazonPay /></button>
                </div>
            </div>
        </div>
    );
};

export default ShopCart;