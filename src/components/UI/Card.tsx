import React, {PropsWithChildren} from 'react';

import classes from "./Card.module.css";

const Card = (props: PropsWithChildren<{ className?: string }>) => {
    const className = classes.card + (props.className ? ` ${props.className}` : '');

    return (
        <section className={className}>
            {props.children}
        </section>
    );
};

export default Card;