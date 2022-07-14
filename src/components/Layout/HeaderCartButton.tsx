import React, {useContext, useEffect, useState} from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";

const HeaderCartButton = () => {
    const [isBumped, setIsBumped] = useState(false);

    const cartContext = useContext(CartContext);
    const {items} = cartContext;

    const cartItemsAmount = items.reduce(
        (prev, curr) => prev + curr.amount,
        0
    );


    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        setIsBumped(true);

        const timer = setTimeout(() => {
            setIsBumped(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    const amountClasses = `${classes.badge}${isBumped ? ` ${classes.bump}` : ''}`;

    return <button type={"button"} className={classes.button} onClick={cartContext.showCart}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={amountClasses}>{cartItemsAmount}</span>
    </button>
};

export default HeaderCartButton;