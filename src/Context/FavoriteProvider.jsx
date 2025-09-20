import React, { createContext, useEffect, useState } from 'react';

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [Favorite, setFavorite] = useState(() => {
        const saved = localStorage.getItem("favorite");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorite", JSON.stringify(Favorite));
    }, [Favorite]);


    const addFavorite = (product, qty = 1) => {
        setFavorite((prev) => {
            const existing = prev.find((item) => item._id === product._id);

            const price = Number(product.price) || 0;
            const discount = Number(product.discount) || 0;
            const finalPrice = +(price - (price * discount) / 100).toFixed(2);

            if (existing) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }

            return [
                ...prev,
                {
                    _id: product._id,
                    product_name: product.product_name,
                    product_img: Array.isArray(product.product_img)
                        ? product.product_img[0]
                        : product.product_img,
                    price,
                    discount,
                    finalPrice,
                    quantity: qty,
                },
            ];
        });
    };
    const favoriteItems = Favorite.reduce((sum, item) => sum + item.quantity, 0);
    return <FavoriteContext.Provider
        value={{ Favorite, addFavorite, favoriteItems }}
    >
        {children}
    </FavoriteContext.Provider>
};

export default FavoriteProvider;