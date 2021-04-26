import { React, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import classes from './HotelList.module.scss';
import HotelItem from '../HotelItem/HotelItem';
import NoHotel from '../NoHotel/NoHotel';
import * as actions from '../../../store/actions/hotelActions';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const HotelList = props => {

    const { hotels, hotelsCount, selectedCountryId, selectedCityId,
        onFetchHotels, onFetchHotelsCount } = props;

    useEffect(() => {
        refreshHandler();
    }, [selectedCountryId, selectedCityId, onFetchHotels, onFetchHotelsCount]);

    const refreshHandler = useCallback(() => {
        onFetchHotels(props.selectedCountryId, props.selectedCityId);
        onFetchHotelsCount(props.selectedCountryId, props.selectedCityId);
    }, [onFetchHotels, onFetchHotelsCount]);

    const hotelItems = useMemo(() => {
        return hotels.map(hotel =>
            <HotelItem key={hotel.id} hotel={hotel} />
        );
    }, [hotels]);

    const content = useMemo(() => {
        return (hotels.length > 0 && hotelsCount > 0) ?
            <div className="list-group">
                {hotelItems}
                <div className={["text-center", classes.Counter].join(' ')}>
                    <b>Total: </b><span>{hotelsCount}</span>
                </div>
            </div>
            : <NoHotel />;
    }, [hotelItems, hotelsCount]);

    //const selectHotelHandler = useCallback((hotel) => {
    //    onSelectHotel(hotel);
    //    setRedirect(<Redirect to={`/hotels/${hotel.id}`} />);
    //}, [onSelectHotel]);

    return (
        <div className={classes.HotelList}>
            {content}
            <div>
                <Link className="btn btn-primary" to="/hotels/new">Add</Link>
                <button className="btn btn-success" onClick={refreshHandler}>Refresh</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        hotels: state.hotel.hotels,
        hotelsCount: state.hotel.count
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHotels: (selectedCountryId, selectedCityId) => dispatch(actions.fetchHotels(selectedCountryId, selectedCityId)),
        onFetchHotelsCount: (selectedCountryId, selectedCityId) => dispatch(actions.fetchHotelsCount(selectedCountryId, selectedCityId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);