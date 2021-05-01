import React, { Fragment, useEffect, useReducer } from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const initModalType = {
    typeClass: null,
    title: null,
    icon: null
};

const modalTypeReducer = (currentModalType = initModalType, action) => {
    switch (action.type) {
        case 'INFO':
            return {
                ...currentModalType,
                typeClass: classes.Info,
                title: null,
                icon: <span className="fa fa-info" ></span>
            };
        case 'QUESTION':
            return {
                ...currentModalType,
                typeClass: classes.Question,
                title: null,
                icon: <span className="fa fa-question" ></span>
            };
        case 'WARNING':
            return {
                ...currentModalType,
                typeClass: classes.Warning,
                title: 'Warning',
                icon: <span className="fa fa-warning" ></span>
            };
        case 'ERROR':
            return {
                ...currentModalType,
                typeClass: classes.Error,
                title: 'Error',
                icon: <span className="fa fa-warning" ></span>
            };
        case 'CONFIRM':
            return {
                ...currentModalType,
                typeClass: classes.Confirm,
                title: null,
                icon: null,
            };
        default:
            return {
                ...currentModalType
            };
    }
};

const Modal = props => {

    const { type } = props;
    const [modalType, dispatch] = useReducer(modalTypeReducer, initModalType);

    useEffect(() => {
        dispatch({ type: type?.toUpperCase() });
    }, [type]);

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.hide}>
            </Backdrop>
            <div className={[classes.Modal, modalType.typeClass].join(' ')}
                style=
                {{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {modalType.icon}
                {props.children}
            </div>
        </Fragment>
    );
};

export default React.memo(Modal, (prevProps, nextProps) =>
    (prevProps.show === nextProps.show &&
        prevProps.children === nextProps.children)
);
