import { React, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import classes from './HotelPhotos.module.scss';
import * as actions from '../../../store/actions/hotelActions';
import * as authActions from '../../../store/actions/authActions';

const HotelPhotos = props => {

    const { id } = useParams();
    const { photos, token, onFetchPhotos, onUpload } = props;
    const [uploadedPercentage, setUploadedPercentage] = useState();
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        onFetchPhotos(id);
    }, [onFetchPhotos]);

    const uploadImageHandler = useCallback((event) => {
        const files = event.target.files;
        if (files.length == 0) {
            return;
        }
        onUpload(id, files[0], token);
    }, [onUpload]);

    const deleteHandler = (photo) => {

    };

    const okHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}`} />);
    }, [id, setRedirect]);

    const photosContent = photos.map(q => (
        <div key={q.id}>
            <img src={`Resources/Images/hotels/${q.photoUrl}`} className="img-response" />
            <div>
                <img className={classes.DeleteImage} src='/images/delete.png' alt="Delete Image"
                    onClick={deleteHandler(q)} />
            </div>
        </div>));

    return (
        <div className={['container', classes.HotelPhotos].join(' ')}>
            {redirect}
            <div className="row">
                <div className={['col-12', classes.Album].join(' ')}>
                    {photosContent}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <input type="file" className="form-control-file border"
                        accept="image/*" onChange={uploadImageHandler} />
                </div>
            </div>
            {
                uploadedPercentage &&
                <div className="row">
                    <div className="col-12">
                        <progress id="file" value="{ uploadedPercentage }" max="100"></progress>
                        <small className="align-top"> {uploadedPercentage}%</small>
                    </div>
                </div>
            }
            <br />
            <button className="btn btn-primary float-right" type="button"
                onClick={okHandler}> OK</button >
        </div >
    );
};

const mapStateToProps = state => {
    return {
       photos: state.hotel.photos,
        successfulOperation: state.common.successfulOperation,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPhotos: (hotelId) => dispatch(actions.fetchHotelPhotos(hotelId)),
        onUpload: (hotelId, file, token) => dispatch(actions.uploadHotelPhoto(hotelId, file, token)),
        //onRemove: (hotelId, token) => dispatch(actions.removeHotelPhoto(hotelPhoto, token)),
        onSave: (hotelPhoto, token) => dispatch(actions.saveHotelPhoto(hotelPhoto, token)),
        onDelete: (id, token) => dispatch(actions.deleteHotelPhoto(id, token)),
        onSetRedirect: (path) => dispatch(authActions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelPhotos);