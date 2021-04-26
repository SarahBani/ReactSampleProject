import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { autoSignInSaga, checkAuthTimeoutSaga, signInSaga, signOutSaga } from './auth';
import { fetchCountriesSaga, selectCountrySaga, selectCitySaga } from './location';
import { fetchHotelsSaga, fetchHotelSaga, fetchHotelPhotosSaga, fetchHotelsCountSaga } from './hotel';
import * as authActionTypes from '../actions/authActionTypes';
import * as locationActionTypes from '../actions/locationActionTypes';
import * as hotelActionTypes from '../actions/hotelActionTypes';

export function* watchAuth() {
    yield all([
        takeLatest(authActionTypes.AUTO_SIGN_IN, autoSignInSaga),
        takeLatest(authActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeLatest(authActionTypes.SIGN_IN_START, signInSaga),
        takeLatest(authActionTypes.SIGN_OUT_START, signOutSaga)
    ]);
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