import { React, useState, useEffect, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';

import classes from './HotelItem.module.scss';

const HotelItem = memo(props => {

    const { stars, photos } = props.hotel;
    const [imageUrl, setImageUrl] = useState('images/no-image.png');

    useEffect(() => {
        if (photos?.length > 0) {
            setImageUrl(`Resources/Images/hotels/${photos[0].photoUrl}`);
        }
    }, [photos]);

    const starsContent = useMemo(() => {
        const arr = [];
        for (var i = 0; i < 5; i++) {
            arr.push(
                <span key={i} className={['fa', 'fa-star',
                    (stars > i ? 'checked' : '')].join(' ')}>
                </span>
            );
        }
        return arr;
    }, [stars]);

    return (
        <Link className={["list-group-item", "clearfix", classes.HotelItem].join(' ')}
            to={`/hotels/${props.hotel.id}`}>
            <img src={imageUrl} className="img-response" />
            <strong className="list-group-item-heading">{props.hotel.name}</strong>
            <em> {props.hotel.city.name} - {props.hotel.city.country.name}</em>
            <div className='float-right'>
                {starsContent}
            </div>
        </Link>
    );
});

export default HotelItem;