import { put } from 'redux-saga/effects';

import axiosInstance from '../../axios-instance';
import * as actions from '../actions/locationActions';
import * as commonActions from '../actions/commonActions';
import * as hotelActions from '../actions/hotelActions';

export function* fetchCountriesSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //'auth_token': action.token
    };
    try {
        const response = yield axiosInstance.get('/Location/GetCountries', headers);
        yield put(actions.setCountries(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* selectCountrySaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        //'auth_token': action.token
    };
    try {
        const response = yield axiosInstance.get('/Location/GetCities/' + action.countryId, headers);
        yield put(actions.setCities(response.data));
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* selectCitySaga(action) {
    yield put(hotelActions.fetchHotels(action.cityId));
}