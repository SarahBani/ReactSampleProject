import React from 'react';
import { Link } from 'react-router-dom';

import classes from './BreadCrumb.module.css';

const BreadCrumb = props => (
    <div className={classes.BreadCrumb}>
        <nav className="container">
            <ol class="breadcrumb">
                <li class="breadcrumb-icon">
                    ⌘
            </li>
                <li className="breadcrumb-item">
                    <Link to={{ pathname: "/" }}>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <span>{props.title}</span>
                </li>
            </ol>
        </nav >
    </div>
);

export default BreadCrumb;