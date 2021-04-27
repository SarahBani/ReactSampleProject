import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import Footer from '../../components/UI/Footer/Footer';
import Spinner from '../../components/UI/Spinner/Spinner';

const Layout = (props) => {

    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

    const toggleSideDrawerHandler = () => {
        setSideDrawerVisible(prevSideDrawerVisible => !prevSideDrawerVisible);
    };

    return (
        <div className={classes.Layout}>
            <Toolbar drawerToggleClicked={() => toggleSideDrawerHandler()} >
            </Toolbar>
            <SideDrawer
                show={sideDrawerVisible}
                hide={() => toggleSideDrawerHandler()} />
            <main>
                {props.children}
            </main>
            <Footer />
            {props.loading && <Spinner />}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.common.isLoading
    };
};

export default connect(mapStateToProps)(Layout);