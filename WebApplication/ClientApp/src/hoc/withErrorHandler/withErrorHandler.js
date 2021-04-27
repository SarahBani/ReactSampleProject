import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import axiosInstance from '../../axios-instance';
import * as actions from '../../store/actions/commonActions';

const withErrorHandler = (WrappedComponent) => {

    return props => {

        const [error, setError] = useState();
        const { customError } = props;
        const [axiosError, axiosErrorConfirmHandler] = useHttpErrorHandler(axiosInstance);

        useEffect(() => {
            if (axiosError) {
                setError(axiosError);
            }
            else if (customError) {
                setError(customError);
            }
            else {
                setError();
            }
        }, [axiosError, customError, setError]);

        const hideErrorHandler = () => {
            if (axiosError) {
                axiosErrorConfirmHandler();
            }
            else if (customError) {
                props.onClearCustomError();
            }
        };

        //const [ error, errorConfirmHandler ] = useHttpErrorHandler(axiosInstance);

        return (
            <Fragment>
                <Modal show={error} hide={hideErrorHandler}>
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