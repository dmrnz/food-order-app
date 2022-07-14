import React, {useContext} from 'react';

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {MealItemType} from "../../types";
import CartContext from "../store/cart-context";

const MealItem = (props: MealItemType) => {
    const cartContext = useContext(CartContext);
    const {id, name, price, description} = props;

    const onAddToCartHandler = (amount: number) => {
        cartContext.addItem({id, price, amount, name});
    };

    const formattedPrice = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{formattedPrice}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={onAddToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;