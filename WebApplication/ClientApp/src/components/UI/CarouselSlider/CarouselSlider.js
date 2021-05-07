import { React, useState, useMemo, useEffect } from 'react';

import classes from './CarouselSlider.module.scss';

const CarouselSlider = props => {

    const { photos } = props;
    const [selectedIndex, setSelectedIndex] = useState();
    const [selectedImageUrl, setSelectedImageUrl] = useState('images/no-image.png');

    useEffect(() => {
        if (photos.length > 0) {
            setSelectedIndex(0);
            setSelectedImageUrl(`Resources/Images/hotels/${photos[0].photoUrl}`);
        }
        else {
            setSelectedImageUrl('images/no-image.png');
        }
    }, [photos]);

    const thumbs = useMemo(() => {
        return photos.map(q =>
            <div key={q.id}>
                <img src={`Resources/Images/hotels/${q.photoUrl}`}
                    className="img-response" />
            </div>);
    }, [photos]);

    return (
        <div className={classes.CarouselSlider}>

            <div className="row">
                <div className="col-12">
                    <img className="img-response selected-photo" src={selectedImageUrl} />
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    <div className={classes.SliderAlbum}>
                        <span className={['fa', 'fa-chevron-left', classes.Prev].join(' ')}></span>
                        <div>
                            <div >
                                {thumbs}
                            </div>
                        </div>
                        <span className={['fa', 'fa-chevron-right', classes.Next].join(' ')}></span>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default CarouselSlider;