import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Hotels.module.scss';
import PageTitle from '../UI/PageTitle/PageTitle';
import Location from '../Location/Location';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import SelectHotel from './SelectHotel/SelectHotel';
import HotelDetail from './HotelDetail/HotelDetail';
import HotelList from './HotelList/HotelList';
import HotelEdit from './HotelEdit/HotelEdit';

const Hotels = props => {

    const { id, action } = useParams();
    const { add } = props;
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);

    const detailContent = useMemo(() => {
        if (!id) {
            if (add) {
                //console.log(props.match.params);            
                //if (props.location.pathname.toLowerCase().startsWith("/hotels/new")) {
                return <HotelEdit />;
            }
            else {
                return <SelectHotel />;
            }
        }
        else {
            if (!action) {
                return <HotelDetail id={id} />;
            }
            else if (action.toLowerCase() === 'edit') {
                return <HotelEdit id={id} />;
            }
        }
    }, [id, action, add]);

    const changeCountryHandler = useCallback((countryId) => {
        setSelectedCountryId(countryId);
    }, []);

    const changeCityHandler = useCallback((cityId) => {
        setSelectedCityId(cityId);
    }, []);

    return (
        <div className="container">
            {/*<BreadCrumb title="Hotels"/>*/}
            <PageTitle title="Hotels" />
            <div className="row">
                <div className="col-7">
                    {/* <Location changeCountry={changeCountryHandler} changeCity={changeCityHandler} />*/}
                    <HotelList />
                </div>
                <div className="col-5">
                    {detailContent}
                </div>
            </div>
        </div>
    );
};

export default withErrorHandler(Hotels);