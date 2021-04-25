import React, { useState, useEffect, Fragment, useCallback } from 'react';

import classes from './Location.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locationActions';
import DropDown from '../UI/DropDown/DropDown';

const Location = props => {
    const { countries, cities, onFetchCountries, onSelectCountry, onSelectCity } = props;
    const [countryDropDownData, setCountryDropDownData] = useState([]);
    const [cityDropDownData, setCityDropDownData] = useState([]);
    //const [countryItems, setCountryItems] = useState([]);
    //        const [cities, setCities] = useState([<p key="0">Please select a country!</p>]);

    useEffect(() => {
        onFetchCountries();
    }, [onFetchCountries]);

    useEffect(() => {
        //    const items = countries?.slice(0, 5).map(country =>
        //        <CountryItem key={country.id} data={country} displayCities={selectCountryHandler} />)
        //    setCountryItems(items);
        const dropDownData = countries.map(country => {
            const flagUrl = '/images/' + (country.flagUrl ? 'countries/' + country.flagUrl : 'no-image.png');
            return {
                id: country.id,
                text: country.name,
                imageUrl: flagUrl
            };
        });
        setCountryDropDownData(dropDownData);
    }, [countries]);

    useEffect(() => {
        const dropDownData = cities.map(city => ({
            id: city.id,
            text: city.name
        }));
        setCityDropDownData(dropDownData);
    }, [cities]);

    const selectCountryHandler = useCallback((countryId) => {
        onSelectCountry(countryId);
        props.changeCountry(countryId);
    }, [onSelectCountry]);

    const selectCityHandler = useCallback((cityId) => {
        onSelectCity(cityId);
        props.changeCity(cityId);
    }, [onSelectCity]);

    return (
        <Fragment>
            <div className="row">
                <div className="col-5" >
                    <DropDown data={countryDropDownData} title="Countries" onSelect={selectCountryHandler} />
                </div>
            </div>
            <div className="row">
                <div className="col-5" >
                    <DropDown data={cityDropDownData} title="Cities" onSelect={selectCityHandler} />
                </div>
            </div>
            {/*<div className={classes.Countries}>
                {countryItems}
            </div>
            <div>
                {cities}
            </div>*/}
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        countries: state.location.countries,
        cities: state.location.cities,
        loggedIn: !!state.auth.token,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCountries: () => dispatch(actions.fetchCountries()),
        onSelectCountry: (countryId) => dispatch(actions.selectCountry(countryId)),
        onSelectCity: (cityId) => dispatch(actions.selectCity(cityId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);