import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import classes from './Hotels.module.scss';
import PageTitle from '../UI/PageTitle/PageTitle';
import Location from '../Location/Location';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/hotelActions';
import HotelItem from './HotelItem/HotelItem';
import SelectHotel from './SelectHotel/SelectHotel';
import { useParams, useHistory } from 'react-router-dom';
import HotelDetail from './HotelDetail/HotelDetail';

const Hotels = props => {

    const { hotels, onFetchHotels } = props;
    const { id } = useParams();
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [hotelItems, setHotelItems] = useState([]);
    const [hotelDetail, setHotelDetail] = useState();
    const history = useHistory();

    useEffect(() => {
        onFetchHotels(selectedCountryId, selectedCityId);
    }, [onFetchHotels]);

    useEffect(() => {
        const list = hotels.map(hotel => <HotelItem key={hotel.id} hotel={hotel} />);
        setHotelItems(list);
    }, [hotels, setHotelItems]);

    useEffect(() => {
        if (!id) {
            setHotelDetail(<SelectHotel />);
        }
        else {
            const selectedHotel = hotels.filter(q => q.id === +id);
            if (selectedHotel.length > 0) {
                setHotelDetail(<HotelDetail hotel={selectedHotel[0]} />);
            }
        }
    }, [id, hotels, setHotelDetail]);

    const changeCountryHandler = useCallback((countryId) => {
        setSelectedCountryId(countryId);
    }, []);

    const changeCityHandler = useCallback((cityId) => {
        setSelectedCityId(cityId);
    }, []);

    return (
        <div className={["container", classes.Hotels].join(' ')}>
            {/*<BreadCrumb title="Hotels"/>*/}
            <PageTitle title="Hotels" />
            <div className="row">
                <div className="col-7">
                    {/* <Location changeCountry={changeCountryHandler} changeCity={changeCityHandler} />*/}
                    <div className={classes.HotelItems}>
                        {hotelItems}
                    </div>
                </div>
                <div className="col-5">
                    {hotelDetail}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        hotels: state.hotel.hotels
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHotels: (selectedCountryId, selectedCityId) => dispatch(actions.fetchHotels(selectedCountryId, selectedCityId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Hotels));