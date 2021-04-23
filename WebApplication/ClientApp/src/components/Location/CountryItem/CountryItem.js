import React from 'react';

import classes from './CountryItem.module.scss';

const CountryItem = props => {
    const flagUrl = '/images/' +
        (props.data.flagUrl ?
        'countries/' + props.data.flagUrl :
        'no-image.png');
    return (
        <div className={classes.CountryItem} onClick={() => props.displayCities(props.data.id)}>
            <img src={flagUrl} alt={props.name} />
            <h3>{props.data.name}</h3>
        </div>
    );
};

export default CountryItem;