import React, { useEffect, useState } from 'react';

import classes from './Cities.module.scss';
import CityItem from './CityItem/CityItem';
import axiosInstance from '../../../axios-instance';

const Cities = props => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axiosInstance.get('location/GetCities/' + props.countryId)
            .then(response => {
                setCities(response.data
                    .map(city => <CityItem key={city.id} name={city.name} />));
            });
    }, []);

   return (
        <div>
           {cities}
        </div>
    )
};

export default Cities;