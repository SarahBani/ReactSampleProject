import * as actionTypes from './commonActionTypes';

export const showLoader = () => {
    return {
        type: actionTypes.SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: actionTypes.HIDE_LOADER
    };
};

export const raiseError = (error) => {
    return {
        type: actionTypes.RAISE_ERROR,
        error: error
    };
};

export const clearError = (error) => {
    return {
        type: actionTypes.CLEAR_ERROR
    };
};