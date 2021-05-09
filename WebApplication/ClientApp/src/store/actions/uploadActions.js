﻿import * as actionTypes from './uploadActionTypes';

export const reset = () => {
    return {
        type: actionTypes.RESET
    };
};

export const startUpload = () => {
    return {
        type: actionTypes.START_UPLOAD
    };
};

export const showProgress = (progress) => {
    return {
        type: actionTypes.SHOW_PROGRESS,
        progress: progress
    };
};
