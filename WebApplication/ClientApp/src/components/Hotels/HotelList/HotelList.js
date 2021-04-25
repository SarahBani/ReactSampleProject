import { React, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './HotelList.module.scss';
import HotelItem from '../HotelItem/HotelItem';
import * as actions from '../../../store/actions/hotelActions';

const HotelList = props => {
    const { hotels, onFetchHotels } = props;
    const [hotelItems, setHotelItems] = useState([]);

    useEffect(() => {
        onFetchHotels(props.selectedCountryId, props.selectedCityId);
    }, [onFetchHotels]);

    useEffect(() => {
        const list = hotels.map(hotel =>
            <HotelItem key={hotel.id} hotel={hotel} />
        );
        setHotelItems(list);
    }, [hotels, setHotelItems]);

    //const selectHotelHandler = useCallback((hotel) => {
    //    onSelectHotel(hotel);
    //    setRedirect(<Redirect to={`/hotels/${hotel.id}`} />);
    //}, [onSelectHotel]);

    return (
        <div className={classes.HotelList}>
            {hotelItems}
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
        onFetchHotels: (selectedCountryId, selectedCityId) => dispatch(actions.fetchHotels(selectedCountryId, selectedCityId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);