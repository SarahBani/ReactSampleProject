import React from 'react';

import classes from './CityItem.module.scss';

const CityItem = props => (
    <div >
        <strong>{props.name}</strong>
    </div>
);

export default CityItem;