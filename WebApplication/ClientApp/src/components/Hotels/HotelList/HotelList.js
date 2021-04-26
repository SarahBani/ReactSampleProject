import { React, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import classes from './HotelList.module.scss';
import HotelItem from '../HotelItem/HotelItem';
import NoHotel from '../NoHotel/NoHotel';
import * as actions from '../../../store/actions/hotelActions';

const HotelList = props => {

    const { hotels, onFetchHotels, onFetchHotelsCount } = props;

    useEffect(() => {
        onFetchHotels(props.selectedCountryId, props.selectedCityId);
        onFetchHotelsCount(props.selectedCountryId, props.selectedCityId);
    }, [onFetchHotels, onFetchHotelsCount]);

    const hotelItems = useMemo(() => {
        return hotels.map(hotel =>
            <HotelItem key={hotel.id} hotel={hotel} />
        );
    }, [hotels]);

    const content = useMemo(() => {
        return hotels.length > 0 ?
            <div className="list-group">
                {hotelItems}
                <div className="rows-count text-center">
                    <b>Total: </b><span>{props.hotelsCount}</span>
                </div>
            </div>
            : <NoHotel />;
    }, [hotelItems]);

    //const selectHotelHandler = useCallback((hotel) => {
    //    onSelectHotel(hotel);
    //    setRedirect(<Redirect to={`/hotels/${hotel.id}`} />);
    //}, [onSelectHotel]);

    return (
        <div className={classes.HotelList}>
            {content}
            <div>
                <button className="btn btn-primary" onClick={props.onAdd}>Add</button>
                <button className="btn btn-success" onClick={props.onRefresh}>Refresh</button>
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