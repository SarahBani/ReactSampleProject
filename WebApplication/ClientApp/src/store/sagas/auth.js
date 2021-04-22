import { put, delay, call, all } from 'redux-saga/effects';

import * as actions from '../actions/authActions';
import axiosInstance from '../../axios-instance';

const authStorageKeyName = 'auth_token';
let tokenExpirationTimer = null;

export function* signOutSaga(action) {
    tokenExpirationTimer = null;
    yield all([
        //localStorage.removeItem(authStorageKeyName),
        call([localStorage, 'removeItem'], authStorageKeyName),
        put(actions.signOutSucceeded())
    ]);
    //yield put({
    //    type: actionTypes.SIGN_OUT
    //});
}

export function* checkAuthTimeoutSaga(action) {
    const duration = yield (new Date(action.tokenExpiration).getTime() - new Date().getTime());
    yield delay(duration);
    yield put(actions.signOut());
}

export function* signInSaga(action) {
    yield put(actions.showLoader());
    const data = {
        email: action.email,
        password: action.password
    };
    try {
        const response = yield axiosInstance.post('auth/login', data);
        if (response.status === 200) {
            //yield localStorage.setItem(authStorageKeyName, JSON.stringify(response.data));
            yield call([localStorage, 'setItem'], authStorageKeyName, JSON.stringify(response.data));
            yield put(actions.signInSucceeded(response.data.token));
            yield put(actions.checkAuthTimeout(response.data.expiration));
        }
        else {
            yield put(actions.signInFailed());
        }
    } catch (error) {
        yield put(actions.raiseError(error));
    }
}

export function* autoSignInSaga(action) {
    //const authToken = yield JSON.parse(localStorage.getItem(authStorageKeyName));
    const authToken = JSON.parse(yield call([localStorage, 'getItem'], authStorageKeyName));
    if (!!authToken) {
        const expirationDateTime = new Date(authToken.expiration);
        if (expirationDateTime > new Date()) {
            yield put(actions.signInSucceeded(authToken.token));
            yield put(actions.checkAuthTimeout(authToken.expiration));
        }
        else {
            yield put(actions.signOut());
        }
    }
}