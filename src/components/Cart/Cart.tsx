import React, { useContext } from 'react';

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import { CartItemType } from "../../types";
import { useState } from 'react';
import Checkout from './Checkout';

export type UserDataType = {
    name: string
    street: string
    postal: string
    city: string
}

const Cart = () => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartContext = useContext(CartContext);
    const { totalCost, items } = cartContext;

    const cartItemAddHandler = (item: CartItemType) => {
        cartContext.addItem({ ...item, amount: 1 });
    };
    const cartItemRemoveHandler = (id: string) => {
        cartContext.removeItem(id);
    };

    const submitOrderHandler = async (userData: UserDataType) => {
        setIsSubmitting(true);
        await fetch(process.env.REACT_APP_API_KEY + "/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: items
            })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartContext.clearCart();
    };

    const cartItems = <ul className={classes.cartItems}>
        {items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} />
        )}
    </ul>;

    const formattedTotalCost = `$${totalCost.toFixed(2)}`;
    const hasItems = items.length > 0;

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={cartContext.hideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={() => { setIsCheckout(true) }}>Order</button>}
    </div>

    const modalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{formattedTotalCost}</span>
        </div>
        {isCheckout ? <Checkout onSubmit={submitOrderHandler} onCancel={cartContext.hideCart} /> : modalActions}
    </>

    return (
        <Modal onClose={cartContext.hideCart}>
            {didSubmit ? <>
                <p>Successfully sent the order!</p>
                <div className={classes.actions}>
                    <button className={classes.button} onClick={cartContext.hideCart}>Close</button>
                </div>
            </>
                : isSubmitting ? <p>Sending order data...</p>
                    : modalContent}
        </Modal>
    );
};

export default Cart;