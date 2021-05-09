import { put, take, call, fork } from 'redux-saga/effects';

import axiosInstance from '../../axios-instance';
import { SuccessfulOperationsEnum, FailedOperationsEnum } from '../../shared/constant';
import * as actions from '../actions/hotelActions';
import * as commonActions from '../actions/commonActions';
import * as uploadActions from '../actions/uploadActions';
import createUploadFileChannel from './createFileUploadChannel';

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
        else {
            yield put(commonActions.operationFailed(FailedOperationsEnum.FetchHotel));
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
        let operation;
        if (!action.hotel.id) {
            response = yield axiosInstance.post('/Hotel/Insert', action.hotel, { headers: headers });
            operation = SuccessfulOperationsEnum.Insert;
        }
        else {
            response = yield axiosInstance.put('/Hotel/Update/' + action.hotel.id, action.hotel, { headers: headers });
            operation = SuccessfulOperationsEnum.Update;
        }
        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(operation));
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
            yield put(commonActions.operationSucceeded(SuccessfulOperationsEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

function uploadPhoto(action) {
    //let emit;
    //const chan = eventEmitter(emitter => {

    //    emit = emitter;
    //    return () => { }; // it's necessarily. event channel should 
    //    // return unsubscribe function. In our case 
    //    // it's empty function
    //});

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${action.token}`,

        reportProgress: true,
        observe: 'events'
    }; console.log(`/Hotel/UploadPhoto/${action.hotelId}`);
    const formData = new FormData();
    formData.append("file", action.file, action.file.name);
    return axiosInstance.post(`/Hotel/UploadPhoto/${action.hotelId}`,
        formData,
        {
            headers: headers,
            onUploadProgress: event => {
                put(uploadActions.showProgress(14));
            },
        });
}

//export function* uploadHotelPhotoSaga(action) {
//    yield put(commonActions.showLoader());
//    yield put(uploadActions.startUpload());
//    const [uploadPromise, chan] = uploadPhoto(action);
//    yield fork(watchOnProgress, chan);
//    try {

//        //const response = yield call(uploadPhoto, action);
//        const response = yield call(() => uploadPromise);
//        console.log('SUCCESS');
//        console.log(response);

//        if (response?.status === 200) {
//            const imageUrl = response.data.content.replace('Resources\\Images\\Hotels\\', '');
//            yield put(actions.saveHotelPhoto({
//                hotelId: action.hotelId,
//                photoUrl: imageUrl
//            }, action.token));
//        }
//        yield put(commonActions.hideLoader());
//    } catch (error) {
//        yield put(commonActions.raiseError(error));
//    }
//}


export function* uploadHotelPhotoSaga(action) {
    yield put(commonActions.showLoader());
    yield put(uploadActions.startUpload());

    const formData = new FormData();
    formData.append("file", action.file, action.file.name);
    const channel = yield call(createUploadFileChannel, `/Hotel/UploadPhoto/${action.hotelId}`, formData, action.token);

    while (true) {
        const { progress = 0, err, success, filePath } = yield take(channel);
        if (err) {
            yield put(commonActions.raiseError(err));
            return;
        }
        if (success) {
            const imageUrl = filePath.replace('Resources\\Images\\Hotels\\', '').replace('\\', '/');
            yield put(actions.saveHotelPhoto({
                hotelId: action.hotelId,
                photoUrl: imageUrl
            }, action.token));
            return;
        }
        yield put(uploadActions.showProgress(progress));
    }
}



//export function* uploadHotelPhotoSaga(action) {
//    yield put(commonActions.showLoader());
//    const headers = {
//        'Content-Type': 'multipart/form-data',
//        'Authorization': `Bearer ${action.token}`,

//        reportProgress: true,
//        observe: 'events'
//    };
//    try {
//        yield put(uploadActions.startUpload());
//        const formData = yield new FormData();
//        yield formData.append("file", action.file, action.file.name);


//        const response = yield axiosInstance.post(`/Hotel/UploadPhoto/${action.hotelId}`,
//            formData,
//            {
//                headers: headers,
//                onUploadProgress: event => {
//                    const uploadedPercentage = Math.round((100 * event.loaded) / event.total);
//                    //setTimeout(() => { alert(uploadedPercentage)}, 5000);

//                    //return function action(dispatch) {
//                    //    dispatch(uploadActions.showProgress(14));
//                    //};
//                    put(uploadActions.showProgress(14));
//                },
//            });
//        //.subscribe(event => {
//        //    if (event.type === HttpEventType.UploadProgress) {
//        //        const uploadedPercentage = Math.round(100 * event.loaded / event.total);
//        //        console.log(this.uploadedPercentage);
//        //    }
//        //    else if (event.type === HttpEventType.Response) {
//        //        const actionResult = event.body;
//        //        const uploadedImageUrl = actionResult.content;
//        //        //this.hotelService.insertPhoto(this.hotelId, uploadedImageUrl.toString());
//        //    }
//        //}

//        if (response?.status === 200) {
//            const imageUrl = response.data.content.replace('Resources\\Images\\Hotels\\', '');
//            yield put(actions.saveHotelPhoto({
//                hotelId: action.hotelId,
//                photoUrl: imageUrl
//            }, action.token));
//        }
//        yield put(commonActions.hideLoader());
//    } catch (error) {
//        yield put(commonActions.raiseError(error));
//    }
//}



function createUploader(payload) {
    //let emit;
    //const chan = eventEmitter(emitter => {

    //    emit = emitter;
    //    return () => { }; // it's necessarily. event channel should 
    //    // return unsubscribe function. In our case 
    //    // it's empty function
    //});

    //const uploadPromise = upload(payload, (event) => {
    //    if (event.loaded.total === 1) {
    //        emit(END);
    //    }

    //    emit(event.loaded.total);
    //});

    //return [uploadPromise, chan];
}

//function upload

function* watchOnProgress(chan) {
    while (true) {
        const data = yield take(chan);
        //yield put({ type: 'PROGRESS', payload: data });
        yield put(uploadActions.showProgress(14));
    }
}

function* uploadSource(action) {
    //const [uploadPromise, chan] = createUploader(action.payload);
    const [uploadPromise, chan] = createUploader(action.payload);
    yield fork(watchOnProgress, chan);

    try {
        const result = yield call(() => uploadPromise);
        //put({ type: 'SUCCESS', payload: result });
        alert('SUCCESS');
    } catch (err) {
        //put({ type: 'ERROR', payload: err });
        alert('ERROR');
    }
}

//function* watchOnProgress(chan) {
function* progressListener(chan) {
    while (true) {
        const data = yield take(chan)
        yield put({ type: 'PROGRESS', payload: data })
    }
}

export function* removeHotelPhotoSaga(action) {
    yield put(commonActions.showLoader());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${action.token}`
    };
    try {
        const response = yield axiosInstance.delete(`/Hotel/RemovePhotoFile?filePath=${action.filePath}`, { headers: headers });
        if (response?.status === 200) {
            yield put(actions.deleteHotelPhoto(action.id, action.token));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}

export function* saveHotelPhotoSaga(action) {
    console.log(action);
    yield put(commonActions.showLoader());
    yield put(uploadActions.reset());
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${action.token}`
    };
    try {
        const response = yield axiosInstance.post('/Hotel/InsertPhoto', action.hotelPhoto, { headers: headers });

        if (response?.status === 200) {
            yield put(commonActions.operationSucceeded(SuccessfulOperationsEnum.Insert));
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
            yield put(commonActions.operationSucceeded(SuccessfulOperationsEnum.Delete));
        }
        yield put(commonActions.hideLoader());
    } catch (error) {
        yield put(commonActions.raiseError(error));
    }
}
