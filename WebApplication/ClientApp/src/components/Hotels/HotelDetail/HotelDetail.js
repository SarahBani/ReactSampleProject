﻿import { React, useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import classes from './HotelDetail.module.scss';
import * as actions from '../../../store/actions/hotelActions';

const HotelDetail = props => {

    const { id, photos, onFetchHotel, onFetchHotelPhotos } = props;
    const { stars } = props.hotel || {}; // { ...props.hotel };
    const [imageUrl, setImageUrl] = useState('images/no-image.png');
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        onFetchHotel(id);
        onFetchHotelPhotos(id);
    }, [id, onFetchHotel, onFetchHotelPhotos]);

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

    useEffect(() => {
        if (photos.length > 0) {
            setImageUrl(`Resources/Images/hotels/${photos[0].photoUrl}`);
        }
        else {
            setImageUrl('images/no-image.png');
        }
    }, [photos, setImageUrl]);

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to="/hotels" />);
    }, [setRedirect]);

    const showPhotosHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}/photos`} />);
    }, [id, setRedirect]);

    const editHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}/edit`} />);
    }, [id, setRedirect]);

    const deleteHandler = useCallback(() => {

    }, []);

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
                    <h4>{props.hotel?.name}</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {starsContent}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <span>{props.hotel?.city.country.name} - {props.hotel?.city.name}</span>
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
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={showPhotosHandler}>Photos</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick={editHandler}>Edit</a>
                            <a className="dropdown-item" onClick={deleteHandler}>Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

const mapStateToProps = state => {
    return {
        hotel: state.hotel.selectedHotel,
        photos: state.hotel.photos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHotel: (id) => dispatch(actions.fetchHotel(id)),
        onFetchHotelPhotos: (id) => dispatch(actions.fetchHotelPhotos(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetail);