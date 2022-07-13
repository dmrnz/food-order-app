import React, {PropsWithChildren, useState} from 'react';
import CartContext from './cart-context';
import {CartItem} from "../../types";

const CartContextProvider = (props: PropsWithChildren) => {
    const [isVisible, setIsVisible] = useState(false);

    const showCartHandler = () => {
        setIsVisible(true);
    };

    const hideCartHandler = () => {
        setIsVisible(false);
    };

    const addItemHandler = (item: CartItem) => {};

    const removeItemHandler = (id: string) => {};

    const cartContext = {
        isVisible: isVisible,
        showCart: showCartHandler,
        hideCart: hideCartHandler,

        items: [],
        totalAmount: 0,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider;