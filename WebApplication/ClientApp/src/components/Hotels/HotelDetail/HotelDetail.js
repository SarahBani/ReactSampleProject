import { React, useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router';

import classes from './HotelDetail.module.scss';

const HotelDetail = props => {

    const { stars, photos } = props.hotel;
    const [imageUrl, setImageUrl] = useState('images/no-image.png');
    const [starsUI, setStarsUI] = useState([]);
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        if (photos.length > 0) {
            setImageUrl(`Resources/Images/hotels/${photos[0].photoUrl}`);
        }
        else {
            setImageUrl('images/no-image.png');
        }
    }, [photos, setImageUrl]);

    useEffect(() => {
        const arr = [];
        for (var i = 0; i < 5; i++) {
            arr.push(
                <span key={i} className={['fa', 'fa-star',
                    (stars > i ? 'checked' : '')].join(' ')}>
                </span>
            );
        }
        setStarsUI(arr);
    }, [stars]);

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to="/hotels" />);
    }, [setRedirect]);

    return (
        <div className={classes.HotelDetail}>
            {redirect}
            <div className="row">
                <div className="col-12">
                    <img className="img-response selected-photo" src={imageUrl} />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h4>{props.hotel.name}</h4>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    {starsUI}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <span>{props.hotel.city.country.name} - {props.hotel.city.name}</span>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={cancelHandler}>
                            Back
                        </button>
                        <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown" >
                            Manage<span className="caret"></span>
                        </button>
                        <div className=" dropdown-menu">
                            <a className="dropdown-item" onClick={cancelHandler}>Photos</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={cancelHandler}>Edit</a>
                            <a className="dropdown-item" onClick={cancelHandler}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetail;