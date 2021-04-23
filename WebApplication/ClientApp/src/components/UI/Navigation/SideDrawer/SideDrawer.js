import React, { Fragment } from 'react';

import classes from './SideDrawer.module.scss';
import Logo from '../../Logo/Logo';
import Backdrop from '../../Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = props => {

    const attachedClasses = [
        classes.SideDrawer,
        classes[props.show ? 'Open' : 'Close']
    ].join(' ');
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.hide} />
            <div className={attachedClasses} onClick={props.hide}>
                <NavigationItems />
            </div>
        </Fragment>
    );
};

export default SideDrawer;