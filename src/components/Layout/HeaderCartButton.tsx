import React, {useContext} from 'react';
import cn from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";

const HeaderCartButton = () => {
    const cartContext = useContext(CartContext);

    const cartItemsAmount = cartContext.items.reduce(
        (prev, curr) => prev + curr.amount,
        0
    );

    return <button type={"button"} className={cn.button} onClick={cartContext.showCart}>
        <span className={cn.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={cn.badge}>{cartItemsAmount}</span>
    </button>
};

export default HeaderCartButton;