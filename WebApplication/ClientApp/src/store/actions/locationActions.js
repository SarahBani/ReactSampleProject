import * as actionTypes from './locationActionTypes';

export const fetchCountries = () => {
    return {
        type: actionTypes.FETCH_COUNTRIES
    };
};

export const setCountries = (countries) => {
    return {
        type: actionTypes.SET_COUNTRIES,
        countries: countries
    };
};

export const selectCountry = (countryId) => {
    return {
        type: actionTypes.SELECT_COUNTRY,
        countryId: countryId
    };
};

export const setCities = (cities) => {
    return {
        type: actionTypes.SET_CITIES,
        cities: cities
    };
};

export const selectCity = (cityId) => {
    return {
        type: actionTypes.SELECT_CITY, 
        cityId: cityId
    };
};