import { React, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect, useLocation } from 'react-router-dom';

import classes from './HotelPhotos.module.scss';
import * as actions from '../../../store/actions/hotelActions';
import * as authActions from '../../../store/actions/authActions';
import { useMemo } from 'react';

const HotelPhotos = props => {

    const { id } = useParams();
    const location = useLocation();
    const { photos, token, loggedIn, uploadedPercentage, successfulOperation,
        onFetchPhotos, onUpload, onRemoveFile, onSetRedirect } = props;
    const [redirect, setRedirect] = useState();

    useEffect(() => {
        if (!loggedIn) {
            onSetRedirect(location.pathname);
            setRedirect(<Redirect to="/auth/" />);
        }
    }, [loggedIn, onSetRedirect]);

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

    const deleteHandler = (hotelPhoto) => {
        onRemoveFile(hotelPhoto.id, `Resources/Images/hotels/${hotelPhoto.photoUrl}`, token);
    };

    const closeHandler = useCallback(() => {
        setRedirect(<Redirect to={`/hotels/${id}`} />);
    }, [id, setRedirect]);

    useEffect(() => {
        if (successfulOperation) {
            onFetchPhotos(id);
        }
    }, [successfulOperation]);

    const photosContent = useMemo(() => {
        if (photos.length === 0) {
            return <p>There is no photo!</p>
        }
        else {
            return photos.map(q => (
                <div key={q.id}>
                    <img src={`Resources/Images/hotels/${q.photoUrl}`} className="img-response" />
                    <div>
                        <img className={classes.DeleteImage} src='/images/delete.png' alt="Delete Image"
                            onClick={() => deleteHandler(q)} />
                    </div>
                </div>));
        }
    }, [photos]);

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
                    {/*<label class="form-label" for="customFile">Select a photo</label>*/}
                    <input type="file" id="customFile" className="form-control-file border"
                        accept="image/*" onChange={uploadImageHandler} />
                </div>
            </div>
            {
                uploadedPercentage &&
                <div className="row">
                    <div className="col-12">
                        <progress id="file" value={uploadedPercentage} max="100"></progress>
                        <small className="align-top"> {uploadedPercentage}%</small>
                    </div>
                </div>

            }
            <br />
            <button className="btn btn-primary float-right" type="button" onClick={closeHandler}>OK</button >
        </div>
    );
};

const mapStateToProps = state => {
    return {
        photos: state.hotel.photos,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        uploadedPercentage: state.upload.fileUploadPercentage,
        successfulOperation: state.common.successfulOperation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPhotos: (hotelId) => dispatch(actions.fetchHotelPhotos(hotelId)),
        onUpload: (hotelId, file, token) => dispatch(actions.uploadHotelPhoto(hotelId, file, token)),
        onRemoveFile: (id, filePath, token) => dispatch(actions.removeHotelPhoto(id, filePath, token)),
        onSave: (hotelPhoto, token) => dispatch(actions.saveHotelPhoto(hotelPhoto, token)),
        onDelete: (id, token) => dispatch(actions.deleteHotelPhoto(id, token)),
        onSetRedirect: (path) => dispatch(authActions.setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelPhotos);