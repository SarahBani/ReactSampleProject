import authReducer from './authReducer';
import * as actionTypes from '../actions/authActionTypes';

describe('authReducer', () => {

    it('should return initialState if action type not exists', () => {
        expect(authReducer(undefined, {})).toEqual(
            {
                loggedIn: false,
                token: null,
                authRedirectPath: '/',
                loading: false,
                error: false
            });
    });

    it('should store token upon login', () => {
        expect(authReducer(
            {
                loggedIn: false,
                token: null,
                authRedirectPath: '/',
                loading: false,
                error: false
            },
            {
                type: actionTypes.SIGN_IN_SUCCEED,
                token: 'some-token'
            })).toEqual(
                {
                    loggedIn: true,
                    token: 'some-token',
                    authRedirectPath: '/',
                    loading: false,
                    error: false
                }
            );
    });

});