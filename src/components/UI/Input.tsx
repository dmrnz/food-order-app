import React, {InputHTMLAttributes} from 'react';

import classes from "./Input.module.css";

export type InputProps = {
    label: string
    input: InputHTMLAttributes<HTMLInputElement>
}

const Input = (props: InputProps) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
           <input {...props.input}/> 
        </div>
    );
};

export default Input;