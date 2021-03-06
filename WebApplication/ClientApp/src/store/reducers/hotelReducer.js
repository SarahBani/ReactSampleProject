import * as actionTypes from '../actions/hotelActionTypes';

const initialState = {
    hotels: [],
    count: 0,
    selectedHotel: null,
    photos: [],
};

const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOTELS: 
            return {
                ...state,
                hotels: action.hotels
            };
        case actionTypes.SET_HOTELS_COUNT:
            return {
                ...state,
                count: action.count
            };
        case actionTypes.SET_HOTEL:
            return {
                ...state,
                selectedHotel: action.hotel
            };
        case actionTypes.CLEAR_SELECTED_HOTEL:
            return {
                ...state,
                selectedHotel: null
            };
        case actionTypes.SET_HOTEL_PHOTOS:
            return {
                ...state,
                photos: action.photos
            };
        default:
            return state;
    }
};

export default hotelReducer;