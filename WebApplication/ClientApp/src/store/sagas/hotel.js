import { put } from 'redux-saga/effects';

import axiosInstance from '../../axios-instance';
import { OperationsEnum } from '../../shared/constant';
import * as actions from '../actions/hotelActions';
import * as commonActions from '../actions/commonActions';

export function* fetchHotelsSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
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
        const response = yield axiosInstance.get('/Hotel/GetList' + queryString, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setHotels(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchHotelsCountSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
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
        const response = yield axiosInstance.get('/Hotel/GetCount' + queryString, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setHotelsCount(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchHotelSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const response = yield axiosInstance.get('/Hotel/GetById/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setHotel(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* fetchHotelPhotosSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    };
    try {
        const response = yield axiosInstance.get('/Hotel/GetPhotos/' + action.hotelId, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.setHotelPhotos(response.data));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* saveHotelSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${action.token}` 
    };
    try {
        let response;
        if (!action.hotel.id) {
            response = yield axiosInstance.post('/Hotel/Insert', action.hotel, { headers: headers });
        }
        else {
            response = yield axiosInstance.put('/Hotel/Update/' + action.hotel.id, action.hotel, { headers: headers });
        }
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(OperationsEnum.Insert));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* deleteHotelSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${action.token}` 
    };
    try {
        const response = yield axiosInstance.delete('/Hotel/Delete/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(OperationsEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* uploadHotelPhotoSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${action.token}`,

        reportProgress: true,
        observe: 'events'
    };
    try {
        console.log(action.file)
        const formData = yield new FormData();
        //var imagefile = yield document.querySelector('#file');
        //formData.append("image", imagefile.files[0]);
        formData.append("file", action.file, action.file.name);
        const response = yield axiosInstance.post(`/Hotel/UploadPhoto/${action.hotelId}`,
            formData, { headers: headers });

        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(OperationsEnum.Upload));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* removeHotelPhotoSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${action.token}`
    };
    try {
        const response = yield axiosInstance.delete('/Hotel/RemovePhotoFile/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(OperationsEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* saveHotelPhotoSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${action.token}`
    };
    try {
        const response = yield axiosInstance.post('/Hotel/InsertPhoto', action.hotelPhoto, { headers: headers });
       
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(OperationsEnum.Insert));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* deleteHotelPhotoSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${action.token}`
    };
    try {
        const response = yield axiosInstance.delete('/Hotel/DeletePhoto/' + action.id, { headers: headers });
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(OperationsEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

