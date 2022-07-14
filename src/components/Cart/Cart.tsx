import React, {useContext} from 'react';

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import {CartItemType} from "../../types";

const Cart = () => {
    const cartContext = useContext(CartContext);
    const {totalCost, items} = cartContext;

    const cartItemAddHandler = (item: CartItemType) => {
        cartContext.addItem({...item, amount: 1});
    };
    const cartItemRemoveHandler = (id: string) => {
        cartContext.removeItem(id);
    };

    const cartItems = <ul className={classes.cartItems}>
        {items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}/>
        )}
    </ul>;

    const formattedTotalCost = `$${totalCost.toFixed(2)}`;
    const hasItems = items.length > 0;

    return (
        <Modal onClose={cartContext.hideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{formattedTotalCost}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={cartContext.hideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;