import React from 'react';

import classes from './PageTitle.module.scss';

const PageTitle = props => (
    <div className={classes.PageTitle}>
        <h1><span>⌘</span>{ props.title}</h1>
    </div>
);

export default PageTitle;