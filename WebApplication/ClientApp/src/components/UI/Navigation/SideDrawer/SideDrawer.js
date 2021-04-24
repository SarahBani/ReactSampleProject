import React, { Fragment, useState, useEffect } from 'react';

import classes from './SideDrawer.module.scss';
import Backdrop from '../../Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = props => {

    const { show } = props;
    const [attachedClasses, setAttachedClasses] = useState('');
    useEffect(() => {
        setAttachedClasses(
            [
                classes.SideDrawer,
                classes[props.show ? 'Open' : 'Close']
            ].join(' ')
        );
    }, [show]);

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