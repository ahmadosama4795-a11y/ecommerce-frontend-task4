import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "ecommerce_cart";

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        if (!product || product.stockQuantity <= 0) {
            return {
                success: false,
                message: "Product is out of stock.",
            };
        }

        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                const newQuantity = Math.min(
                    existingItem.quantity + quantity,
                    product.stockQuantity
                );

                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    stockQuantity: product.stockQuantity,
                    quantity: Math.min(quantity, product.stockQuantity),
                },
            ];
        });

        return {
            success: true,
            message: "Product added to cart.",
        };
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) => {
                    if (item.id !== productId) return item;

                    const safeQuantity = Math.max(
                        1,
                        Math.min(quantity, item.stockQuantity)
                    );

                    return {
                        ...item,
                        quantity: safeQuantity,
                    };
                })
        );
    };

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.quantity,
                0
            ),
        [cartItems]
    );

    const cartTotal = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
        [cartItems]
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
