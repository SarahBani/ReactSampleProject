import * as actionTypes from './hotelActionTypes';

export const fetchHotels = (cityId, countryId, pageNo, pageCount) => {
    return {
        type: actionTypes.FETCH_HOTELS,
        cityId: cityId,
        countryId: countryId,
        pageNo: pageNo,
        pageCount: pageCount
    };
};

export const setHotels = (hotels) => {
    return {
        type: actionTypes.SET_HOTELS,
        hotels: hotels
    };
};

export const fetchHotelsCount = (cityId, countryId) => {
    return {
        type: actionTypes.FETCH_HOTELS_COUNT,
        cityId: cityId,
        countryId: countryId
    };
};

export const setHotelsCount = (count) => {
    return {
        type: actionTypes.SET_HOTELS_COUNT,
        count: count
    };
};

export const fetchHotel = (id) => {
    return {
        type: actionTypes.FETCH_HOTEL,
        id: id
    };
};

export const setHotel = (hotel) => {
    return {
        type: actionTypes.SET_HOTEL,
        hotel: hotel
    };
};

export const fetchHotelPhotos = (hotelId) => {
    return {
        type: actionTypes.FETCH_HOTEL_PHOTOS,
        hotelId: hotelId
    };
};

export const setHotelPhotos = (photos) => {
    return {
        type: actionTypes.SET_HOTEL_PHOTOS,
        photos: photos
    };
};

export const saveHotel = (id, hotel) => {
    return {
        type: actionTypes.SAVE_HOTEL,
        id: id,
        hotel: hotel
    };
};

export const deleteHotel = (id) => {
    return {
        type: actionTypes.DELETE_HOTEL,
        id: id
    };
};

export const operationSucceeded = () => {
    return {
        type: actionTypes.OPERATION_SUCCEEDED
    };
};
