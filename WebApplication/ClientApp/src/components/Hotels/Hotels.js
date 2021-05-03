import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

//import classes from './Hotels.module.scss';
import PageTitle from '../UI/PageTitle/PageTitle';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import SelectHotel from './SelectHotel/SelectHotel';
import HotelDetail from './HotelDetail/HotelDetail';
import HotelList from './HotelList/HotelList';
import HotelEdit from './HotelEdit/HotelEdit';
import HotelNew from './HotelNew/HotelNew';

const Hotels = props => {

    const { id, action } = useParams();
    const { add } = props;

    const detailContent = useMemo(() => {
        if (action) {
            if (action.toLowerCase() === 'edit') {
                return <HotelEdit id={id} />;
            }
        }
        else if (id) {
            return <HotelDetail id={id} />;
        }
        else if (add) {
            return <HotelNew />;
        }
        else {
            return <SelectHotel />;
        }
    }, [id, action, add]);

    return (
        <div className="container">
            {/*<BreadCrumb title="Hotels"/>*/}
            <PageTitle title="Hotels" />
            <div className="row">
                <div className="col-7">
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