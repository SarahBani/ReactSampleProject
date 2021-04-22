import * as actionTypes from '../actions/hotelActionTypes';

const initialState = {
    hotels: [],
    photots: [],
    selectedHotel: null
};

const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOTELS:
            return {
                ...state,
                hotels: action.hotels
            };
        case actionTypes.SET_HOTEL_PHOTOS:
            return {
                ...state,
                photos: action.photos
            };
        case actionTypes.SELECT_HOTEL:
            return {
                ...state,
                selectedHotel: action.hotel
            };
        default:
            return state;
    }
};

export default hotelReducer;