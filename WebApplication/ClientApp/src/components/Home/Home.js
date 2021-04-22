import React from 'react';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import HotelsSummary from '../Hotels/HotelsSummary/HotelsSummary';

export const Home = (props) => {

    return (
        <div className="container">
            <HotelsSummary />
        </div>
    );
};

export default withErrorHandler(Home);
