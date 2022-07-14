import React from "react";
import {CartItemType} from "../../types";

// noinspection JSUnusedLocalSymbols
const CartContext = React.createContext({
    isVisible: false,
    showCart: () => {},
    hideCart: () => {},

    items: [] as CartItemType[],
    totalCost: 0,
    addItem: (item: CartItemType) => {},
    removeItem: (id: string) => {},
});

export default CartContext;