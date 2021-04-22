import { put } from 'redux-saga/effects';

import axiosInstance from '../../axios-instance';
import * as actions from '../actions/hotelActions';
import * as commonActions from '../actions/commonActions';

export function* fetchHotelsSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //'auth_token': action.token
    };
    try {
        const filters = [];
        if (action.cityId) {
            filters.push(`cityId=${action.cityId}`);
        }
        if (action.countryId) {
            filters.push(`countryId=${action.countryId}`);
        }
        const queryString = (filters.length > 0 ? '?' + filters.join('&') : '');
        const response = yield axiosInstance.get('/Hotel/GetList' + queryString, headers);
        yield put(actions.setHotels(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchHotelPhotosSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //'auth_token': action.token
    };
    try {
        const response = yield axiosInstance.get('/Hotel/GetPhotoList/' + action.hotelId, headers);
        yield put(actions.setHotelPhotos(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

//export function* selectHotelSaga(action) {
//    yield put(commonActions.showLoader());
//    yield put(commonActions.hideLoader());
   
//}
