import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import axiosInstance from '../../axios-instance';
import * as actions from '../../store/actions/commonActions';
import { ModalType } from '../../shared/constant';

const withErrorHandler = (WrappedComponent) => {

    return props => {

        const [error, setError] = useState();
        const [errorType, setErrorType] = useState();
        const { customError } = props;
        const [axiosError, axiosErrorConfirmHandler] = useHttpErrorHandler(axiosInstance);

        useEffect(() => {
            if (axiosError) {
                setError({
                    ...axiosError,
                    message: axiosError.message + '!'
                });
                setErrorType(ModalType.ERROR);
            }
            else if (customError) {
                setError(customError);
                setErrorType(ModalType.WARNING);
            }
            else {
                setError();
            }
        }, [axiosError, customError, setError]);

        const hideErrorHandler = () => {
            if (axiosError) {
                axiosErrorConfirmHandler();
            }
            props.onClearCustomError();
        };

        //const [ error, errorConfirmHandler ] = useHttpErrorHandler(axiosInstance);

        return (
            <Fragment>
                <Modal type={errorType} show={error} hide={hideErrorHandler} >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );

    };
};

const mapStateToProps = state => {
    return {
        customError: state.common.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearCustomError: () => dispatch(actions.clearError()),
    };
};

export default (WrappedComponent) => connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WrappedComponent));