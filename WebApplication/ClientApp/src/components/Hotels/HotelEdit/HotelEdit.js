﻿import { React, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import DropDown from '../../UI/DropDown/DropDown';

const HotelEdit = props => {

    const { id, countries, cities, onFetchCountries, onSelectCountry, onSelectCity  } = props;
    const [countryDropDownData, setCountryDropDownData] = useState([]);
    const [cityDropDownData, setCityDropDownData] = useState([]);
    const [redirect, setRedirect] = useState();


    const selectCountryHandler = useCallback((countryId) => {
        onSelectCountry(countryId);
        props.changeCountry(countryId);
    }, [onSelectCountry]);

    const selectCityHandler = useCallback((cityId) => {
        onSelectCity(cityId);
        props.changeCity(cityId);
    }, [onSelectCity]);

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}`} />);
    }, [id, setRedirect]);

    return (
        <div>
            {redirect}
            <form>
                <div className="form-group">
                    <label for="name">Name: </label>
                    <input type="text" id="name" name="name" class="form-control" ngModel required />
                </div>

                <div className="form-group">
                    <DropDown data={countryDropDownData} title="Country" onSelect={selectCountryHandler} />
                </div>

                <div className="form-group">
                    <DropDown data={cityDropDownData} title="City" onSelect={selectCityHandler} />
                </div>

                <div className="form-group">
                    <label for="stars">Stars: </label>
                    <br />
                    <div id="stars" class='starrr'></div>
                </div>

                <div className="row">
                    <button className="btn btn-primary" type="reset" >Clear</button>
                    <button className="btn btn-success" type="submit" >Save</button>
                    <button className="btn btn-info" type="button">Photos</button>
                    <button className="btn btn-danger" type="button" > Delete</button >
                    <button className="btn btn-warning" type="button" onClick={cancelHandler} > Cancel</button >
                </div >
            </form >
        </div >
    );
};

export default HotelEdit;