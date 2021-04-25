import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Hotels.module.scss';
import PageTitle from '../UI/PageTitle/PageTitle';
import Location from '../Location/Location';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import SelectHotel from './SelectHotel/SelectHotel';
import HotelDetail from './HotelDetail/HotelDetail';
import HotelList from './HotelList/HotelList';
import HotelEdit from './HotelEdit/HotelEdit';

const Hotels = props => {

    const { id, action } = useParams();
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [hotelDetail, setHotelDetail] = useState();

    useEffect(() => {
        if (!id) {
            setHotelDetail(<SelectHotel />);
        }
        else {
            if (!action) {
                setHotelDetail(<HotelDetail id={id} />);
            }
            else if (action === 'edit') {
                setHotelDetail(<HotelEdit id={id} />);
            }
        }
    }, [id, action, setHotelDetail]);

    const changeCountryHandler = useCallback((countryId) => {
        setSelectedCountryId(countryId);
    }, []);

    const changeCityHandler = useCallback((cityId) => {
        setSelectedCityId(cityId);
    }, []);

    return (
        <div className="container">
            {/*<BreadCrumb title="Hotels"/>*/}
            <PageTitle title="Hotels" />
            <div className="row">
                <div className="col-7">
                    {/* <Location changeCountry={changeCountryHandler} changeCity={changeCityHandler} />*/}
                    <HotelList />
                </div>
                <div className="col-5">
                    {hotelDetail}
                </div>
            </div>
        </div>
    );
};

export default withErrorHandler(Hotels);