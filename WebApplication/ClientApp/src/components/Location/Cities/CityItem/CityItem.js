import React from 'react';

import classes from './CityItem.module.css';

const CityItem = props => (
    <div >
        <strong>{props.name}</strong>
    </div>
);

export default CityItem;