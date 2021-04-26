import { React, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './HotelsSummary.module.scss';
import HotelItemCard from '../HotelItemCard/HotelItemCard';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/hotelActions';

const HotelsSummary = props => {

    const { hotels, onFetchHotels } = props;

    useEffect(() => {
        onFetchHotels();
    }, [onFetchHotels]);

    const hotelItemCards = useMemo(() => hotels.map(hotel =>
        <HotelItemCard key={hotel.id} hotel={hotel} />)
        , [hotels]);

    return (
        <div className={["card-deck", classes.HotelsSummary].join(' ')}>
            {hotelItemCards}
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
        onFetchHotels: () => dispatch(actions.fetchHotels(null, null, 1, 6))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(HotelsSummary));