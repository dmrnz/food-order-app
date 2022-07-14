import React, {PropsWithChildren, useReducer, useState} from 'react';
import CartContext from './cart-context';
import {CartItemType} from "../../types";

const defaultCartState = {
    items: [] as CartItemType[],
    totalCost: 0
};

const cartReducer = (state: typeof defaultCartState, action: { type: "ADD" | "REMOVE", value: unknown }) => {
    const actionType = action.type;
    if (actionType === "ADD") {
        const newItem = action.value as CartItemType;
        const existingItems = state.items;

        const existingCartItemIndex = existingItems.findIndex(existingItem => existingItem.id === newItem.id);
        const existingCartItem = existingItems[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + newItem.amount
            };
            updatedItems = [...existingItems];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = existingItems.concat(newItem);
        }

        const updatedTotalCost = state.totalCost + newItem.amount * newItem.price;

        return {
            items: updatedItems,
            totalCost: updatedTotalCost
        };
    }

    if (actionType === "REMOVE") {
        const id = action.value as string;
        const existingItems = state.items;
        
        const existingCartItemIndex = existingItems.findIndex(existingItem => existingItem.id === id);
        const existingCartItem = existingItems[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem.amount > 1) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            }
            updatedItems = [...existingItems];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = [...existingItems].filter(item => item.id !== id);
        }

        const updatedTotalCost = state.totalCost - existingCartItem.price;

        return {
            items: updatedItems,
            totalCost: updatedTotalCost
        };
    }

    return defaultCartState;
}

const CartContextProvider = (props: PropsWithChildren) => {
    const [isVisible, setIsVisible] = useState(false);
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const showCartHandler = () => {
        setIsVisible(true);
    };

    const hideCartHandler = () => {
        setIsVisible(false);
    };

    const addItemHandler = (item: CartItemType) => {
        dispatchCartAction({type: "ADD", value: item});
    };

    const removeItemHandler = (id: string) => {
        dispatchCartAction({type: "REMOVE", value: id})
    };

    const cartContext = {
        isVisible: isVisible,
        showCart: showCartHandler,
        hideCart: hideCartHandler,

        items: cartState.items,
        totalCost: cartState.totalCost,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider;