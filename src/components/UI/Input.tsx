import React, {ForwardedRef, InputHTMLAttributes} from 'react';

import classes from "./Input.module.css";

export type InputProps = {
    label: string
    input: InputHTMLAttributes<HTMLInputElement>
}

const Input = React.forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
           <input ref={ref} {...props.input}/> 
        </div>
    );
});

export default Input;