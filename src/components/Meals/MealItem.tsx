import React from 'react';

import {MealItemType} from "./dummy-meals";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

type MealItemParams = { key: string } & Omit<MealItemType, "id">;

const MealItem = (props: MealItemParams) => {
    const price = `$${props.price.toFixed(2)}`;
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm />
            </div>
        </li>
    );
};

export default MealItem;