import { React, useState } from 'react';
import { connect } from 'react-redux';

import classes from './HotelsSummary.module.scss';
import * as actions from '../../../store/actions/hotelActions';
import { useEffect } from 'react';
import HotelItemCard from '../HotelItemCard/HotelItemCard';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const HotelsSummary = props => {

    const { hotels, onFetchHotels } = props;
    const [hotelItemCards, setHotelItemCards] = useState([]);

    useEffect(() => {
        onFetchHotels();
    }, [onFetchHotels]);

    useEffect(() => {
        const list = hotels.map(hotel => <HotelItemCard key={hotel.id} hotel={hotel} />);
        setHotelItemCards(list);
    }, [hotels]);

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