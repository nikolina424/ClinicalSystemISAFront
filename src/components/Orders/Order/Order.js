import React from 'react';
import classes from './Order.css';

const order = props => {
    return (
        <div className={classes.Order}>
            Name: {props.order.name} ||
            Title: {props.order.title}
        </div>
    );
};

export default order;