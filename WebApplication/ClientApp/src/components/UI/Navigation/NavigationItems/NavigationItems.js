import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import * as actions from '../../../../store/actions/authActions';

const navigationItems = props => {

    function signOutHandler() {
        props.onSignOut();
    };

    let links = null;
    if (props.loggedIn) {
        links = (
            <Fragment>
                <NavigationItem link='/' exact>
                    <span className="fa fa-home"></span>
                </NavigationItem>
                <NavigationItem link='/profile'>Profile</NavigationItem>
                <NavigationItem link='/hotels'>Hotels</NavigationItem>
                <NavigationItem link='/about'>About</NavigationItem>
                <NavigationItem clicked={signOutHandler}>Sign Out</NavigationItem>
            </Fragment>
        );
    }
    else {
        links = (
            <Fragment>
                <NavigationItem link='/' exact>
                    <i className="fa fa-home"></i>
                </NavigationItem>
                <NavigationItem link='/hotels'>Hotels</NavigationItem>
                <NavigationItem link='/about'>About</NavigationItem>
                <NavigationItem link='/auth'>Sign In</NavigationItem>
            </Fragment>
        );
    }

    return (
        <nav>
            <ul className={classes.NavigationItems}>
                {links}
            </ul>
        </nav>
    );
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actions.signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);