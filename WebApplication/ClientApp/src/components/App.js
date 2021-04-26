import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from "react-redux";

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap';

import './custom.scss'
import Layout from '../hoc/Layout/Layout';
import { Home } from './Home/Home';
import About from './About/About';
import NotFound from './NotFound/NotFound';
import * as authActions from '../store/actions/authActions';

const Auth = React.lazy(() => {
    return import('./Auth/Auth');
});

const Profile = React.lazy(() => {
    return import('./Profile/Profile');
});

const Hotels = React.lazy(() => {
    return import('./Hotels/Hotels');
});

export const App = (props) => {

    //const { onAutoSignIn } = props;

    //useEffect(() => {
    //    onAutoSignIn();
    //}, [onAutoSignIn]);

    let routes = null;
    if (props.isLoggedIn) {
        routes = (
            <Switch>
                <Route path='/hotels/add' render={(props) => <Hotels {...props} add />} />
                <Route path='/hotels/:id?/:action?' exact component={Hotels} />
                <Route path='/profile' component={Profile} />
                <Route path='/about' component={About} />
                <Route path='/auth' render={(props) => <Auth {...props} />} />
                <Route path='/' exact component={Home} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    else {
        routes = (
            <Switch>
                <Route path='/hotels/add' render={(props) => <Hotels {...props} add />} />
                <Route path='/hotels/:id?/:action?' exact component={Hotels} />
                <Route path='/about' component={About} />
                <Route path='/auth' render={(props) => <Auth {...props} />} />
                <Route path='/' exact component={Home} />
                <Route component={NotFound} />
            </Switch>
        );
    }

    return (
        <Layout>
            <Suspense fallback={<p className="container">Loading...</p>}>
                {routes}
            </Suspense>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.loggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAutoSignIn: () => dispatch(authActions.autoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
