import React, {useContext} from 'react';

import classes from "./Cart.module.css";
import {DUMMY_MEALS} from "../Meals/dummy-meals";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";

const Cart = () => {
    const cartContext = useContext(CartContext);

    const cartItems = <ul className={classes.cartItems}>
        {[DUMMY_MEALS[0]].map(item =>
            <li key={item.id}>{item.name}</li>
        )}
    </ul>;

    return (
        <Modal onClose={cartContext.hideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span><span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={cartContext.hideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;