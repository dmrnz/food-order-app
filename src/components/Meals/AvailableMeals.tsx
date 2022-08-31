import React, { useEffect, useState } from 'react';

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";
import { FetchedMeals, MealItemType } from '../../types';

const AvailableMeals = () => {
    const [meals, setMeals] = useState<MealItemType[]>([] as MealItemType[]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                process.env.REACT_APP_API_KEY + "/meals.json"
            );
            const fetchedMeals: FetchedMeals = await response.json();

            const convertedMeals: MealItemType[] = Object.entries(fetchedMeals).map(([key, value]) => ({
                id: key,
                ...value
            }));

            setMeals(convertedMeals);
            setIsLoading(false);
        }

        fetchData().catch(error => {
            if (error instanceof Error) {
                setIsLoading(false);
                setErrorMessage(error.message);
            }
        });
    }, []);

    if (isLoading) {
        return (
            <Card className={classes.meals}>
                <h2>Loading...</h2>
            </Card>
        )
    }

    if (errorMessage) {
        return (
            <Card className={classes.meals}>
                <h2 style={{color: "red"}}>{errorMessage}</h2>
            </Card>
        )
    }


    let mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
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