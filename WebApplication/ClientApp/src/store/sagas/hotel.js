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
            yield filters.push(`cityId=${action.cityId}`);
        }
        if (action.countryId) {
            yield filters.push(`countryId=${action.countryId}`);
        }
        if (action.pageNo) {
            yield filters.push(`pageNo=${action.pageNo}`);
        }
        if (action.pageCount) {
            yield filters.push(`pageCount=${action.pageCount}`);
        }
        const queryString = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response = yield axiosInstance.get('/Hotel/GetList' + queryString, headers);
        yield put(actions.setHotels(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchHotelsCountSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //'auth_token': action.token
    };
    try {
        const filters = [];
        if (action.cityId) {
            yield filters.push(`cityId=${action.cityId}`);
        }
        if (action.countryId) {
            yield filters.push(`countryId=${action.countryId}`);
        }
        const queryString = yield (filters.length > 0 ? '?' + filters.join('&') : '');
        const response = yield axiosInstance.get('/Hotel/GetCount' + queryString, headers);
        yield put(actions.setHotelsCount(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchHotelSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //'auth_token': action.token
    };
    try {
        const response = yield axiosInstance.get('/Hotel/GetById/' + action.id, headers);
        yield put(actions.setHotel(response.data));
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
        const response = yield axiosInstance.get('/Hotel/GetPhotos/' + action.hotelId, headers);
        yield put(actions.setHotelPhotos(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}
