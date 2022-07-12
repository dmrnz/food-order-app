import React from 'react';

import {DUMMY_MEALS} from "./dummy-meals";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
    let mealsList = DUMMY_MEALS.map(meal =>
        <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price}></MealItem>
    );
    
    return (
        <Card className={classes.meals}>
            <ul>
                {mealsList}
            </ul>
        </Card>
    );
};

export default AvailableMeals;