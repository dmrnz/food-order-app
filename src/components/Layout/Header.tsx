import React from 'react';
import cn from './Header.module.css';

import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = () => (
    <>
        <header className={cn.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton/>
        </header>
        <div className={cn['main-image']}>
            <img src={mealsImage} alt="A table full of delicious food"/>
        </div>
    </>
);

export default Header;