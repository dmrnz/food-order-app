import React from 'react';
import cn from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = () => (
    <button className={cn.button}>
        <span className={cn.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={cn.badge}>1</span>
    </button>
);

export default HeaderCartButton;