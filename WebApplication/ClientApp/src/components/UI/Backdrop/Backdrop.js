import React from 'react';

import classes from './Backdrop.module.scss';
import { ModalType } from '../../../shared/constant';

const Backdrop = props => (
    props.show ?
        <div onClick={props.clicked}
            className={[classes.Backdrop, props.type === ModalType.COMPONENT ? '' : classes.Popup].join(' ')}>
            {props.children}
        </div>
        : null);

export default Backdrop;