import * as actionTypes from './authActionTypes';

export const signIn = (email, password) => {
    return {
        type: actionTypes.SIGN_IN_START,
        email: email,
        password: password
    };
};

export const signInSucceeded = (token) => {
    return {
        type: actionTypes.SIGN_IN_SUCCEEDED,
        token: token
    };
};

export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    };
};

export const checkAuthTimeout = (tokenExpiration) => {
    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        tokenExpiration: tokenExpiration
    };
};

export const stopAuthTimer = () => {
    return {
        type: actionTypes.STOP_AUTH_TIMER
    };
};

export const autoSignIn = () => {
    return {
        type: actionTypes.AUTO_SIGN_IN
    };
};

export const setAuthRedirectPath = (url) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        url: url
    };
};