import { React } from 'react';
import { Link } from 'react-router-dom';

const HotelItem = props => {
    return (
        <Link class="list-group-item clearfix" >
            <img src='images/no-image.png' class="img-response" />
            <strong class="list-group-item-heading">{props.hotel.name}</strong>
            <em> {props.hotel.city.name} - {props.hotel.city.country.name}</em>
            <div class='float-right'>
            </div >
        </Link >

    );
};

export default HotelItem;