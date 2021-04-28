import { takeEvery, all, takeLatest, cancel, take, fork } from 'redux-saga/effects';

import { autoSignInSaga, checkAuthTimeoutSaga, signInSaga, signOutSaga } from './auth';
import { fetchCountriesSaga, selectCountrySaga, selectCitySaga } from './location';
import { fetchHotelsSaga, fetchHotelSaga, fetchHotelPhotosSaga, fetchHotelsCountSaga } from './hotel';
import * as authActionTypes from '../actions/authActionTypes';
import * as locationActionTypes from '../actions/locationActionTypes';
import * as hotelActionTypes from '../actions/hotelActionTypes';

export function* watchAuth() {
    yield all([
        takeLatest(authActionTypes.AUTO_SIGN_IN, autoSignInSaga),
        takeLatest(authActionTypes.SIGN_IN_START, signInSaga),
        takeLatest(authActionTypes.SIGN_OUT, signOutSaga),
        //takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
    ]);

    //while (true) {
    //    const payload = yield take(authActionTypes.CHECK_AUTH_TIMEOUT);
    //    const bgSyncTask = yield fork(checkAuthTimeoutSaga, payload);
    //    yield takeLatest(authActionTypes.STOP_AUTH_TIMER, cancelWorkerSaga, bgSyncTask);
    //}
    // Or
    let payload;
    while (payload = yield take(authActionTypes.CHECK_AUTH_TIMEOUT)) {
        // starts the task in the background
        const bgSyncTask = yield fork(checkAuthTimeoutSaga, payload);

        //// wait for the user to sign out
        //yield take(authActionTypes.STOP_AUTH_TIMER);
        //// user signed out. cancel the background task
        //// this will cause the forked bgSync task to jump into its finally block
        //yield cancel(bgSyncTask);
        // Or
        yield takeLatest(authActionTypes.STOP_AUTH_TIMER, cancelWorkerSaga, bgSyncTask);
    }
}

function* watchCheckAuthTimeout() {
    yield takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
}

function* cancelWorkerSaga(task) {
    yield cancel(task);
}

export function* watchLocation() {
    yield all([
        takeLatest(locationActionTypes.FETCH_COUNTRIES, fetchCountriesSaga),
        takeLatest(locationActionTypes.SELECT_COUNTRY, selectCountrySaga),
        takeLatest(locationActionTypes.SELECT_CITY, selectCitySaga)
    ]);
}

export function* watchHotel() {
    yield all([
        takeLatest(hotelActionTypes.FETCH_HOTELS, fetchHotelsSaga),
        takeLatest(hotelActionTypes.FETCH_HOTELS_COUNT, fetchHotelsCountSaga),
        takeLatest(hotelActionTypes.FETCH_HOTEL, fetchHotelSaga),
        takeLatest(hotelActionTypes.FETCH_HOTEL_PHOTOS, fetchHotelPhotosSaga)
    ]);
}