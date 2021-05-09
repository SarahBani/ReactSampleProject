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

export const clearSelectedHotel = () => {
    return {
        type: actionTypes.CLEAR_SELECTED_HOTEL
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

export const saveHotel = (hotel, token) => {
    return {
        type: actionTypes.SAVE_HOTEL,
        hotel: hotel,
        token: token
    };
};

export const deleteHotel = (id, token) => {
    return {
        type: actionTypes.DELETE_HOTEL,
        id: id,
        token: token
    };
};

export const uploadHotelPhoto = (hotelId, file, token) => {
    return {
        type: actionTypes.UPLOAD_HOTEL_PHOTO,
        hotelId: hotelId,
        file: file,
        token: token
    };
};

export const removeHotelPhoto = (id, filePath, token) => {
    return {
        type: actionTypes.REMOVE_HOTEL_PHOTO,
        id: id,
        filePath: filePath,
        token: token
    };
};

export const saveHotelPhoto = (hotelPhoto, token) => {
    return {
        type: actionTypes.SAVE_HOTEL_PHOTO,
        hotelPhoto: hotelPhoto,
        token: token
    };
};

export const deleteHotelPhoto = (id, token) => {
    return {
        type: actionTypes.DELETE_HOTEL_PHOTO,
        id: id,
        token: token
    };
};