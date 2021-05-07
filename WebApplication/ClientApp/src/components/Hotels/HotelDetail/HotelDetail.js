import { React, useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { Redirect, useParams } from 'react-router';
import { connect } from 'react-redux';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

import classes from './HotelDetail.module.scss';
import Modal from '../../UI/Modal/Modal';
import ConfirmDelete from '../../UI/ConfirmDelete/ConfirmDelete';
import { OperationsEnum } from '../../../shared/constant';
import HotelPhotos from '../HotelPhotos/HotelPhotos';
import { ModalType } from '../../../shared/constant';
import * as actions from '../../../store/actions/hotelActions';

const Carousel = require('react-responsive-carousel').Carousel;

const HotelDetail = props => {

    const { id, hotelPhotos, successfulOperation, loggedIn, token,
        onFetchHotel, onFetchHotelPhotos, onDeleteHotel } = props;
    const { photos } = useParams();
    const { stars } = props.hotel || {}; // { ...props.hotel };
    const [redirect, setRedirect] = useState();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    //const [showPhotosModal, setShowPhotosModal] = useState(false);

    useEffect(() => {
        onFetchHotel(id);
        onFetchHotelPhotos(id);
    }, [id, onFetchHotel, onFetchHotelPhotos]);

    const photosModalContent = useMemo(() => (
        photos &&
        <Modal show="true" type={ModalType.COMPONENT}>
            <HotelPhotos />
        </Modal>
    ), [photos]);

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
        if (successfulOperation === OperationsEnum.Delete) {
            console.log('useEffect-successfulOperation');
            cancelHandler();
        }
    }, [successfulOperation]);

    const cancelHandler = useCallback(() => {
        setRedirect(<Redirect to="/hotels" />);
    }, [setRedirect]);

    const showPhotosHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}/photos`} />);
    }, [id, setRedirect]);

    const editHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}/edit`} />);
    }, [id, setRedirect]);

    const deleteConfirmContent = useMemo(() => {
        return (
            <Modal show={showDeleteConfirm} type={ModalType.COMPONENT}>
                <ConfirmDelete onOK={() => confirmDeleteHandler(true)}
                    onCancel={() => confirmDeleteHandler(false)} />
            </Modal>
        );
    }, [showDeleteConfirm]);

    const deleteHandler = useCallback(() => {
        setShowDeleteConfirm(true);
    }, [setShowDeleteConfirm]);

    const confirmDeleteHandler = useCallback((isConfirmed) => {
        if (isConfirmed) {
            onDeleteHotel(id, token);
        }
        setShowDeleteConfirm(false);
    }, [id, token, setShowDeleteConfirm, onDeleteHotel]);

    const photosContent = useMemo(() => {
        if (hotelPhotos?.length > 0) {
            const thumbs = hotelPhotos.map(q =>
                <div key={q.id}>
                    <img label={q.id} src={`Resources/Images/hotels/${q.photoUrl}`}
                        className={classes.Image} />
                    {/*<p className="legend">Legend 1</p>*/}
                </div>);
            return (
                <Carousel>
                    {thumbs}
                </Carousel>
            );
        }
        else {
            return <img className="img-response" src='images/no-image.png' />
        }
    }, [hotelPhotos]);

    return (
        <div className={classes.HotelDetail}>
            {redirect}
            {deleteConfirmContent}
            {photosModalContent}

            {/*
            <CarouselSlider photos={ hotelPhotos} />
            */}

            <div className="row">
                <div className="col-12 text-center">
                    {photosContent}
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
                    <address>{props.hotel?.address}</address>
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
                            {
                                loggedIn && (
                                    <Fragment>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" onClick={editHandler}>Edit</a>
                                        <a className="dropdown-item" onClick={deleteHandler}>Delete</a>
                                    </Fragment>
                                )}
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
        hotelPhotos: state.hotel.photos,
        successfulOperation: state.common.successfulOperation,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHotel: (id) => dispatch(actions.fetchHotel(id)),
        onFetchHotelPhotos: (id) => dispatch(actions.fetchHotelPhotos(id)),
        onDeleteHotel: (id, token) => dispatch(actions.deleteHotel(id, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetail);