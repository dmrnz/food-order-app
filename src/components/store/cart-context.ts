import React from "react";
import {CartItem} from "../../types";

// noinspection JSUnusedLocalSymbols
const CartContext = React.createContext({
    isVisible: false,
    showCart: () => {},
    hideCart: () => {},

    items: [] as CartItem[],
    totalAmount: 0,
    addItem: (item: CartItem) => {},
    removeItem: (id: string) => {},
});

export default CartContext;