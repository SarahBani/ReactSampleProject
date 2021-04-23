﻿import React, { Fragment, useEffect } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.scss';

const modal = props => {
    return (<Fragment>
        <Backdrop show={props.show} clicked={props.hide}>
        </Backdrop>
        <div className={classes.Modal}
            style=
            {{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Fragment>);
};

export default React.memo(modal, (prevProps, nextProps) =>
    (prevProps.show === nextProps.show &&
     prevProps.children === nextProps.children)
);
