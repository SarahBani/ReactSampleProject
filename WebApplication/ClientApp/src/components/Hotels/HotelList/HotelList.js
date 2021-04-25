import { React, useState, useEffect, useCallback } f

import classes from './HotelList.module.scss';
import { connect } from 'react-redux';

const HotelList = props => {
    const { hotels, onFetchHotels } = props;
    const [hotelItems, setHotelItems] = useState([]);

    useEffect(() => {
        onFetchHotels(props.selectedCountryId, props.selectedCityId);
    }, [onFetchHotels]);

    useEffect(() => {
        const list = hotels.map(hotel => <HotelItem key={hotel.id} hotel={hotel} />);
        setHotelItems(list);
    }, [hotels, setHotelItems]);

    return (
        <div className={ classes.HotelList}>
            <div className="row">
                <div className="col-7">
                    <div className={classes.HotelItems}>
                        {hotelItems}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);