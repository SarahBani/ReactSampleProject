import * as actionTypes from '../actions/authActionTypes';

const initialState = {
    loggedIn: false,
    token: null,
    authRedirectPath: '/',
    loading: false,
    error: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER1:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.SIGN_IN_SUCCEEDED:
            return {
                ...state,
                loggedIn: true,
                token: action.token,
                loading: false,
            };
        case actionTypes.SIGN_IN_FAILED:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                loggedIn: false,
                token: null
            };
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.url
            }
        case actionTypes.RAISE_ERROR1:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default authReducer;