import * as actionTypes from './hotelActionTypes';

export const fetchHotels = (cityId, countryId) => {
    return {
        type: actionTypes.FETCH_HOTELS,
        cityId: cityId,
        countryId: countryId
    };
};

export const setHotels = (hotels) => {
    return {
        type: actionTypes.SET_HOTELS,
        hotels: hotels
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
