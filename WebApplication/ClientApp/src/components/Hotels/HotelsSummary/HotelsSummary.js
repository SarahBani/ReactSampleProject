import { React, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/hotelActions';
import { useEffect } from 'react';
import HotelItemCard from '../HotelItemCard/HotelItemCard';

const HotelsSummary = props => {

    const { hotels, onFetchHotels } = props;
    const [hotelItems, setHotelItems] = useState([]);

    useEffect(() => {
        onFetchHotels();
    }, [onFetchHotels]);

    useEffect(() => {
        const list = hotels.map(hotel => <HotelItemCard key={hotel.id} hotel={hotel} />);
        setHotelItems(list);
    }, [hotels]);

    return (
        <div className="card-columns">
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
        onFetchHotels: () => dispatch(actions.fetchHotels())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelsSummary);