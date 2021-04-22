import React from 'react';

import PageTitle from '../UI/PageTitle/PageTitle';
import Location from '../Location/Location';

const Hotels = props => {
    return (
        <div className="container">
            {/*<BreadCrumb title="Hotels"/>*/}
            <PageTitle title="Hotels" />
            <Location />
        </div>
    );
};

export default Hotels;