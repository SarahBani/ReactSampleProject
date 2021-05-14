import { React, useEffect, useMemo, useCallback, memo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './HotelList.module.scss';
import HotelItem from '../HotelItem/HotelItem';
import NoHotel from '../NoHotel/NoHotel';
import * as actions from '../../../store/actions/hotelActions';
import Pagination from '../../UI/Pagination/Pagination';
import { useState } from 'react';

const pageCount = 10;

const HotelList = memo(props => {

    const { hotels, hotelsCount, successfulOperation, selectedCountryId, selectedCityId, loggedIn,
        onFetchHotels, onFetchHotelsCount } = props;
    const [pageNo, setPageNo] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect(() => {
        onFetchHotels(selectedCountryId, selectedCityId, pageNo, pageCount);
    }, [selectedCountryId, selectedCityId, pageNo, pageCount, onFetchHotels]);

    useEffect(() => {
        onFetchHotelsCount(selectedCountryId, selectedCityId);
    }, [selectedCountryId, selectedCityId, onFetchHotelsCount]);

    useEffect(() => {
        setPagesCount(parseInt(hotelsCount / pageCount) + ((hotelsCount % pageCount) === 0 ? 0 : 1));
    }, [hotelsCount]);

    useEffect(() => {
        if (successfulOperation) {
            refreshHandler();
        }
    }, [successfulOperation]);

    const refreshHandler = useCallback(() => {
        onFetchHotels(selectedCountryId, selectedCityId, pageNo, pageCount);
        onFetchHotelsCount(selectedCountryId, selectedCityId);
    }, [onFetchHotels, onFetchHotelsCount]);

    const changePageHandler = useCallback((no) => {
        setPageNo(no);
    }, [setPageNo]);

    const hotelItems = useMemo(() => {
        return hotels.map(hotel =>
            <HotelItem key={hotel.id} hotel={hotel} />
        );
    }, [hotels]);

    const footerContent =// useMemo(() => 
        (
            hotelsCount > 0 &&
            <div className={classes.Counter}>
                <div>
                    <Pagination pageNo={pageNo} pagesCount={pagesCount}
                        onChange={changePageHandler} />
                </div>
                <div className="float-right">
                    <b>Count: </b><span>{hotelsCount}</span>
                </div>
            </div>
        );
    //, [hotelsCount, pageNo, pagesCount, changePageHandler]);

    const listContent = //useMemo(() =>
        (
            (hotels.length > 0 && hotelsCount > 0) ?
                <div className="list-group">
                    {hotelItems}
                    {footerContent}
                </div>
                : <NoHotel />
        );
    //, [hotelItems, hotelsCount, footerContent]);

    return (
        <div className={classes.HotelList}>
            {listContent}
            <div>
                {loggedIn && <Link className="btn btn-primary" to="/hotels/new">Add</Link>}
                <button className="btn btn-success" onClick={refreshHandler}>Refresh</button>
            </div>
        </div>
    );
});

const mapStateToProps = state => {
    return {
        hotels: state.hotel.hotels,
        hotelsCount: state.hotel.count,
        successfulOperation: state.common.successfulOperation,
        loggedIn: state.auth.loggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchHotels: (selectedCountryId, selectedCityId, pageNo, pageCount) =>
            dispatch(actions.fetchHotels(selectedCountryId, selectedCityId, pageNo, pageCount)),
        onFetchHotelsCount: (selectedCountryId, selectedCityId) => dispatch(actions.fetchHotelsCount(selectedCountryId, selectedCityId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);