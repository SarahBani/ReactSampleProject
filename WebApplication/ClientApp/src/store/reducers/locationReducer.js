﻿import * as actionTypes from '../actions/locationActionTypes';

const initialState = {
    countries: [],
    cities: [],
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COUNTRIES:
            return {
                ...state,
                countries: action.countries,
                cities: []
            };
        case actionTypes.SET_CITIES:
            return {
                ...state,
                cities: action.cities
            };
        case actionTypes.SELECT_CITY:
            return {
                ...state,
                selectedCity: action.city
            };
        default:
            return state;
    }
};

export default locationReducer;