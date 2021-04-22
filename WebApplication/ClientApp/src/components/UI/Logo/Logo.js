import React from 'react';

import siteLogo from '../../../assets/img/logo.png';
import classes from './Logo.module.css';

const Logo = props => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={siteLogo} alt="Logo" />
    </div>
);

export default Logo;