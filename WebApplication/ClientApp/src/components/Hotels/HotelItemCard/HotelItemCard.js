import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import classes from './HotelItemCard.module.scss';

const HotelItemCard = props => {

    const { stars, photos } = props.hotel;
    const [imageUrl, setImageUrl] = useState('images/no-image.png');
    const [starsUI, setStarsUI] = useState([]);

    useEffect(() => {
        if (photos.length > 0) {
            setImageUrl(`Resources/Images/hotels/${photos[0].photoUrl}`);
        }
    }, [photos]);

    useEffect(() => {
        const arr = [];
        for (var i = 0; i < 5; i++) {
            arr.push(
                <span key={i} className={['fa', 'fa-star',
                    (props.hotel.stars > i ? 'checked' : '')].join(' ')}>
                </span>
            );
        }
        setStarsUI(arr);
    }, [stars]);

    return (
        <div className={["card", classes.HotelItemCard].join(' ')}>
            <Link to={'/hotel/' + props.hotel.id}>
                <img src={imageUrl} alt={props.hotel.name} />
            </Link>
            <div className="card-body text-center">
                <Link to={'/hotels/' + props.hotel.id}>
                    <strong className="card-title">{props.hotel.name}</strong>
                </Link>
                <p className="card-text">
                    <em>{props.hotel.city.name} - {props.hotel.city.country.name}</em>
                </p>
                <div>
                    {starsUI}
                </div>
            </div>
        </div>
    );
};

export default HotelItemCard;