import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const navigationItem = props => {

    function clickHandler(event) {
        event.preventDefault();
        props.clicked();
    };

    const link =
        (props.clicked ?
            <a href='#' onClick={clickHandler}>
                {props.children}
            </a>
            :
            <NavLink to={props.link} /*exact={props.link == '/' ? true : false}*/
                exact={props.exact}
                activeClassName={classes.active}>
                {props.children}
            </NavLink>);
    return (
        <li className={classes.NavigationItem}>
            {link}
        </li>
    );
};

export default navigationItem;