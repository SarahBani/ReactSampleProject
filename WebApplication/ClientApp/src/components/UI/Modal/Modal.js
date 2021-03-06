import React, { Fragment, useEffect, useReducer } from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';
import { ModalType } from '../../../shared/constant';

const initModalType = {
    typeClass: null,
    title: null,
    icon: null
};

const modalTypeReducer = (currentModalType, action) => {
    switch (action.type) {
        case ModalType.INFO:
            return {
                ...currentModalType,
                typeClass: classes.Info,
                title: null,
                icon: <span className="fa fa-info" ></span>
            };
        case ModalType.QUESTION:
            return {
                ...currentModalType,
                typeClass: classes.Question,
                title: null,
                icon: <span className="fa fa-question" ></span>
            };
        case ModalType.WARNING:
            return {
                ...currentModalType,
                typeClass: classes.Warning,
                title: 'Warning',
                icon: <span className="fa fa-warning" ></span>
            };
        case ModalType.ERROR:
            return {
                ...currentModalType,
                typeClass: classes.Error,
                title: 'Error',
                icon: <span className="fa fa-warning" ></span>
            };
        case ModalType.COMPONENT:
            return {
                ...currentModalType,
                typeClass: classes.Component,
                title: null,
                icon: null,
            };
        case '':
            return {
                ...currentModalType,
                typeClass: classes.Component, 
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
            <Backdrop show={props.show} clicked={props.hide} type={type}>
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
