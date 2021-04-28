import React from 'react';
import { connect } from 'react-redux';

import classes from './Profile.module.scss';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Profile = props => {
    console.log(props.user);
    return (
        <div className={["container", classes.Profile].join(' ')}>
            <div className="row">
                <div className="card bg-info">
                    <div className="card-body">
                        <img src="/images/avatar.png" alt="avatar" className="img-response" />
                    </div>
                    <div className="card-body text-center">
                        <h4 className="card-title">Software Developer</h4>
                        <p className="card-text">{props.user?.email}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(withErrorHandler(Profile));