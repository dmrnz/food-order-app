import React, {FormEvent, useRef, useState} from 'react';

import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props: {onAddToCart: (amount: number) => void}) => {
    const [isValid, setIsValid] = useState(true);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        const amountString = amountInputRef.current!.value;
        const amountNumber = Number(amountString);

        if (amountString.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
            setIsValid(false);
            return;
        }

        props.onAddToCart(amountNumber);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label={"Amount"} input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!isValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemForm;