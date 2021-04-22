import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import axiosInstance from '../../axios-instance';

const withErrorHandler = (WrappedComponent) => {

    return props => {

        const { error, errorConfirmHandler } = useHttpErrorHandler(axiosInstance);

        return (
            <Fragment>
                <Modal show={error} hide={errorConfirmHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );

    };
};

export default withErrorHandler;